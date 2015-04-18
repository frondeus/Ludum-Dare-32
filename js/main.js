Engine = {
	tileSize: 32,
	tileMargin: 2,
	mapOffset: {
		x: 8,
		y: 8,
	},

	players: [],
	enemies: [],
	go: [],
	ground: [],
	block: [],

	addGo: function(){
		var go = new Engine.GO(arguments[0]);
		for(var i = 1; i < arguments.length; i++)
			arguments[i][arguments[i].length] = go;
		return go;
	},

	isGo: function(collection, x, y){
		for(var i in collection)
			if(x == collection[i].x && y == collection[i].y) return collection[i];
		return null;
	},

	turn: function(){
		for(var i in this.enemies)
			this.enemies[i].enemy.turn();
	},
};
var app = playground({
	smoothing: false,

	create: function(){
		this.loadAtlases("map", "characters", "ui");
	},

	ready: function(){

		for(var x = 0; x < 8; x++)
			for(var y = 0; y < 8; y++)
				Engine.addGo({x: x, y: y}, Engine.go, Engine.ground);

		Engine.player = Engine.addGo({x: 4, y: 4}, Engine.go, Engine.block, Engine.players).addComponent("player", new Engine.Player());

		Engine.addGo({x: 6, y: 6}, Engine.go, Engine.enemies, Engine.block ).addComponent("enemy", new Engine.Enemy());

		Engine.addGo({x: 0, y: 2, frame: 1}, Engine.go, Engine.block);
		Engine.addGo({x: 1, y: 2, frame: 1}, Engine.go, Engine.block);
		Engine.addGo({x: 2, y: 2, frame: 1}, Engine.go, Engine.block);
		Engine.addGo({x: 3, y: 2, frame: 1}, Engine.go, Engine.block);

		Engine.addGo({x: 5, y: 2, frame: 1}, Engine.go, Engine.block);
		Engine.addGo({x: 6, y: 2, frame: 1}, Engine.go, Engine.block);
		Engine.addGo({x: 7, y: 2, frame: 1}, Engine.go, Engine.block);
		
		this.setState(Engine.Map);
	},
});

