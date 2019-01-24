const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server); 

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'gordon.henning@gmail.com',
        text: 'Hey, whasup',
        createdAt: '123time'
    });

    socket.on('createMessage', (message) => {
        console.log('create message', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('/', (req, res) => {
    res.render('index.html');
});

server.listen(port, () => {
    console.log(`Server up on port ${port}`);
});

