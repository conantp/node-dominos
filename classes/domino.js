
class Domino {
	constructor(top, bottom) {
		this.top_number = top;
		this.bottom_number = bottom;
	}
}

if(typeof module != typeof undefined){
	module.exports = Domino;
}