var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var Domino = require('./classes/domino.js');
// var Board = require('./classes/board.js');
// var Boneyard = require('./classes/boneyard.js');
var DominosGame = require('./classes/dominosgame.js');
var Player = require('./classes/player.js');

app.use('/dist', express.static(__dirname + '/dist'));

app.get('/', function(req, res){
  res.sendfile('html/player.html');
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

app.get('/classes/board.js', function(req, res){
  res.sendfile('classes/board.js');
});


// TESTING STUFF
var game = new DominosGame();

// game.socket = io;

// var p = new Player("Patrick");

// game.addPlayer(p);

// console.log(game);

// game.fillPlayerHand(p);

// game.makePlay(p, p.hand.pop() );
// game.makePlay(p, p.hand.pop() );
// game.makePlay(p, p.hand.pop() );
// console.log(game.boneyard.boneyard);
// console.log(game.board);
// console.log(p);
console.log(game);
// END TESTING

// console.log(game.getCurrentScore() );

var gameServer = {};

gameServer.sendPlayerList = function(){
	io.emit('player-list', game.players);
};

gameServer.sendGameList = function(){
	io.emit('game-list', game);
};

gameServer.dominoPlay = function(playerJSON, dominoJSON){
	// console.log('got domino play', player, domino);

	var player = new Player();
	player.fromJSON(playerJSON);

	player = game.getPlayer(player.id); // get the actual game one

	var domino = new Domino();
	domino.fromJSON(dominoJSON);
	
	if(! game.makePlay(player, domino) ){
		io.emit('domino-play-error', "Invalid Play");
	}
	else{
		var score = game.checkForScore();
		player.score += score;
		if(score){
			io.emit('player-score', player, score);
			io.emit('player-list', game.players);
		}

		io.emit('player-refresh', player);
		io.emit('board-refresh', game.board);
	}


	console.log(player);
	console.log(game.board);

	console.log(game.players);

	// io.emit('domino-play-error', "Invalid Play");
};

gameServer.playerAdd = function(player){
	console.log('got event', player);

	var my_player = new Player(player.player_name);
	game.addPlayer(my_player);

	game.fillPlayerHand(my_player);

	console.log(game);

	io.emit('player-refresh', my_player);

	io.emit('received', player);

	gameServer.sendPlayerList();
};

gameServer.boardRefresh = function(){
	io.emit('board-refresh', game.board);

};

gameServer.connectActions = function(){
	gameServer.boardRefresh();
	gameServer.sendPlayerList();
};

gameServer.resetGame = function(){
	game = new DominosGame();

	// io.emit('player-refresh', false);

	gameServer.boardRefresh();
	gameServer.sendPlayerList();
};


io.on('connection', function(socket){
	console.log('a user connected');

	gameServer.connectActions();

	socket.on('player-list', gameServer.sendPlayerList); 
	socket.on('game-list', gameServer.sendGameList);

	socket.on('domino-play', gameServer.dominoPlay);
	socket.on('player-add', gameServer.playerAdd);

	socket.on('reset-game', gameServer.resetGame);

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});


http.listen((process.env.PORT || 3002), function(){
  console.log('listening on *:3002');
});