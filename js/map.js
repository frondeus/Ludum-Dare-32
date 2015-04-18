Engine.Map = {
	create: function() {

	},

	enter: function() {

	},

	leave: function() {

	},

	step: function(dt) {
		if(Engine.player.lifes <= 0){
			console.log("Game Over!");
			app.setState(null);
		}
	},

	render: function(dt) {
		app.layer.clear("#224");
		app.layer.save().scale(2,2);
		for(var i in Engine.go)
			Engine.go[i].render(dt);
		app.layer.restore();
	},

	mousedown: function(event) {
		event.x /= 2;
		event.y /= 2;
		if(event.button == "left"){
			var x = Math.floor((event.x- Engine.mapOffset.x) / (Engine.tileSize + Engine.tileMargin) );
			var y = Math.floor((event.y- Engine.mapOffset.y) / (Engine.tileSize + Engine.tileMargin) );
			// console.log(x +  " + " +  y);
			Engine.player.player.input(x,y);
		}
	},

	keyup: function(event){
		// switch(event.key){
		// 	default:
		// 		Engine.player.player.input(event.key);
		// 		break;
		// }
	}
};