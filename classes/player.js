class Player {
	constructor(player_name) {
		this.player_name = player_name;
		this.score = 0;
		this.hand = [];
	}

	addToHand(domino){
		this.hand.push(domino);
	}

	removeFromHand(domino){

		for(var index in this.hand){
			var a_domino = this.hand[index];
			console.log('test', a_domino, domino, (a_domino == domino));
			if(a_domino == domino){
				delete this.hand[index];
				return;
			}
		}
	}

	// get toString() {
	// 	console.log(this.score);
	// 	return "TEST123";
	// }



  // get area() {
  //   return this.calcArea();
  // }

  // calcArea() {
  //   return this.height * this.width;
  // }
}

if(typeof module != typeof undefined){
	module.exports = Player;	
}
