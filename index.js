var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
	console.log('User Connection');
	io.emit('chat message', "A New User Connected")
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log('message: ' + msg);
	});
	socket.on('disconnect', function(){
		io.emit("A User Has Disconnected");
		console.log("User Disconnection");
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});