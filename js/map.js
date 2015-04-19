Engine.Map = {
	create: function() {
	},

	enter: function() {
		Engine.generateMap();
	},

	
	leave: function() {

	},

	step: function(dt) {
		// Engine.camera.x = (app.width / 2) - ((Engine.player.x) * (Engine.camera.scale * Engine.tileSize + Engine.tileMargin)) - Engine.tileMargin;
		// Engine.camera.y = (app.height / 2) - ((Engine.player.y) * (Engine.camera.scale * Engine.tileSize + Engine.tileMargin)) - Engine.tileMargin;
			
	},

	render: function(dt) {
		app.layer.clear("#224");
		app.layer.save().translate(Engine.camera.x,Engine.camera.y);

		for(var i in Engine.go)
			Engine.go[i].render(dt);
		app.layer.restore();
	},

	mousedown: function(event) {
		if(event.button == "left"){
			var x = event.x - (Engine.camera.x);
			var y = event.y - (Engine.camera.y);
			x = Math.floor(x / (Engine.camera.scale * Engine.tileSize + Engine.tileMargin) + 0.5);
			y = Math.floor(y / (Engine.camera.scale * Engine.tileSize + Engine.tileMargin) + 0.5);
			Engine.player.player.input(x,y);
		}
	},

	keyup: function(event){
	}
};