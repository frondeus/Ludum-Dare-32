Engine.GO = function(args){
	Utils.extend(this,{
		x: 1,
		y: 1,
		tileset: app.atlases.map,
		frame: 0,
		rFFactor: Utils.randomZ(0,2),
		zIndex: 0,
		scale: 0,
		is: [],
	},args);

	app.tween(this).wait(Utils.randomR(0.0,1.5)).to({scale: Engine.camera.scale}, 0.1 , "01").play();
	// this.scale = Engine.camera.scale;
};

Engine.GO.prototype = {

	addComponent: function(name,c){
		this[name] = c;
		c.go = this;
		if(c.init) c.init();
		return this;
	},

	removeComponent: function(name){
		this[name] = null;
		return this;
	},

	render: function(dt){
		var y = Engine.camera.scale * this.y * (Engine.tileSize + Engine.tileMargin);
		// console.log(y +  " " + this.scale);
		// debugger;

		app.layer.save()
		
		.translate(Engine.camera.scale * this.x * (Engine.tileSize + Engine.tileMargin),y)
		
		.scale(this.scale,this.scale)
		.align(0.5)
		.drawAtlasFrame(this.tileset,this.frame * 3 + this.rFFactor, 0, 0);

		// if(this.id)
			// app.layer.font("16px Arial").fillStyle("#f00").fillText("" + this.id,-8,0);
		

		app.layer.restore();
	},
};