const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocation} = require('./utils/message');
const user = require('./utils/users');

var users = new user.Users;
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

  socket.on('join',(params,callback) => {
    users.removeUser(socket.id);
    users.addUser(socket.id,params.username);
    io.emit('updateUsers',users.getUserList());
    callback();
  });

  socket.on('createMessage', (data) => {
    io.emit('newMessage',generateMessage(users.getUser(socket.id).name,data.text));
  });

  socket.on('createLocation',(coords) => {
    io.emit('newLocationMessage', generateLocation(users.getUser(socket.id).name,coords.lat,coords.lng));
  });

  socket.on('disconnect',(username) => {
    users.removeUser(socket.id);
    io.emit('updateUsers',users.getUserList());
  });
});

// Open server on port
server.listen(port, () => {
  console.log(`Server open on port ${port}.`);
});
