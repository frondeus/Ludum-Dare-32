Engine.Ally = function(){

};

Engine.Ally.prototype = {
	init: function(){
		this.go.tileset = app.atlases.characters;
		this.go.frame = 2;
		this.go.zIndex = 2;
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

	action: function(){
		for(var i = 0; i < 4; i++){
			var nextX = this.go.x + Utils.randomZ(-1,1);
			var nextY = this.go.y + Utils.randomZ(-1,1);	

			
			if(this.canGo(nextX,nextY)){
				app.tween(this.go)
					.wait(Utils.randomR(0,0.2))
					.to({x: nextX, y: nextY}, 0.1, "01");	

				if(Engine.isNear(this.go ,Engine.player, 4)){
					var sound = app.sound.play("step" + Utils.randomZ(1,3));
					app.sound.setPlaybackRate(sound,Utils.randomR(0.6,2));
					app.sound.setVolume(sound,Utils.randomR(0.1,0.5));
				}
					break;
			}
		}
	}
};