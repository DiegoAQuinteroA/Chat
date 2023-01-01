const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/templates/index.html');
});

io.on('connection', (Socket)=>{
    console.log("un usuario se a conectado al chat")

    Socket.on('chat message', (msg)=>{
        io.emit('chat message', (msg));
    });

    Socket.on('disconnect', ()=>{
        console.log("el usuario se a desconectado");
    });
})

server.listen(8080,()=>{
    console.log("escuchando en el puerto 8080");
});
