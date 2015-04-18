Engine.Map = {
	create: function() {
		Engine.player =Engine.addGo(new Engine.GO({x: 4, y: 4}), Engine.go, Engine.block, Engine.players)
			.addComponent("player", new Engine.Player());

		for(var x = 0; x < 8; x++)
			for(var y = 0; y < 8; y++)
				Engine.addGo(new Engine.GO({x: x, y: y}), Engine.go, Engine.ground);

		for(var i = 0; i < 5; i++){
			Engine.addGo(new Engine.GO({x: Utils.randomZ(0,7), y: Utils.randomZ(0,7)}),
			 Engine.go, Engine.enemies, Engine.block )
			.addComponent("enemy", new Engine.Enemy());
		}

		Engine.addGo(new Engine.GO({x: 0, y: 2, frame: 1, zIndex: 1}), Engine.go, Engine.block);
		Engine.addGo(new Engine.GO({x: 1, y: 2, frame: 1, zIndex: 1}), Engine.go, Engine.block);
		Engine.addGo(new Engine.GO({x: 2, y: 2, frame: 1, zIndex: 1}), Engine.go, Engine.block);
		Engine.addGo(new Engine.GO({x: 3, y: 2, frame: 1, zIndex: 1}), Engine.go, Engine.block);

		Engine.addGo(new Engine.GO({x: 5, y: 2, frame: 1, zIndex: 1}), Engine.go, Engine.block);
		Engine.addGo(new Engine.GO({x: 6, y: 2, frame: 1, zIndex: 1}), Engine.go, Engine.block);
		Engine.addGo(new Engine.GO({x: 7, y: 2, frame: 1, zIndex: 1}), Engine.go, Engine.block);

		


		Engine.sort();
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