if(typeof module != typeof undefined){
	var Domino = require('./domino.js');
}

class Player {
	constructor(player_name) {
		this.player_name = player_name;
		this.score = 0;
		this.id = false;
		this.hand = [];
	}

	fromJSON(obj){
	    for (var prop in obj){
	    	this[prop] = obj[prop];
	    }
	    for(var index in this.hand){
	    	var dominoJSON = this.hand[index];
	    	var newDomino = new Domino();
	    	newDomino.fromJSON(dominoJSON);
	    	this.hand[index] = newDomino;
	    }
	}

	addToHand(domino){
		this.hand.push(domino);
	}

	removeFromHand(domino){
		for(var index in this.hand){
			var a_domino = this.hand[index];
			// console.log('test123333', a_domino, domino, (a_domino.top_number == domino.top_number));
			if(	
				(
					a_domino.top_number == domino.top_number &&
					a_domino.bottom_number == domino.bottom_number
				)
				||
				(
					a_domino.bottom_number == domino.top_number &&
					a_domino.top_number == domino.bottom_number

				)
			){
				// console.log('remove',this.hand, this.hand.indexOf(domino), domino);
			    // this.hand = this.hand.splice(index, 1);
				delete this.hand[index];
				break;
			}
		}

		this.hand = this.hand.filter(function (item) { return item.top_number != undefined });
	}
}

if(typeof module != typeof undefined){
	module.exports = Player;	
}
