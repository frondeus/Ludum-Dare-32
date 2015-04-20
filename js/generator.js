Engine.generateMap = function(){
	Engine.init();

	Engine.generator.mapW = Utils.randomZ(8,16);
	Engine.generator.mapH = Utils.randomZ(8,16);
	Engine.generator.roomSize = Utils.randomZ(8,16);
	Engine.generator.roomCount = Utils.randomZ(8,32);

	Engine.generator.makeRooms();

	Engine.generator.spawnPlayer();

	Engine.sort();
};

Engine.generator = {
	maxLoop: 16,
	uniqueId: 0,

	makeRooms: function(){
		this.edges = [];
		this.rooms = [];
		this.zones = [];

		for(var i = 0; i < this.roomCount; i++)
			this.makeRoom();
	},

	isOverlap: function(X,Y,W,H){
		for(var i in this.rooms)
			if(!(W < this.rooms[i].X || X > this.rooms[i].W || H < this.rooms[i].Y || Y > this.rooms[i].H))
				return true;
		return false;
	},

	makeRoom: function(){
		for(var loop = 0; loop < this.maxLoop; loop++){
			var X = Utils.randomZ(0, this.mapW);
			var Y = Utils.randomZ(0, this.mapH);
			var W = X + Utils.randomZ(3, this.roomSize);
			var H = Y + Utils.randomZ(3, this.roomSize);

			if(!this.isOverlap(X,Y,W,H)){
				var id = ++this.uniqueId;
				this.zones[id] = [];

				for(var x = X; x < W; x++)
					for(var y = Y; y < H; y++)
						this.zones[id][this.zones[id].length] = Engine.addGo(new Engine.GO({x: x, y: y, id: id}),
						 	Engine.go, Engine.ground);
				this.rooms[this.rooms.length] = {X: X, Y: Y, W: W, H: H};
				break;
			}
		}
	},

	isFree: function(collection, x, y){
		return Engine.isGo(Engine.ground,x,y) && !Engine.isGo(Engine.block,x,y)
			&& !Engine.isGo(collection,x,y);
	},

	spawnPlayer: function(){
		for(var loop = 0; loop = this.maxLoop; loop++){
			var x = Utils.randomZ(Math.floor(-this.mapW / 2), (this.mapW * 1.5));
			var y = Utils.randomZ(Math.floor(-this.mapW / 2), (this.mapH * 1.5));
			if(this.isFree(Engine.player, x, y)){
				if(!Engine.player){
					Engine.player = new Engine.GO({x: x , y: y});
					Engine.player.addComponent("player", new Engine.Player());
				}
				else {
					Engine.player.x = x;
					Engine.player.y = y;
				}
				Engine.addGo(Engine.player, Engine.go, Engine.block, Engine.players);
				break;
			}
		}
	},

};

