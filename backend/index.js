require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);

const state = {
    count: 0,
    logs: 0
}
const io = require('socket.io')(http)
const routes = require('./src/router')(io,state)
const authMiddleware = require('./src/auth/authmiddleware')


app.use(express.json());
app.use(cors());
app.use(authMiddleware)
app.use(routes);


http.listen(process.env.PORT || 3005, ()=>{
    console.log("Proxy server is running on port " + process.env.PORT || 3005)
})

