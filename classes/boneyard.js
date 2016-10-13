var Domino = require('./domino.js');

class Boneyard{
	constructor() {
		this.boneyard = [];
	}

	fillBoneYard(max_number){
		for(var i = 0; i <= 6; i++){
			for(var j = 0; j <=6; j++){
				if(j >= i){
					this.boneyard.push(new Domino(i, j) );
				}
			}
		}
	}

	getDomino(){
		return this.boneyard.pop();
	}
}

module.exports = Boneyard;