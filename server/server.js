const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

// Public path
const publicPath = path.join(__dirname,'../public');
// Heroku port configuration
const port = process.env.PORT || 3000;

// Create express app
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// SocketIO Events
io.on('connection',(socket) => {
  console.log('New User Connected!');

  socket.emit('newMessage',{
    from: 'MYASS',
    text: 'Suck a dick',
    createAt: 123
  });

  socket.on('createMessage', (data) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected User.');
  });
})

// Open server on port
server.listen(port, () => {
  console.log(`Server open on port ${port}.`);
});
