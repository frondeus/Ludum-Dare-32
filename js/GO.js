Engine.GO = function(args){
	Utils.extend(this,{
		x: 1,
		y: 1,
		tileset: app.atlases.ground,
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
};