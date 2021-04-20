#include <ESP8266WiFi.h> 
#include <PubSubClient.h>
#include <DHT.h>

#define DHTTYPE DHT11 // DHT 11
#define DHTPIN 3 //PINO DIGITAL UTILIZADO PELO SENSOR

//WiFi
const char* SSID = "--------";                                           // Nome da rede WiFi
const char* PASSWORD = "--------";                               // Senha da rede WiFi
WiFiClient wifiClient;                        
 
//MQTT Server
const char* BROKER_MQTT = "0.0.0.0";                          //URL do broker MQTT
int BROKER_PORT = 1883;                                             // Porta do Broker MQTT

#define ID_MQTT  "temperatureSensor001001001_device"                                   //ID unico e seu
#define TOPIC_PUBLISH "/scggokgpepnvsb2uv4s40d59oo/temperatureSensor001001001/attrs"   //Tópico de publicação
PubSubClient MQTT(wifiClient);   

void mantemConexoes();                                              //Garante as conexoes WiFi e MQTT
void conectaWiFi();                                                 //Faz conexão com WiFi
void conectaMQTT();                                                 //Faz conexão com Broker MQTT
void deviceControl(char* topic, byte* payload, unsigned int length);//recebe e envia informações do dispositivo

float temperature = 0; //VARIÁVEL DO TIPO FLOAT
float temperatureAnt = 0;
float humidity = 0; //VARIÁVEL DO TIPO FLOAT
float humidityAnt = 0;
char data[10];
char valueRequest[10];
DHT dht(DHTPIN, DHTTYPE);

void setup() {        

  //Serial.begin(115200);

  conectaWiFi();
  dht.begin(); //Inicializa o sensor
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);  
}

void loop() {
  mantemConexoes();
  deviceControl();
  MQTT.loop();
  delay(5000);
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
    
  temperatureAnt = temperature;
  temperature = dht.readTemperature(); 

  humidityAnt = humidity;
  humidity = dht.readHumidity();
    
  if(temperature != temperatureAnt && !(isnan(temperature))){
    //Serial.print("Temperatura = "); 
    //Serial.print(temperature); 
    //Serial.print(" °C      |       "); 
    //Serial.print("Umidade = "); 
    //Serial.print(humidity); 
    //Serial.println(); 

    snprintf(data, sizeof(data), "%.2f", temperature); 
    strcpy(valueRequest, "t|");
    strcat(valueRequest, data);
    //Serial.print("===============> "); 
    //Serial.println(valueRequest); 

    MQTT.publish(TOPIC_PUBLISH, valueRequest);
  }

  if(humidity != humidityAnt && !(isnan(humidity))){
    
    snprintf(data, sizeof(data), "%.2f", humidity); 
    strcpy(valueRequest, "h|");
    strcat(valueRequest, data);
    //Serial.print("===============> "); 
    //Serial.println(valueRequest); 
    //Serial.println(); 

    MQTT.publish(TOPIC_PUBLISH, valueRequest);
         
  }
    
}
