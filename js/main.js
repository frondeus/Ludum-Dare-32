Engine = {
	tileSize: 32,
	tileMargin: 2,
	mapOffset: {
		x: 8,
		y: 8,
	},

	enemies: [],

	map: [],
	mapWidth: 8,
	mapHeight: 8,

};
var app = playground({
	scale: 2,
	smoothing: false,

	create: function(){
		this.loadAtlases("ground", "characters");
	},

	ready: function(){
		for(var x = 0; x < Engine.mapWidth; x++){
			Engine.map[x] = [];	
			for(var y = 0; y < Engine.mapHeight; y++){
				Engine.map[x][y] = [];
				this.addGo(Engine.map[x][y]);
			}
		}
		// debugger;
		this.player = this.addGo(Engine.map[4][4]).addComponent("player", new Engine.Player());

		this.addGo(Engine.map[6][6],Engine.enemies).addComponent("enemy", new Engine.Enemy());
	},

	addGo: function(){
		var go = new Engine.GO();
		for(var i = 0; i < arguments.length; i++)
			arguments[i][arguments[i].length] = go;
		return go;
	},

	render: function(dt){
		this.layer.clear("#224");
		for(var x = 0; x < Engine.mapWidth; x++)
			for(var y = 0; y < Engine.mapHeight; y++)
			
				for(var i in Engine.map[x][y]){
					var go = Engine.map[x][y][i];
					app.layer
						.drawAtlasFrame(go.tileset,go.frame * 3 + go.rFFactor, 
							Engine.mapOffset.x + x * (Engine.tileSize + Engine.tileMargin), 
							Engine.mapOffset.y + y * (Engine.tileSize + Engine.tileMargin));
				}
	},

	turn: function(){
		for(var i in Engine.enemies)
			Engine.enemies[i].enemy.turn();
	},

	keyup: function(event){
		
		switch(event.key){
			default:
				this.player.player.input(event.key);
				break;
		}
		this.turn();
	}
});

