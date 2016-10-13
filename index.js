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

app.get('/player', function(req, res){
  res.sendfile('html/player.html');
});

app.get('/classes.js', function(req, res){
  res.sendfile('classes.js');
});

app.get('/classes/player.js', function(req, res){
  res.sendfile('classes/player.js');
});

app.get('/classes/domino.js', function(req, res){
  res.sendfile('classes/domino.js');
});


// TESTING STUFF
var game = new DominosGame();

// game.socket = io;

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
console.log(game);
// END TESTING

// console.log(game.getCurrentScore() );

io.on('connection', function(socket){
  console.log('a user connected');
  	socket.emit('player', p);

	socket.emit('connect123', 'connect');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('domino-play', function(player, domino){
		console.log('got domino play', player, domino);

		player = game.players[0];
		domino = player.hand[0];
		
		game.makePlay(player, domino);
		console.log(player);
		console.log(game.board);

	});

	socket.on('player-add', function(player){
		console.log('got event', player);

		var my_player = new Player(player.player_name);
		game.addPlayer(my_player);
		console.log(game);

		game.fillPlayerHand(my_player);

		io.emit('player-refresh', my_player);

		io.emit('received', player);
	});

	socket.on('event', function(data){
		console.log('got event', data);
		io.emit('received', data);
	});
});


http.listen((process.env.PORT || 3000), function(){
  console.log('listening on *:3000');
});