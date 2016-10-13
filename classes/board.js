class Board {
	constructor() {
		this.id = 1;

		this.spinner = [];
		this.pieces_up = [];
		this.pieces_down = [];
		this.pieces_left = [];
		this.pieces_right = [];
	}

	playPiece(domino){
		console.log('playpiece');
		this.pieces_up.push(domino);
	}

	getCurrentScore() {
	  console.log('test', this.pieces_up.last() );
	  return 'dsaf';
	}

	// get currentScore() {
	// 	console.log('hello');
	// 	return this.getCurrentScore();
	// }

	
}

module.exports = Board;