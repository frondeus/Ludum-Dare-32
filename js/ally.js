Engine.Ally = function(){

};

Engine.Ally.prototype = {
	init: function(){
		this.go.tileset = app.atlases.characters;
		this.go.frame = 2;
		this.go.zIndex = 1;
	},

	canGo: function(x, y){
		if(Engine.isGo(Engine.enemy,x,y))
		{
			this.go.removeComponent("ally")
				.addComponent("enemy", new Engine.Enemy());

			Engine.removeGo(this.go,Engine.allies);
			Engine.addGo(this.go,Engine.enemies);
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
				.to({x: nextX, y: nextY}, 0.1, "01");
				break;
		}
	}
};