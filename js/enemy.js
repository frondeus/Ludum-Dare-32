Engine.Enemy = function(){

};

Engine.Enemy.prototype = {
	init: function(){
		this.go.tileset = app.atlases.characters;
		this.go.frame = 1;
		this.go.zIndex = 1;
	},

	canGo: function(x, y){
		var player= Engine.isGo(Engine.players,x,y);
		if(player) {
			player.lifes--;
		}
		var ally = Engine.isGo(Engine.allies, x, y);
		if(ally){
			ally.removeComponent("ally")
				.addComponent("enemy", new Engine.Enemy());

			Engine.removeGo(ally,Engine.allies);
			Engine.addGo(ally,Engine.enemies);
		}
		if(Engine.isGo(Engine.block,x,y)) return false;
		if(Engine.isGo(Engine.ground,x,y)) return true;
		return false;
	},

	turn: function(){
		var nextX = this.go.x + Utils.randomZ(-1,1);
		var nextY = this.go.y + Utils.randomZ(-1,1);

		for(var i = 0; i < 4; i++)
		if(this.canGo(nextX,nextY)){
			app.tween(this.go)
				.wait(Utils.randomR(0,0.2))
				.to({x: nextX, y: nextY}, 0.1, "01");
				break;
		}
	}
};