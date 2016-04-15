var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('chat message', function(msg) {
		console.log('message:' + msg);
		socket.broadcast.emit('chat message', msg);
    socket.broadcast.emit('typing');
	});

  socket.on('typing', function() {
		console.log('typing');
    socket.broadcast.emit('typing');
	});

	socket.on('disconnect', function() {
		console.log('disconnected');
	});
});

// static 경로
app.use(express.static(__dirname + '/public'));

http.listen(3000, function() {
	console.log('listening on *:3000');
});
