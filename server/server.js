var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function() {
    console.log('listening on:3000');
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

//app.use(express.static(__dirname + '/pucblic'));

io.on('connection', function(socket) {
    console.log('a player connected');
    socket.on('login', function(name) {
        socket.playerName = name;
        console.log(socket.playerName);
        // io.emit('news',msg);
    });
    socket.on('selectRoom', function(roomId) {
        io.emit('selectRoom', {
            playerName: socket.playerName,
            roomId: roomId
        });
    });
    socket.on('others', function(msg) {
        socket.broadcast.emit(msg.type, msg.data);
    });
    socket.on('all', function(msg) {
        io.emit(msg.type, msg.data);
    });
    // socket.emit('connected','goodbye world!');
});
var peopleOfRoom1 = 0;
var peopleOfRoom2 = 0;
var peopleOfRoom3 = 0;
var room1 = io.of('/room1').on('connection', function(socket) {
    console.log("some one connected room1");
    peopleOfRoom1++;
    console.log("There are" + peopleOfRoom1 + "people in room1");
    socket.on('disconnect', function() {
        peopleOfRoom1--;
        console.log("There are " + peopleOfRoom1 + " people in room1");
    });
    socket.emit('assign place', peopleOfRoom1);
    // socket.on('change turn', function() {
    //     socket.broadcast.emit('change turn');
    // });
    // socket.on('click tile', function(msg) {
    //     socket.broadcast.emit('click tile', msg);
    // });
    socket.on('others', function(msg) {
        socket.broadcast.emit(msg.type, msg.data);
    });
    socket.on('all', function(msg) {
        room1.emit(msg.type, msg.data);
    });
});

var room2 = io.of('/room2').on('connection', function(socket) {
    console.log("some one connected room2");
    peopleOfRoom2++;
    console.log("There are" + peopleOfRoom2 + "people in room2");
    socket.on('disconnect', function() {
        peopleOfRoom2--;
        console.log("There are " + peopleOfRoom2 + " people in room2");
    });
    socket.emit('assign place', peopleOfRoom2);
});

var room3 = io.of('/room3').on('connection', function(socket) {
    console.log("some one connected room3");
    peopleOfRoom3++;
    console.log("There are" + peopleOfRoom1 + "people in room3");
    socket.on('disconnect', function() {
        peopleOfRoom3--;
        console.log("There are " + peopleOfRoom3 + " people in room3");
    });
    socket.emit('assign place', peopleOfRoom3);
});



/*<!-- http.listen(3000,function(){
	console.log('listening on : 3000');
}); -->*/