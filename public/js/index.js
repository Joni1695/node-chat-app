var socket = io();

socket.on('connect',function() {
  console.log('Connected to server!');
});

socket.on('disconnect',function() {
  console.log('Disconnected to server!');
});

socket.on('newMessage',function(data){
  var messageBox = jQuery('#messagebox');
  var text = messageBox.val();
  text = text + `
  ${data.from}: ${data.text}`;
  messageBox.val(text);
});

jQuery('#myform').on('submit',function(e) {
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  })
})
