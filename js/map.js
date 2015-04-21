Engine.NextLevel = {
	render: function(dt){
		app.layer.clear("#224");

		app.layer.font("48px Arial")
			.fillStyle("#fff")
			.fillText("" + Engine.player.level,app.width/2 - 10,app.height/2);
	},

	mousedown: function(event){
		if(event.button == "left")
			app.setState(Engine.Map);

	},

	keydown: function(event){
		app.setState(Engine.Map);
	}
};

Engine.GameOver = {
	render: function(dt){
		app.layer.clear("#224");

		app.layer.font("48px Arial")
			.fillStyle("#fff")
			.fillText("Game Over: " + Engine.player.level,app.width/2 - 150,app.height/2);
	},

	mousedown: function(event){
		if(event.button == "left"){
			Engine.player = null;
			app.setState(Engine.Map);
		}
	},

	keydown: function(event){
		Engine.player = null;
		app.setState(Engine.Map);
	}
};

Engine.Map = {
	create: function() {

	},

	enter: function() {
		this.bit = [0.5,0.5,0.5];
		Engine.generateMap();

		app.tween(this.bit).to({
			0: 1
		},Utils.randomR(1,2),"02130").loop();

		app.tween(this.bit).to({
			1: 1
		},Utils.randomR(1,2),"02130").loop();

		app.tween(this.bit).to({
			2: 1
		},Utils.randomR(1,2),"02130").loop();
	},

	
	leave: function() {

	},

	step: function(dt) {
		Engine.camera.x = (app.width / 2) - ((Engine.player.x) * (Engine.camera.scale * Engine.tileSize + Engine.tileMargin)) - Engine.tileMargin;
		Engine.camera.y = (app.height / 2) - ((Engine.player.y) * (Engine.camera.scale * Engine.tileSize + Engine.tileMargin)) - Engine.tileMargin;
			
	},

	render: function(dt) {
		app.layer.clear("#224");
		app.layer.save().translate(Engine.camera.x,Engine.camera.y);

		for(var i in Engine.go)
			Engine.go[i].render(dt);
		app.layer.restore();

		for(var i = 0; i < Engine.player.lifes; i++){
			app.layer
				.save()
				.translate(32 + 32 * i,32)
				.align(0.5)
				.scale(this.bit[i % 3],this.bit[i % 3])
				.drawAtlasFrame(app.atlases.ui,3 + i % 3,0,0)
				.restore();
		}

		if(Engine.player.key){
			app.layer
				.save()
				.translate(32,64+32)
				.align(0.5)
				.drawAtlasFrame(app.atlases.ui,6,0,0)
				.restore();
		}
			
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

	touchstart: function(event) {
    	var x = event.x - (Engine.camera.x);
		var y = event.y - (Engine.camera.y);
		x = Math.floor(x / (Engine.camera.scale * Engine.tileSize + Engine.tileMargin) + 0.5);
		y = Math.floor(y / (Engine.camera.scale * Engine.tileSize + Engine.tileMargin) + 0.5);
		Engine.player.player.input(x,y);
	},
	
	keydown: function(event){
		var x = Engine.player.x, y = Engine.player.y;
		
		switch(event.key) {
			case "a":
			case "left":
			case "numpad4":
				x--;
				break;
			case "d":
			case "right":
			case "numpad6":
				x++;
				break;
			case "w":
			case "up":
			case "numpad8":
				y--;
				break;
			case "s":
			case "down":
			case "numpad2":
				y++;
				break;
			case "numpad7":
				x--;
				y--;
				break;
			case "numpad9":
				x++;
				y--;
				break;
			case "numpad1":
				x--;
				y++;
				break;
			case "numpad3":
				x++;
				y++;
				break;
		}
		Engine.player.player.input(x,y);
	}
};