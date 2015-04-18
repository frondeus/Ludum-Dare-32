Engine = {
	tileSize: 32,
	tileMargin: 2,
	mapOffset: {
		x: 8,
		y: 8,
	},

	enemies: [],

};
var app = playground({
	scale: 2,
	smoothing: false,

	create: function(){
		this.loadAtlases("ground", "characters");
	},

	ready: function(){
		this.go = [];

		for(var x = 0; x < 8; x++)
			for(var y = 0; y < 8; y++)
				this.addGO({x: x, y: y});

		this.player = this.addGO({x: 4, y: 4}).addComponent("player", new Engine.Player());

		var enemy = this.addGO({x: 6, y: 6}).addComponent("enemy", new Engine.Enemy());
		Engine.enemies[Engine.enemies.length] = enemy;
	},

	addGO: function(args){
		this.go[this.go.length] = new Engine.GO(args);
		return this.go[this.go.length-1];
	},

	render: function(dt){
		this.layer.clear("#224");
		for(var i in this.go)
			this.go[i].render(dt);
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

