
class Domino {
	constructor(top, bottom) {
		this.top_number = top;
		this.bottom_number = bottom;
	}

	isDouble(){
		return this.top_number == this.bottom_number;
	}

	fromJSON(obj){
	    for (var prop in obj) this[prop] = obj[prop];
	}
}

if(typeof module != typeof undefined){
	module.exports = Domino;
}