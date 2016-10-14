if(typeof module != typeof undefined && typeof Domino != undefined){
	// var Domino = require('./domino.js');
}

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
		this.pieces_right.push(domino);
	}
	playPieceLeft(domino){
		console.log('playpiece');
		this.pieces_left.push(domino);
	}

	getCurrentScore() {
	  console.log('test', this.pieces_up.last() );
	  return 'dsaf';
	}

	fromJSON(obj){
	    for (var prop in obj){
	    	this[prop] = obj[prop];
	    }
	    for(var index in this.pieces_up){
	    	var dominoJSON = this.pieces_up[index];
	    	var newDomino = new Domino();
	    	newDomino.fromJSON(dominoJSON);
	    	this.pieces_up[index] = newDomino;
	    }
	}

	// get currentScore() {
	// 	console.log('hello');
	// 	return this.getCurrentScore();
	// }
}

if(typeof module != typeof undefined){
	module.exports = Board;
}