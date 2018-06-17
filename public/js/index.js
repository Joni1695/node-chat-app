var socket = io();

socket.on('connect',function() {
  console.log('Connected to server!');
});

socket.on('disconnect',function() {
  console.log('Disconnected to server!');
});

socket.on('newMessage',function(data){
  console.log(data);
});

socket.emit('createMessage',{
  from: 'Not MYASS',
  text: 'Lick my balls'
});
