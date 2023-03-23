#include <ESP8266WiFi.h> 
#include "PubSubClient.h"
#include "Arduino.h"
#include "Wire.h"
#define I2Caddress 0x48
#include <WiFiClient.h>

unsigned long prevTime = millis();
unsigned long msgInterval = 120000;
float consumoTotal = 0;
unsigned long inicioTempoLigado =0;
unsigned long fimTempoLigado =0;
bool estaLigado = false;
double kwValue;
double maxValue = 0, correnteAtual = 0, maxValueAnt = 0;


#define MARGEMDEERRO 200
#define HOURSTOMILLIS 3600000.0   //Valor de 1 hora em millisegundos
#define CORRENTEMAXIMA 52     //Corrente maxima enviada para o ads1115 convertida na proporção 100A:50mA
#define TENSAOMAXIMA 0.512    //Tensão maxima lida no ads1115

int i = 0;
float multiplier = 0.000015625;

char data[20] = "";
char valueRequest[350] = "";

// Read two bytes and convert to full 16-bit int
int16_t convertedValue;
int16_t actualValue[19];

//WiFi
const char* SSID = "";                                           // Nome da rede WiFi
const char* PASSWORD = "";                               // Senha da rede WiFi
WiFiClient wifiClient;                        
 
//MQTT Server
const char* BROKER_MQTT = "";                          //URL do broker MQTT
int BROKER_PORT = 1883;                                             // Porta do Broker MQTT

const String ID_PCB = "001001001";                         // ID referente a placa, MODIFICAR AQUI

#define ID_MQTT  ("currentSensor"+ID_PCB+"_device").c_str()                                   //ID unico e seu
#define TOPIC_PUBLISH ("/scggokgpepnvsb2uv4s40d59oo/currentSensor"+ID_PCB+"/attrs").c_str()   //Tópico de publicação
#define TOPIC_SUBSCRIBE ("/scggokgpepnvsb2uv4s40d59oo/currentSensor"+ID_PCB+"/cmd").c_str()   //Tópico de Assinatura
PubSubClient MQTT(wifiClient);   

void mantemConexoes();                                              //Garante as conexoes WiFi e MQTT
void conectaWiFi();                                                 //Faz conexão com WiFi
void conectaMQTT();                                                 //Faz conexão com Broker MQTT
void deviceControl();//recebe e envia informações do dispositivo

void setup() {        

  Serial.begin(115200);


  strcpy(valueRequest, "c|");

  conectaWiFi();
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);   
}

void loop() {
  unsigned long currentTime = millis();             //Armazena o tempo atual em milisseungos
  if( currentTime  - prevTime >= msgInterval){      //Compara o tempo atual e da ultima mensagem enviada saber se é maior que o intervalo para envia-la novamente                          
    calcularConsumo();
    Serial.print("Consumo Total: ");
    Serial.println(consumoTotal);
    snprintf(data, sizeof(data), "%f", consumoTotal);
    strcat(valueRequest, data);
    MQTT.publish(TOPIC_PUBLISH, valueRequest);
    prevTime = currentTime;
    consumoTotal = 0;
    strcpy(valueRequest, "c|");
  }
  
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

  Serial.println();
  Serial.println("Conectando-se");
  Serial.print(SSID);

  WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI  
  while (WiFi.status() != WL_CONNECTED) {
      delay(100);
      Serial.print(".");
  }
  
  Serial.println();
  Serial.print("Conectado na rede: ");
  Serial.print(SSID);  
  Serial.print("  IP obtido: ");
  Serial.println(WiFi.localIP()); 
}

void conectaMQTT() { 
    while (!MQTT.connected()) {
        Serial.print("Conectando ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) {
            Serial.println("Conectado ao Broker com sucesso!");
        } 
        else {
            Serial.println("Nao foi possivel se conectar ao broker.");
            Serial.println("Nova tentativa de conexao em 10s");
            delay(10000);
        }
    }
}

void deviceControl() 
{
  
  Wire.begin(0, 2);

  
  
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
  convertedValue = -(Wire.read() << 8 | Wire.read()); //Sinal negativo se os pinos estiverem invertidos

  i ++;
  
  actualValue[i] = abs(convertedValue);

  
  if(i >= 15){
    
    for(int j=0; j <= i; j++){
      if(actualValue[j] > maxValue)
        maxValue = actualValue[j];
    }
    
    Serial.println(maxValue);
    if(maxValue > 100 && estaLigado == false){
      //Serial.println("Conectou");
      estaLigado = true;
      inicioTempoLigado = millis(); 
    }else if(maxValue <= 100 && estaLigado == true) {
      //Serial.println("Desconectou");
      fimTempoLigado = millis();
      estaLigado = false;
    }

    Serial.println(abs(maxValue - maxValueAnt));
    if(abs(maxValue - maxValueAnt) >= MARGEMDEERRO){
      calcularConsumo();  
    }
    maxValueAnt = maxValue;

    correnteAtual = (maxValue * multiplier * CORRENTEMAXIMA)/TENSAOMAXIMA; //Calculo para determinar o valor da corrente atual lida pelo sensor
    kwValue = (correnteAtual * 220)/1000; //Calculo para determinar o valor atual de Kw
    maxValue = 0;  

    
    delay(1000);
    delay(0);
    i=0;
  }
  
  for(int k=0; k<3000; k++){
    asm("nop");
  }
  
}

void calcularConsumo(){
  float tempoConsumido = 0;
  
  if(estaLigado == true){
    fimTempoLigado = millis();
  }

  
  //Serial.println(inicioTempoLigado);
  //Serial.println(fimTempoLigado);

  tempoConsumido = (float(fimTempoLigado - inicioTempoLigado)/HOURSTOMILLIS);
  inicioTempoLigado = millis();
  fimTempoLigado = inicioTempoLigado;

   //Serial.print("Corrente: ");
   //Serial.println(correnteAtual);
   //Serial.print("KW: ");
   //Serial.println(kwValue);
   //Serial.print("Tempo: ");
   //Serial.println(tempoConsumido);
  
  consumoTotal +=  tempoConsumido * kwValue;
}
