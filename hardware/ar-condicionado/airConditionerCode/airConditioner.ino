#include <ESP8266WiFi.h> 
#include <PubSubClient.h>
#include <IRremoteESP8266.h>

IRsend irsend(3); //FUNÇÃO RESPONSÁVEL PELO MÉTODO DE ENVIO DO SINAL IR

int tamanho = 100; //TAMANHO DA LINHA RAW(68 BLOCOS)
int frequencia = 32; //FREQUÊNCIA DO SINAL IR(32KHz)

unsigned int ON[100] = {4350,4300, 550,1600, 500,550, 550,1600, 500,1600, 550,500, 550,550, 500,1600, 550,500, 550,550, 500,1600, 550,500, 550,550, 500,1600, 500,1650, 500,550, 500,1600, 550,500, 550,1600, 500,550, 550,1600, 500,1600, 500,1650, 500,1600, 500,1600, 550,1600, 550,500, 550,1550, 550,550, 500,550, 500,550, 550,500, 550,500, 550,550, 550,500, 500,550, 550,1600, 500,550, 550,500, 550,550, 500,500, 550,1600, 550,1550, 550,1600, 500,550, 550,1550, 550,1600, 550,1600, 500,1600, 500};
unsigned int OFF[100] = {4300,4400, 500,1650, 500,550, 500,1650, 500,1650, 500,600, 450,600, 500,1650, 500,550, 500,550, 550,1650, 500,550, 500,550, 500,1650, 500,1650, 550,550, 450,1700, 500,550, 500,1650, 500,1650, 500,1650, 500,1650, 550,550, 450,1700, 500,1650, 500,1650, 500,550, 500,600, 500,550, 450,600, 500,1650, 500,550, 550,550, 500,1650, 500,1650, 500,1650, 500,550, 550,550, 500,550, 500,550, 500,550, 550,550, 450,600, 500,550, 500,1650, 500,1700, 450,1700, 450,1700, 500,1650, 500};
unsigned int UP[100] = {4400,4250, 650,1500, 600,450, 600,1500, 650,1500, 600,450, 600,450, 650,1500, 600,450, 600,450, 650,1500, 600,450, 600,450, 600,1550, 600,1500, 600,450, 650,1500, 600,450, 600,1500, 650,450, 600,1500, 600,1550, 600,1500, 600,1550, 600,1500, 600,1500, 650,450, 600,1500, 600,450, 650,450, 600,450, 600,450, 600,450, 650,1500, 600,450, 600,450, 600,1550, 600,450, 600,450, 600,450, 650,400, 650,450, 600,1500, 600,1550, 600,450, 600,1500, 650,1500, 600,1500, 650,1500, 600,5050 };
unsigned int DOWN[100] = {4400,4250, 600,1550, 550,500, 600,1500, 600,1550, 550,500, 550,500, 550,1600, 500,550, 550,500, 550,1600, 500,550, 550,500, 550,1600, 500,1600, 550,500, 550,1600, 500,550, 550,1550, 600,500, 550,1550, 550,1600, 550,1550, 600,1500, 600,1550, 600,1500, 600,500, 550,1550, 600,450, 600,500, 550,500, 550,500, 600,450, 600,1550, 550,1600, 550,450, 600,1600, 500,550, 550,450, 600,500, 550,500, 550,550, 550,500, 550,1550, 550,500, 550,1600, 550,1550, 550,1600, 550,1550, 550};

//WiFi
const char* SSID = "UFC_B4_SL3_2";                                           // Nome da rede WiFi
const char* PASSWORD = "";                               // Senha da rede WiFi
WiFiClient wifiClient;                        
 
//MQTT Server
const char* BROKER_MQTT = "200.129.39.25";                          //URL do broker MQTT
int BROKER_PORT = 1883;                                             // Porta do Broker MQTT

#define ID_MQTT  "airConditioner001001001_device"                                   //ID unico e seu
#define TOPIC_PUBLISH "/scggokgpepnvsb2uv4s40d59oo/airConditioner001001001/attrs"   //Tópico de publicação
#define TOPIC_SUBSCRIBE "/scggokgpepnvsb2uv4s40d59oo/airConditioner001001001/cmd"   //Tópico de Assinatura
PubSubClient MQTT(wifiClient);   

void mantemConexoes();                                              //Garante as conexoes WiFi e MQTT
void conectaWiFi();                                                 //Faz conexão com WiFi
void conectaMQTT();                                                 //Faz conexão com Broker MQTT
void deviceControl(char* topic, byte* payload, unsigned int length);//recebe e envia informações do dispositivo

void setup() {        

  //Serial.begin(115200);

  irsend.begin(); //INICIALIZA A FUNÇÃO

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
    
    if(msg == "airConditioner001001001@on|"){
      
      MQTT.publish(TOPIC_PUBLISH, "airConditioner001001001@on| on OK");
      irsend.sendRaw(ON,tamanho,frequencia);  // PARÂMETROS NECESSÁRIOS PARA ENVIO DO SINAL IR
      //Serial.println("Comando enviado: liga");
      delay(50); // TEMPO(EM MILISEGUNDOS) DE INTERVALO ENTRE UM COMANDO E OUTRO
      
    }else if(msg == "airConditioner001001001@off|"){
      
      MQTT.publish(TOPIC_PUBLISH, "airConditioner001001001@off| off OK");
      irsend.sendRaw(OFF,tamanho,frequencia);  // PARÂMETROS NECESSÁRIOS PARA ENVIO DO SINAL IR
      //Serial.println("Comando enviado: desliga");
      delay(50); // TEMPO(EM MILISEGUNDOS) DE INTERVALO ENTRE UM COMANDO E OUTRO
        
    }else if(msg == "airConditioner001001001@up|"){
      
      MQTT.publish(TOPIC_PUBLISH, "airConditioner001001001@up| up OK");
      irsend.sendRaw(UP,tamanho,frequencia);  // PARÂMETROS NECESSÁRIOS PARA ENVIO DO SINAL IR
      //Serial.println("Comando enviado: Temperatura +");
      delay(50); // TEMPO(EM MILISEGUNDOS) DE INTERVALO ENTRE UM COMANDO E OUTRO
        
    }else if(msg == "airConditioner001001001@down|"){
      
      MQTT.publish(TOPIC_PUBLISH, "airConditioner001001001@down| down OK");
      irsend.sendRaw(DOWN,tamanho,frequencia); // PARÂMETROS NECESSÁRIOS PARA ENVIO DO SINAL IR
      //Serial.println("Comando enviado: Temperatura -");
      delay(50); // TEMPO(EM MILISEGUNDOS) DE INTERVALO ENTRE UM COMANDO E OUTRO
        
    }
}
