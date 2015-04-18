Engine.Enemy = function(){

};

Engine.Enemy.prototype = {
	init: function(){
		this.go.tileset = app.atlases.characters;
		this.go.frame = 1;
	},

	canGo: function(x, y){
		if(Engine.isGo(Engine.players,x,y)) {
			app.setState(Engine.Fight);
		}
		if(Engine.isGo(Engine.block,x,y)) return false;
		if(Engine.isGo(Engine.ground,x,y)) return true;
		return false;
	},

	turn: function(){
		var nextX = this.go.x + Utils.randomZ(-1,1);
		var nextY = this.go.y + Utils.randomZ(-1,1);

		if(this.canGo(nextX,nextY)){
			app.tween(this.go)
				.to({x: nextX, y: nextY}, 0.1, "01");
		}
	}
};