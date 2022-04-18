#include <ESP8266WiFi.h> 
#include <PubSubClient.h>

#define pinRELE 3 //PINO DIGITAL UTILIZADO PELO RELE

//WiFi
const char* SSID = "";                                           // Nome da rede WiFi
const char* PASSWORD = "";                               // Senha da rede WiFi
WiFiClient wifiClient;                        
 
//MQTT Server
const char* BROKER_MQTT = "...";                          //URL do broker MQTT
int BROKER_PORT = 1883;                                             // Porta do Broker MQTT

#define ID_MQTT  "lamp001001001_device"                                   //ID unico e seu
#define TOPIC_PUBLISH "/scggokgpepnvsb2uv4s40d59oo/lamp001001001/attrs"   //Tópico de publicação
#define TOPIC_SUBSCRIBE "/scggokgpepnvsb2uv4s40d59oo/lamp001001001/cmd"   //Tópico de Assinatura
PubSubClient MQTT(wifiClient);   

void mantemConexoes();                                              //Garante as conexoes WiFi e MQTT
void conectaWiFi();                                                 //Faz conexão com WiFi
void conectaMQTT();                                                 //Faz conexão com Broker MQTT
void deviceControl(char* topic, byte* payload, unsigned int length);//recebe e envia informações do dispositivo

void setup() {        

  //Serial.begin(115200);
  pinMode(pinRELE, OUTPUT);

  conectaWiFi();
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);  
  MQTT.setCallback(deviceControl); 
}

void loop() {
  mantemConexoes();
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
            MQTT.subscribe(TOPIC_SUBSCRIBE);
        } 
        else {
            //Serial.println("Nao foi possivel se conectar ao broker.");
            //Serial.println("Nova tentativa de conexao em 10s");
            delay(10000);
        }
    }
}

void deviceControl(char* topic, byte* payload, unsigned int length) 
{
    String msg;

    //obtem a string do payload recebido
    for(int i = 0; i < length; i++) 
    {
       char c = (char)payload[i];
       msg += c;
    }

    //Serial.println(msg);
    if(msg == "lamp001001001@on|"){
      digitalWrite(pinRELE, HIGH);
      MQTT.publish(TOPIC_PUBLISH, "lamp001001001@on| On ok");
      MQTT.publish(TOPIC_PUBLISH, "s|ON");
    }else if(msg == "lamp001001001@off|"){
      digitalWrite(pinRELE, LOW);
      MQTT.publish(TOPIC_PUBLISH, "lamp001001001@off| Off ok");
      MQTT.publish(TOPIC_PUBLISH, "s|OFF");
    }
}
