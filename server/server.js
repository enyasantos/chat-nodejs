const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);
    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data)
        io.emit('chat.message', data)
    });
    socket.on('disconnect', () => {
        console.log('[SOCKET] Discconect => A connection was disconnected');
    })
})

server.listen(3001, () => console.log('🔥 Server is running in port 3001.'));