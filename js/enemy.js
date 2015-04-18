Engine.Enemy = function(){

};

Engine.Enemy.prototype = {
	init: function(){
		this.go.tileset = app.atlases.characters;
		this.go.frame = 1;
	},

	turn: function(){
		var nextX = this.go.x + Utils.randomZ(-1,1);
		var nextY = this.go.y + Utils.randomZ(-1,1);

	}
};