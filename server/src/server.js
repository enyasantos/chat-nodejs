const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);

const connection = require('./database/connection');

const multer = require('multer');
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

const path = require('path');

const crypto = require('crypto');

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);
    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data)
        io.emit('chat.message', data);

        connection('messages').insert({
            user_id: data.id,
            time: data.time,
            content: data.message
        })
        .then(response => console.log('Save'))
        .catch(err => console.error({ error: err }))
    });
    socket.on('disconnect', () => {
        console.log('[SOCKET] Discconect => A connection was disconnected');
    })
});


app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'avatar')));

app.post('/users', upload.single('avatar'), (req, res) => {

    const {
        id,
        username,
    } = req.body;

    let image = 'user.jpg';

    const requestImages = req.file;

    if(requestImages)
        image = requestImages.filename;

    const id_access = crypto.randomBytes(4).toString('HEX');

    connection('users').insert({
        id,
        username,
        image,
        id_access
    })
    .then(response => res.status(201).json({ id_access }))
    .catch(err => res.status(500).json({ message: 'Erro ao cadastrar mensagem no banco de dados.' }))
});

app.post('/logon', async (req, res) => {
    const {
        id,
    } = req.body;

    connection('users')
    .where('id_access', id)
    .select('*')
    .then(response => {
        if(response.length)
            return res.status(200).json({ message: 'ok', id: response[0].id })
        return res.status(400).json({ message: 'Usuário não registrado.' })
    })
    .catch(err => res.status(500).json({ message: 'Erro ao consultar banco de dados.' }))
});

app.get('/users/:index', (req, res) => {
    const id = req.params.index;
    
    connection('users')
    .where('id', id)
    .select('*')
    .then(response => {
        if(response.length)
            return res.status(200).json(response)
        return res.status(400).json({ message: 'Usuário não registrado.' })
    })
    .catch(err => res.status(500).json({ message: 'Erro ao consultar banco de dados.' }))
});

app.get('/', (req, res) => {
    connection('messages')
    .join('users as u', 'u.id', 'messages.user_id')
    .select('messages.*', 'u.username', 'u.image')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ message: 'Erro ao consultar banco de dados.' }))
})

server.listen(3001, () => console.log('🔥 Server is running in port 3001.'));