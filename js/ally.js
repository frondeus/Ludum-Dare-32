Engine.Ally = function(){

};

Engine.Ally.prototype = {
	init: function(){
		this.go.tileset = app.atlases.characters;
		this.go.frame = 2;
		this.go.zIndex = 2;
	},

	canGo: function(x, y){
		var enemy = Engine.isGo(Engine.enemy,x,y);
		if(enemy)
		{
			Engine.removeGo(this.go, Engine.go, Engine.allies, Engine.block);
			Engine.removeGo(enemy, Engine.go, Engine.enemies, Engine.block);
		}
		if(Engine.isGo(Engine.block,x,y)) return false;
		if(Engine.isGo(Engine.ground,x,y)) return true;
		return false;
	},

	goTo: function(x, y){
		if(this.canGo(x,y)){
			app.tween(this.go)
				.wait(Utils.randomR(0,0.2))
				.to({x: x, y: y}, 0.1, "01");	
			
			if(Engine.isNear(this.go ,Engine.player, 4)){
				var sound = app.sound.play("step" + Utils.randomZ(1,3));
				app.sound.setPlaybackRate(sound,Utils.randomR(0.6,2));
				app.sound.setVolume(sound,Utils.randomR(0.1,0.5));
			}
			return true;
		}
		return false;
	},

	action: function(){
		if(Engine.isNear(this.go, Engine.player, 4)){
			var dX = this.go.x - Engine.player.x;
			var dY = this.go.y - Engine.player.y;
			dX = Math.min(1, Math.max(-1, dX));
			dY = Math.min(1, Math.max(-1, dY));
			this.goTo(this.go.x  + dX, this.go.y + dY);
		}	
		else
		for(var i = 0; i < 4; i++){
			var nextX = this.go.x + Utils.randomZ(-1,1);
			var nextY = this.go.y + Utils.randomZ(-1,1);	

			if(this.goTo(nextX, nextY))
				break;
		}
	}
};