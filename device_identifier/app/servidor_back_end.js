const express = require("express");
const bodyParser = require('body-parser');
const http = require("http");
const axios = require('axios');
const socketIo = require("socket.io");
const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

var ip = require("ip");
const ipSubscriptions = ip.address();

let interval;
var samplesPeriod = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var deviceName = "Desconectado";
var lastModification = new Date();

server.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json());

app.post('/device', (req, res) => {

  deviceName = req.body.data[0].device.value;
  samplesPeriod = req.body.data[0].samples.value;
  lastModification = new Date();

	console.log("Device: " + deviceName);
  console.log("Samples: " + samplesPeriod);

	if(deviceName == "notebook power adapter"){
		deviceName = "Carregador de notebook";
	}else if(deviceName == "fan"){
		deviceName = "Ventilador";
	}else if(deviceName == "tv"){
		deviceName = "TV";
	}else if(deviceName == "blender"){
		deviceName = "Liquidificador";
	}else if(deviceName == "lamp"){
		deviceName = "Lâmpada";
	}else if(deviceName == "hairdryer"){
		deviceName = "Secador de cabelo";
	}else if(deviceName == "soldering iron"){
		deviceName = "Ferro de solda";
	}else if(deviceName == "smartphone power adapter"){
		deviceName = "Carregador de celular";
	}else if(deviceName == "sandwich maker"){
		deviceName = "Sanduicheira";
	}else{
		deviceName = "Desconectado";
  }

  res.send("OK");
  
});

io.on("connection", (socket) => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmitDevice(socket), 1000);
  socket.on("disconnect", () => {
		//console.log("desconected socket");
    clearInterval(interval);
  });
});

const getApiAndEmitDevice = socket => {
  samplesPeriodConvert = samplesPeriod.map(function(num) {
    return num * 0.0003125;
  });
  
  socket.emit("Device", { 
    name: deviceName, 
    samples: samplesPeriodConvert,
    lastTime: lastModification 
  });
};

try {
  axios.post('http://localhost:1026/v2/subscriptions', {
    "description": "Current Subscription",
    "subject": {
      "entities": [{ "id": "CurrentSensor:001001001", "type": "Result" }],
      "condition": {
        "attrs": ["device", "samples"]
      }
    },
    "notification": {
      "http": {
        "url": "http://" + ipSubscriptions + ":4000/device"
      },
      "attrs": ["device", "samples"]
    },
    "throttling": 0
  }, {
      headers: {
        
      }
    }
  )
} catch (error) {
  console.error(error)
}


