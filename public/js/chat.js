var socket = io();

var createLI = function(data){
  var li = jQuery('<li></li>');
  var i = jQuery('<i></i>');
  i.text(`${data.from}: `);
  li.append(i);
  li.append(`${data.body}`);
  return li;
}

socket.on('connect',function(){
  var params =jQuery.deparam(window.location.search);

  socket.emit('join',params,function(err){
    if(err){
      window.location.href = '/';
    } else{
      
    }
  });
});

socket.on('newMessage',function(data){
  var li = createLI({
    from: data.from,
    body: data.text
  });
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(data){
  var li = jQuery('<li></li>');
  var i = jQuery('<i></i>');
  var a = jQuery('<a target="_blank">My current location</a>');

  i.text(`${data.from}: `);
  li.append(i);
  a.attr('href', data.url);
  li.append(a);
  jQuery('#messages').append(li);
});

socket.on('updateUsers',function(data){
    jQuery('#users-list').empty();
    for(var user of data){
      var li = jQuery('<li></li>');
      li.text(`${user.name}`);
      jQuery('#users-list').append(li);
    }
});

jQuery('#submit').on('click',function(e){
  jQuery('#myform').trigger('submit');
});

jQuery('#myform').on('submit',function(e) {
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  })
})

var locationButton = jQuery('#geo');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocation',{
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  },function(){
    return alert('Unable to fetch location.');
  });
});
