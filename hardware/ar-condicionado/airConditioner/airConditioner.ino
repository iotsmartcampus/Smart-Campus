#include <ESP8266WiFi.h> 
#include "PubSubClient.h"
#include <IRremoteESP8266.h>

IRsend irsend(3); //FUNÇÃO RESPONSÁVEL PELO MÉTODO DE ENVIO DO SINAL IR
int frequencia = 38; //FREQUÊNCIA DO SINAL IR(38KHz)

unsigned long prevTime = millis();  //Armazena o tempo da ultima mensagem enviada em milissegundos

long msgInterval = 30000;           //intervalo de tempo em milissegundos de quando a placa irá mandar a mensagem de status


//WiFi
const char* SSID = "";                                           // Nome da rede WiFi
const char* PASSWORD = "";                               // Senha da rede WiFi
WiFiClient wifiClient;                        
 
//MQTT Server
const char* BROKER_MQTT = "...";                          //URL do broker MQTT
int BROKER_PORT = 1883;                                               // Porta do Broker MQTT

const String ID_PCB = "001001001";                         // ID referente a placa, MODIFICAR AQUI

#define ID_MQTT  ("airConditioner"+ID_PCB+"_device").c_str()                                   //ID unico e seu
#define TOPIC_PUBLISH ("/scggokgpepnvsb2uv4s40d59oo/airConditioner"+ID_PCB+"/attrs").c_str()    //Tópico de publicação
#define TOPIC_SUBSCRIBE ("/scggokgpepnvsb2uv4s40d59oo/airConditioner"+ID_PCB+"/cmd").c_str()   //Tópico de Assinatura

PubSubClient MQTT(wifiClient);   

void mantemConexoes();                                              //Garante as conexoes WiFi e MQTT
void conectaWiFi();                                                 //Faz conexão com WiFi
void conectaMQTT();                                                 //Faz conexão com Broker MQTT
void deviceControl(char* topic, byte* payload, unsigned int length);//recebe e envia informações do dispositivo
String getValue(String data, char separator, int index);            //divide data pelo separator, retorna string[index]
int quantChar(String data, char ref);                               //retorna a quantidade de ref em data

void setup() {        

  Serial.begin(115200);

  irsend.begin(); //INICIALIZA A FUNÇÃO

  conectaWiFi();
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);  
  MQTT.setCallback(deviceControl); 
}

void loop() {
  unsigned long currentTime = millis();             //Armazena o tempo atual em milisseungos

  if( currentTime  - prevTime >= msgInterval){      //Compara o tempo atual e da ultima mensagem enviada saber se é maior que o intervalo para envia-la novamente
    Serial.println("s|ON");
    MQTT.publish(TOPIC_PUBLISH, "s|ON");                         
    prevTime = currentTime;
  }
  
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
            MQTT.subscribe(TOPIC_SUBSCRIBE);
        } 
        else {
            Serial.println("Nao foi possivel se conectar ao broker.");
            Serial.println("Nova tentativa de conexao em 10s");
            delay(10000);
        }
    }
}

void deviceControl(char* topic, byte* payload, unsigned int length) 
{
    String msg;
    String cmd;
    String data;

    //obtem a string do payload recebido
    for(int i = 0; i < length; i++) 
    {
       char c = (char)payload[i];
       msg += c;
    }

    Serial.println(msg);
    cmd = getValue(msg, '|', 0);
    data = getValue(msg, '|', 1);

    int quantData = quantChar(data, ',') + 1;
    unsigned int iData[quantData];
    
    for(int i = 0; i < quantData; i++){
      iData[i] = getValue(data, ',', i).toInt();
    }
    
    if(cmd == "airConditioner"+ID_PCB+"@infrared"){
      MQTT.publish(TOPIC_PUBLISH, ("airConditioner"+ID_PCB+"@infrared| infrared OK").c_str());
      irsend.sendRaw(iData,quantData,frequencia);  // PARÂMETROS NECESSÁRIOS PARA ENVIO DO SINAL IR
      Serial.println("Comando enviado: liga");
      delay(50); // TEMPO(EM MILISEGUNDOS) DE INTERVALO ENTRE UM COMANDO E OUTRO
      
    }
}

String getValue(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = { 0, -1 };
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++) {
        if (data.charAt(i) == separator || i == maxIndex) {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i+1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

int quantChar(String data, char ref){

  int count = 0;
  for(int i = 0 ; i < data.length(); i++){
    if(data[i] == ref){
      count ++;
    }
  }

  return count;
}