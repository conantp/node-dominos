var Board = require('./board.js');
var Boneyard = require('./boneyard.js');

class DominosGame{
	constructor() {
		this.id = 1;
		this.board = new Board();
		this.boneyard = new Boneyard();

		this.boneyard.fillBoneYard();

		this.players = [];

		this.socket = false;
	}

	addPlayer(player){
		this.players.push(player);
	}

	makePlay(player, domino){
		this.board.playPiece(domino);
		player.removeFromHand(domino);
	}

	fillPlayerHand(player){
		for(var i = 0; i < 7; i++){
			player.addToHand(this.boneyard.getDomino() );
		}
	}
}


module.exports = DominosGame;