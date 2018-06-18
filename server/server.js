const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocation} = require('./utils/message');

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
  socket.on('createMessage', (data) => {
    io.emit('newMessage',generateMessage(data.from,data.text));
  });

  socket.on('createLocation',(coords) => {
    io.emit('newLocationMessage', generateLocation('USER',coords.lat,coords.lng));
  })
});

// Open server on port
server.listen(port, () => {
  console.log(`Server open on port ${port}.`);
});
