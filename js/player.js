Engine.Player = function(){

};

Engine.Player.prototype = {
	init: function(){
		this.go.tileset = app.atlases.characters;
	},

	input: function(key){
		switch(key){
			case 'up':
				this.go.y--;
				break;
			case 'down':
				this.go.y++;
				break;
			case 'left':
				this.go.x--;
				break;
			case 'right':
				this.go.x++;
				break;
		}
	}
};