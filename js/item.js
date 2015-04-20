Engine.Item = function(){

};

Engine.Item.prototype = {
	init: function(){
		this.go.tileset = app.atlases.ui;
		this.go.frame = 1;//1;
		this.go.zIndex = 1;
	},

	pickUp: function(){
		if(this.go.frame == 1){ //Life!
			Engine.player.lifes++;
			Engine.removeGo(this.go,Engine.go,Engine.items);
		}
		else if(this.go.frame == 2){
			Engine.player.key = true;
			Engine.removeGo(this.go,Engine.go,Engine.items);
		}
		else if(this.go.frame == 3 && Engine.player.key){
			this.go.frame = 0;
			Engine.player.key = false;
		}
		else if(this.go.frame == 0){
			Engine.player.level++;
			app.setState(Engine.NextLevel);
			// Engine.generateMap();
		}
	}
};