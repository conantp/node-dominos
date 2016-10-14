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
		player.id = this.players.length + 1;
		this.players.push(player);
	}

	makePlay(player, domino){
		var last_right = this.board.pieces_right[this.board.pieces_right.length - 1];
		var first_right = this.board.pieces_right[0];
		var last_left = this.board.pieces_left[this.board.pieces_left.length - 1];
		console.log('go1234', last_right, last_left, first_right);

		if(typeof last_right == typeof undefined){
			this.board.playPiece(domino);
			player.removeFromHand(domino);			
		}
		else{
			// Check the piece
			if(domino.bottom_number == last_right.bottom_number){
				var temp = domino.top_number;
				domino.top_number = domino.bottom_number;
				domino.bottom_number = temp;

				this.board.playPiece(domino);
				player.removeFromHand(domino);			
			}
			else if(domino.top_number == last_right.bottom_number){
				this.board.playPiece(domino);
				player.removeFromHand(domino);			
			}
			else if(
					typeof last_left == typeof undefined  && 
					domino.top_number == last_right.bottom_number){
				this.board.playPieceLeft(domino);
				player.removeFromHand(domino);			
			}
			else if(
					typeof last_left == typeof undefined &&
					(
						domino.top_number == first_right.top_number  
					) 
				){
									var temp = domino.top_number;
					domino.top_number = domino.bottom_number;
					domino.bottom_number = temp;

					this.board.playPieceLeft(domino);
					player.removeFromHand(domino);			
			}
			else if(
					typeof last_left == typeof undefined &&
					(
						domino.bottom_number == first_right.top_number
					) 
				){

					this.board.playPieceLeft(domino);
					player.removeFromHand(domino);			
			}
			else if(typeof last_left != typeof undefined){
				if(domino.bottom_number == last_left.top_number){
					

					this.board.playPieceLeft(domino);
					player.removeFromHand(domino);			
				}
				if(domino.top_number == last_left.top_number){
					var temp = domino.top_number;
					domino.top_number = domino.bottom_number;
					domino.bottom_number = temp;

					this.board.playPieceLeft(domino);
					player.removeFromHand(domino);			
				}
				else{
					return false;
				}
			}
			else{
				return false;
			}
		}
		return true;

	}

	fillPlayerHand(player){
		for(var i = 0; i < 7; i++){
			player.addToHand(this.boneyard.getDomino() );
		}
	}
}


module.exports = DominosGame;