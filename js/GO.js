Engine.GO = function(args){
	Utils.extend(this,{
		x: 1,
		y: 1,
		tileset: app.atlases.map,
		frame: 0,
		rFFactor: Utils.randomZ(0,2),
	},args);
};

Engine.GO.prototype = {

	addComponent: function(name,c){
		this[name] = c;
		c.go = this;
		if(c.init) c.init();
		return this;
	},

	render: function(dt){
		app.layer
			.drawAtlasFrame(this.tileset,this.frame * 3 + this.rFFactor, 
				Engine.mapOffset.x + this.x * (Engine.tileSize + Engine.tileMargin), 
				Engine.mapOffset.y + this.y * (Engine.tileSize + Engine.tileMargin)
		);
	},
};