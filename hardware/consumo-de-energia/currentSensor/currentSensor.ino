#include <ESP8266WiFi.h> 
#include "PubSubClient.h"
#include "Arduino.h"
#include "Wire.h"
#define I2Caddress 0x48

int i = 0;
//float multiplier = 0.015625F;

char data[15] = "";
char valueRequest[350] = "";

// Read two bytes and convert to full 16-bit int
int16_t convertedValue;

//WiFi
const char* SSID = "UFC_B4_SL3_2";                                           // Nome da rede WiFi
const char* PASSWORD = "";                               // Senha da rede WiFi
WiFiClient wifiClient;                        
 
//MQTT Server
const char* BROKER_MQTT = "200.129.39.25";                          //URL do broker MQTT
int BROKER_PORT = 1883;                                             // Porta do Broker MQTT

#define ID_MQTT  "currentSensor001001001_device"                                   //ID unico e seu
#define TOPIC_PUBLISH "/scggokgpepnvsb2uv4s40d59oo/currentSensor001001001/attrs"   //Tópico de publicação
#define TOPIC_SUBSCRIBE "/scggokgpepnvsb2uv4s40d59oo/currentSensor001001001/cmd"   //Tópico de Assinatura
PubSubClient MQTT(wifiClient);   

void mantemConexoes();                                              //Garante as conexoes WiFi e MQTT
void conectaWiFi();                                                 //Faz conexão com WiFi
void conectaMQTT();                                                 //Faz conexão com Broker MQTT
void deviceControl();//recebe e envia informações do dispositivo

void setup() {        

  //Serial.begin(115200);
  Wire.begin(0,2);

  strcpy(valueRequest, "c|");

  conectaWiFi();
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);   
}

void loop() {
  mantemConexoes();
  deviceControl();
  MQTT.loop();
}

void mantemConexoes() {
    if (!MQTT.connected()) {
       conectaMQTT(); 
    }
    
    conectaWiFi(); //refaz conexão
}

void conectaWiFi() {

  if (WiFi.status() == WL_CONNECTED) {
     return;
  }

  //Serial.println();
  //Serial.println("Conectando-se");
  //Serial.print(SSID);

  WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI  
  while (WiFi.status() != WL_CONNECTED) {
      delay(100);
      //Serial.print(".");
  }
  
  //Serial.println();
  //Serial.print("Conectado na rede: ");
  //Serial.print(SSID);  
  //Serial.print("  IP obtido: ");
  //Serial.println(WiFi.localIP()); 
}

void conectaMQTT() { 
    while (!MQTT.connected()) {
        //Serial.print("Conectando ao Broker MQTT: ");
        //Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) {
            //Serial.println("Conectado ao Broker com sucesso!");
        } 
        else {
            //Serial.println("Nao foi possivel se conectar ao broker.");
            //Serial.println("Nova tentativa de conexao em 10s");
            delay(10000);
        }
    }
}

void deviceControl() 
{

  // Step 1: Point to Config register - set to continuous conversion
  Wire.beginTransmission(I2Caddress);

  // Point to Config Register
  Wire.write(0b00000001);

  // Write the MSB + LSB of Config Register
  // MSB: Bits 15:8
  // Bit  15    0=No effect, 1=Begin Single Conversion (in power down mode)
  // Bits 14:12   How to configure A0 to A3 (comparator or single ended)
  // Bits 11:9  Programmable Gain 000=6.144v 001=4.096v 010=2.048v .... 111=0.256v
  // Bits 8     0=Continuous conversion mode, 1=Power down single shot
  Wire.write(0b00001000);

  // LSB: Bits 7:0
  // Bits 7:5 Data Rate (Samples per second) 000=8, 001=16, 010=32, 011=64,
  //      100=128, 101=250, 110=475, 111=860
  // Bit  4   Comparator Mode 0=Traditional, 1=Window
  // Bit  3   Comparator Polarity 0=low, 1=high
  // Bit  2   Latching 0=No, 1=Yes
  // Bits 1:0 Comparator # before Alert pin goes high
  //      00=1, 01=2, 10=4, 11=Disable this feature
  Wire.write(0b11100010);

  // Send the above bytes as an I2C WRITE to the module
  Wire.endTransmission();

  // ====================================

  // Step 2: Set the pointer to the conversion register
  Wire.beginTransmission(I2Caddress);

  //Point to Conversion register (read only , where we get our results from)
  Wire.write(0b00000000);

  // Send the above byte(s) as a WRITE
  Wire.endTransmission();

  // =======================================

  // Step 3: Request the 2 converted bytes (MSB plus LSB)
  Wire.requestFrom(I2Caddress, 2);

  // Read the the first byte (MSB) and shift it 8 places to the left then read
  // the second byte (LSB) into the last byte of this integer
  convertedValue = (Wire.read() << 8 | Wire.read());

  i ++;

  snprintf(data, sizeof(data), "%d", convertedValue);
  strcat(valueRequest, data);
  strcat(valueRequest, " ");
  
  if(i >= 45){
    
    //Serial.println(valueRequest);
    MQTT.publish(TOPIC_PUBLISH, valueRequest);
    strcpy(valueRequest, "c|");
    i=0;
  }

  for(int k=0; k<3000; k++){
    asm("nop");
  }
  
}
