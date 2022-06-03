require('dotenv').config()

import express from 'express'
const cors = require('cors')
const app = express()
const http = require('http').Server(app)

const io = require('socket.io')(http)
const routes = require('./Router')(io)

io.on('connection', function (socket: any) {
  console.log('a user connected')
})

app.use(express.json())
app.use(cors())
app.use(routes)

http.listen(process.env.PORT || 3005, () => {
  console.log('Proxy server is running on port ' + process.env.PORT || 3005)
})
