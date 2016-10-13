var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// var Domino = require('./classes/domino.js');
// var Board = require('./classes/board.js');
// var Boneyard = require('./classes/boneyard.js');
var DominosGame = require('./classes/dominosgame.js');
var Player = require('./classes/player.js');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/classes.js', function(req, res){
  res.sendfile('classes.js');
});



// TESTING STUFF
var game = new DominosGame();

var p = new Player("Patrick");

game.addPlayer(p);

console.log(game);

game.fillPlayerHand(p);

game.makePlay(p, p.hand.pop() );
game.makePlay(p, p.hand.pop() );
game.makePlay(p, p.hand.pop() );
console.log(game.boneyard.boneyard);
console.log(game.board);
console.log(p);
// END TESTING

// console.log(game.getCurrentScore() );

io.on('connection', function(socket){
  console.log('a user connected');
  	socket.emit('player', p);

	socket.emit('connect123', 'connect');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('event', function(data){
		console.log('got event', data);
		io.emit('received', data);
	});
});


http.listen((process.env.PORT || 3000), function(){
  console.log('listening on *:3000');
});