var Board = require('./board.js');
var Boneyard = require('./boneyard.js');

class DominosGame{
	constructor() {
		this.id = 1;
		this.board = new Board();
		this.boneyard = new Boneyard();

		this.boneyard.fillBoneYard();

		this.players = [];

		this.active_player = false;

		this.socket = false;
	}

	getPlayer(id){
		for(var index in this.players){
			var a_player = this.players[index];
			if(a_player.id == id){
				return a_player;
			}
		}
		return false;
	}

	addPlayer(player){
		player.id = this.players.length + 1;
		this.players.push(player);
	}

	advancePlayer(){
		var active_player_index = false;
		for(var player_index in this.players){
			console.log(player_index);
			var this_player = this.players[player_index];

			if(this_player.id == this.active_player.id){
				console.log('found this player');
				active_player_index = player_index;
				break;
			}
		}

		if(active_player_index){
			active_player_index = parseInt( active_player_index);
			var next_player_index = parseInt(active_player_index) + 1;

			if(next_player_index >= this.players.length){
				next_player_index = 0;
			}

			console.log('attempting to advance', active_player_index, typeof active_player_index, next_player_index, this.players[next_player_index]);
			this.active_player = this.players[next_player_index];
			console.log('advanced to next player', this.active_player.player_name);

		}
		else{
			console.log("No player found to advance?");
			return false;
		}
	}

	makePlay(player, domino){
		if(this.active_player.id !== player.id){
			return false;
		}

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

	checkForScore(){
		var last_right = this.getLastRight();
		var last_left = this.getLastLeft();

		var sum = 0;

		var left_sum = 0;
		var right_sum = 0;

		if(! last_left && this.board.pieces_right.length > 1){
			last_left = this.board.pieces_right[0]; // get first left
		}

		if(last_left){
			if(last_left.top_number == last_left.bottom_number){
				// Double
				left_sum = last_left.top_number * 2;
			}
			else{
				left_sum = last_left.top_number;
			}
		}

		if(last_right){
			if(last_right.top_number == last_right.bottom_number){
				// Double
				right_sum = last_right.top_number * 2;
			}
			else{
				right_sum = last_right.bottom_number;
			}
		}

		if(! last_left){
			sum = right_sum;
		}
		else if(! last_right){
			sum = left_sum;
		}
		else{
			sum = right_sum + left_sum;
		}

		console.log('score', left_sum, right_sum, last_right, last_left, sum);

		if(sum % 5 == 0){
			return sum;
		}
		else{
			return false;
		}
	}

	getLastLeft(){
		if(this.board.pieces_left.length){
			return this.board.pieces_left[this.board.pieces_left.length - 1];;
		}
		else{
			return false;
		}
	}

	getLastRight(){
		if(this.board.pieces_right.length){
			return this.board.pieces_right[this.board.pieces_right.length - 1];;
		}
		else{
			return false;
		}
	}
}


module.exports = DominosGame;