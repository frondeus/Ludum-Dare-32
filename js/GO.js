Engine.GO = function(args){
	Utils.extend(this,{
		x: 1,
		y: 1,
		tileset: app.atlases.map,
		frame: 0,
		rFFactor: Utils.randomZ(0,2),
		zIndex: 0,
		scale: 0,
	},args);

	app.tween(this).wait(Utils.randomR(0.0,1.5)).to({scale: Engine.camera.scale}, 0.1 , "01").play();
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
		app.layer.save()
		
		.translate(Engine.camera.scale * this.x * (Engine.tileSize + Engine.tileMargin),
			Engine.camera.scale * this.y * (Engine.tileSize + Engine.tileMargin))
		
		.scale(this.scale,this.scale)
		.align(0.5)
		.drawAtlasFrame(this.tileset,this.frame * 3 + this.rFFactor, 0, 0)

		app.layer.restore();
	},
};