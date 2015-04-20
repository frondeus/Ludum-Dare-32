Engine.Enemy = function(){

};

Engine.Enemy.prototype = {
	init: function(){
		this.go.tileset = app.atlases.characters;
		this.go.frame = 1;
		this.go.zIndex = 2;
	},

	canGo: function(x, y){
		var player= Engine.isGo(Engine.players,x,y);
		if(player) {
			player.lifes--;
			var sound = app.sound.play("hurt" + Utils.randomZ(1,3));
			app.sound.setPlaybackRate(sound,Utils.randomR(0.5,2));
			app.sound.setVolume(sound,Utils.randomR(0.6,1));
			return true;
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

			if(Math.abs(this.go.x - Engine.player.x) < 6 && Math.abs(this.go.y - Engine.player.y) < 6){
				var sound = app.sound.play("step" + Utils.randomZ(1,3));
				app.sound.setPlaybackRate(sound,Utils.randomR(0.5,2));
				app.sound.setVolume(sound,Utils.randomR(0.1,0.5));
			}

			if(Math.abs(this.go.x - Engine.player.x) < 2 && Math.abs(this.go.y - Engine.player.y) < 2){
				var sound = app.sound.play("enemy" + Utils.randomZ(1,3));
				app.sound.setPlaybackRate(sound,Utils.randomR(0.5,2));
				app.sound.setVolume(sound,Utils.randomR(0.2,1));
			}
				break;
		}
	}
};