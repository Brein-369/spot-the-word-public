const { Socket } = require('dgram')
const express = require('express')
const app = express()
const http = require("http").createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(http)
const words = require('./database')

io.on("connection", (socket) => {
  console.log("user conected")

  socket.on('setMsg', data => {
    console.log(data)
    socket.broadcast.emit('fetchMessage', data)
  })

  socket.on('player', data => {
    io.emit('userPlayer', data)
  })

  socket.on('fetchWord', data => {
    const kata = words[Math.floor(Math.random()*10)]
    io.emit('spotWord', kata)
  })

  socket.on('upPoin', data => {
    console.log(data)
    io.emit('newPoin', data)
  })
})

http.listen(port, () => {
  console.log("Listening port in " + port)
})