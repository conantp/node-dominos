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

// console.log(game.getCurrentScore() );

io.on('connection', function(socket){
  console.log('a user connected');
  	socket.emit('player', p);


	socket.emit('cloud audiology receive', 'connect');
	// socket.broadcast('cloud audiology receive', 'connect2');
	// socket.send('cloud audiology receive', 'connect123');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('cloud audiology event', function(data){
		console.log('got event', data);
		io.emit('cloud audiology receive', data);
	});
});


http.listen((process.env.PORT || 3000), function(){
  console.log('listening on *:3000');
});