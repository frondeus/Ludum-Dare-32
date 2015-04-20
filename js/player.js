Engine.Player = function(){
};

Engine.Player.prototype = {
	init: function(){
		this.go.tileset = app.atlases.characters;
		this.go.lifes = 3;
		this.go.level = 1;
		this.go.zIndex = 3;
	},

	canGo: function(x, y){
		var enemy = Engine.isGo(Engine.enemies,x,y);
		if(enemy) {
			enemy.removeComponent("enemy")
				.addComponent("ally", new Engine.Ally());

			Engine.removeGo(enemy,Engine.enemies);
			Engine.addGo(enemy,Engine.allies);

			var sound = app.sound.play("love" + Utils.randomZ(1,3));
			app.sound.setPlaybackRate(sound,Utils.randomR(0.5,2));
			app.sound.setVolume(sound,Utils.randomR(0.6,1));
		}
		var item = Engine.isGo(Engine.items, x, y);
		if(item) 
			item.item.pickUp();
		if(Engine.isGo(Engine.block,x,y)) return false;
		if(Engine.isGo(Engine.ground,x,y)) return true;
		return false;
	},

	input: function(x,y){
		var nextX = this.go.x;
		var nextY = this.go.y;
		
		if(Math.abs(x - this.go.x) <= 1 && Math.abs(y - this.go.y) <= 1){
			if(Math.abs(x - this.go.x) <= 1)	
				nextX = x;
			if(Math.abs(y - this.go.y) <= 1)
				nextY = y;
		}

		if(this.canGo(nextX, nextY)){
			app.tween(this.go)
				.to({x: nextX, y: nextY}, 0.1, "01")
				.play();

			var sound = app.sound.play("step" + Utils.randomZ(1,3));
			app.sound.setPlaybackRate(sound,Utils.randomR(0.5,2));
			app.sound.setVolume(sound,Utils.randomR(0.1,0.5));
		}

		Engine.turn();
	}
};