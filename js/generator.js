Engine.generateMap = function(){
	Engine.init();

	Engine.generator.mapW = Utils.randomZ(8,16);
	Engine.generator.mapH = Utils.randomZ(8,16);
	Engine.generator.roomSize = Utils.randomZ(8,16);
	Engine.generator.roomCount = Utils.randomZ(8,32);
	Engine.generator.maxMazeLength = Utils.randomZ(8,16);
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

		this.makeMazes();
	},

	makeMaze: function(x, y){
		var id = ++this.uniqueId;
		var stack = [];
		var length = 1;

		Engine.addGo(new Engine.GO({x: x, y: y, id: id}), Engine.go, Engine.ground, this.zones[id]);
		var dirs = [[0,1], [0,-1], [-1,0], [1,0]];
		var _x, _y;

		while(stack.length > 0 && length < this.maxMazeLength){
			x = stack[stack.length-1][0];
			y = stack[stack.length-1][1];

			for(_x = -1; _x <= 1; _x++)
				for(_y = -1; _y <= 1; _y++)
					if(!Engine.isGo(this.edges,x,Y-1))
						Engine.addGo(new Engine.GO({x: x + _x, y: y + _y, frame: 1, zIndex: 2}), Engine.go, Engine.block, this.edges);

			for(var loop = 0; loop < this.maxLoop; loop++){
				var _dir = dirs[Utils.randomZ(0,3)];
				_x = stack[stack.length-1][0] + _dir[0];
				_y = stack[stack.length-1][1] + _dir[1];
				if(Engine.isGo(this.edges, _x, _y)){
					var __x, __y, free = true;
					for(__x = -1; __x <= 1; __x++)
				}
			}
			stack.splice(0,1);
		}
	},

	makeMazes: function(){
		for(x = Math.floor(-this.mapW / 2); x < Math.floor(this.mapW * 1.5); x++)
			for(y = Math.floor(-this.mapH / 2); y < Math.floor(this.mapH * 1.5); y++)
				if(!Engine.isGo(Engine.ground, x + _x, y + _y))
					this.makeMaze(x,y);
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
			var x, y;

			if(!this.isOverlap(X,Y,W,H)){
				var id = ++this.uniqueId;
				this.zones[id] = [];

				for(var x = X; x < W; x++)
					for(var y = Y; y < H; y++)
						Engine.addGo(new Engine.GO({x: x, y: y, id: id}), Engine.go, Engine.ground, this.zones[id]);

				for(x = X-1; x< W+1; x++){
					if(!Engine.isGo(this.edges,x,Y-1))
						Engine.addGo(new Engine.GO({x: x, y: Y-1, frame: 1, zIndex: 2}), Engine.go, Engine.block, this.edges);
					if(!Engine.isGo(this.edges,x,H))
						Engine.addGo(new Engine.GO({x: x, y: H, frame: 1, zIndex: 2}), Engine.go, Engine.block, this.edges);
				}

				for(y = Y-1; y < H+1; y++){
					if(!Engine.isGo(this.edges,X-1,y))
						Engine.addGo(new Engine.GO({x: X-1, y: y, frame: 1, zIndex: 2}), Engine.go, Engine.block, this.edges);
					if(!Engine.isGo(this.edges,W,y))
						Engine.addGo(new Engine.GO({x: W, y: y, frame: 1, zIndex: 2}), Engine.go, Engine.block, this.edges);	
				}

				this.rooms[this.rooms.length] = {X: X, Y: Y, W: W, H: H};
				break;
			}
		}
	},

	isFree: function(collection, x, y){
		return !Engine.isGo(Engine.block,x,y) && !Engine.isGo(collection,x,y);
	},

	spawnPlayer: function(){
		for(var loop = 0; loop = this.maxLoop; loop++){
			var ground = Engine.ground[Utils.randomZ(0,Engine.ground.length-1)];
			if(this.isFree(Engine.player, ground.x, ground.y)){
				if(!Engine.player){
					Engine.player = new Engine.GO({x: ground.x , y: ground.y});
					Engine.player.addComponent("player", new Engine.Player());
				}
				else {
					Engine.player.x = ground.x;
					Engine.player.y = ground.y;
				}
				Engine.addGo(Engine.player, Engine.go, Engine.block, Engine.players);
				break;
			}

		}
	},

};

