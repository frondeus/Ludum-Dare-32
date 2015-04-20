Engine.generateMap = function(){
	Engine.init();

	Engine.generator.mapW = Utils.randomZ(8,16);
	Engine.generator.mapH = Utils.randomZ(8,16);
	Engine.generator.roomSize = Utils.randomZ(8,16);
	Engine.generator.roomCount = Utils.randomZ(8,32);
	Engine.generator.maxMazeLength = Utils.randomZ(16,32);
	Engine.generator.maxDirCount = Utils.randomZ(0,5);
	Engine.generator.enemyCount = Utils.randomZ(8,32);
	Engine.generator.itemCount = Utils.randomZ(1,8);

	Engine.generator.makeRooms();

	Engine.generator.spawnEnemies();
	Engine.generator.spawnItems();
	Engine.generator.spawnPlayer();

	Engine.sort();
};

Engine.generator = {
	maxLoop: 16,
	uniqueId: 0,
	dirCount: 0,
	dirs: [[0,1], [0,-1], [-1,0], [1,0]],

	makeRooms: function(){
		this.edges = [];
		this.rooms = [];
		this.zones = [];

		for(var i = 0; i < this.roomCount; i++)
			this.makeRoom();

		this.makeMazes();
		this.makeDoors();
	},

	makeDoors: function(){
		var _x, _y;
		for(var i in this.edges){
			if(!this.edges[i]) continue;
			var first = null;
			for(var d in this.dirs){
				_x = this.dirs[d][0];
				_y = this.dirs[d][1];
				var tile = Engine.isGo(Engine.ground,this.edges[i].x + _x, this.edges[i].y + _y);
				if(!tile || !tile.id) continue;
				if(first && first.id != tile.id){
					
					var zone = this.zones[tile.id];
					// console.log(zone);
					// debugger;
					for(var t in zone)
						zone[t].id = first.id;

					this.edges[i].frame = 0;
					// this.edges[i].tileset = app.atlases.;

					Engine.addGo(this.edges[i], Engine.ground);
					Engine.removeGo(this.edges[i], this.edges, Engine.block);
			 		
				} 
				else first = tile;
			}
		}
	},

	makeEdge: function(x, y,id){
		if(!Engine.isGo(Engine.go, x, y))
			Engine.addGo(new Engine.GO({x: x, y: y, frame: 1,id: id /*tileset: app.atlases.ui*/}), Engine.go, Engine.block, this.edges);
	},

	getDir: function(){
		var dir = null;
		if(this.dirCount <= 0){
			dir = this.dirs[Utils.randomZ(0,this.dirs.length-1)];
			this.lastDir = dir;
			this.dirCount = this.maxDirCount;
		}
		this.dirCount--;

		if(!dir) dir = this.lastDir;

		return dir;
	},

	makeMaze: function(x, y){
		var id = ++this.uniqueId;
		var stack = [[x, y]];
		var length = 1;

		this.zones[id] = [];
		Engine.addGo(new Engine.GO({x: x, y: y, id: id}), Engine.go, Engine.ground, this.zones[id]);
		
		for(_x = -1; _x <= 1; _x++)
			for(_y = -1; _y <= 1; _y++)
				if(_x != 0 || _y != 0)
					this.makeEdge(x + _x, y + _y, id);

		var _x, _y;		 

		while(stack.length > 0 && length < this.maxMazeLength){
			for(var loop = 0; loop < this.maxLoop; loop++){
				var dir = this.getDir();
				var edge = Engine.isGo(this.edges, x + dir[0], y + dir[1]);
				if(edge && edge.id == id){
					edge.frame = 0;
					edge.tileset = app.atlases.map;

					Engine.removeGo(edge, this.edges, Engine.block);
					Engine.addGo(edge, Engine.ground, this.zones[id]);
			 		stack[stack.length] = [edge.x, edge.y];
			 		x = edge.x;
			 		y = edge.y;
					length ++;
					break;
				}
			}

			for(_x = -1; _x <= 1; _x++)
				for(_y = -1; _y <= 1; _y++)
					if(_x != 0 || _y != 0)
						this.makeEdge(x + _x, y + _y, id);

			stack.splice(0,1);
		}
		// console.log("-");
	},

	makeMazes: function(){
		var x, y;
		for(x = Math.floor(-this.mapW / 2); x < Math.floor(this.mapW * 1.5); x++)
			for(y = Math.floor(-this.mapH / 2); y < Math.floor(this.mapH * 1.5); y++)
				if(!Engine.isGo(Engine.go, x, y))
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
						this.makeEdge(x,Y-1);
					if(!Engine.isGo(this.edges,x,H))
						this.makeEdge(x,H);
				}

				for(y = Y-1; y < H+1; y++){
					if(!Engine.isGo(this.edges,X-1,y))
						this.makeEdge(X-1,y);
					if(!Engine.isGo(this.edges,W,y))
						this.makeEdge(W,y);
						
				}

				this.rooms[this.rooms.length] = {X: X, Y: Y, W: W, H: H};
				break;
			}
		}
	},

	isFree: function(collection, x, y){
		return !Engine.isGo(Engine.block,x,y) && !Engine.isGo(collection,x,y);
	},

	spawnEnemies: function(){
		for(var i  =0 ; i < this.enemyCount; i++)
		for(var loop = 0; loop = this.maxLoop; loop++){
			var ground = Engine.ground[Utils.randomZ(0,Engine.ground.length-1)];
			if(this.isFree(Engine.enemies, ground.x, ground.y)){
				Engine.addGo(new Engine.GO({x: ground.x, y: ground.y}),Engine.go, Engine.enemies, Engine.block)
						.addComponent("enemy", new Engine.Enemy());
				break;
			}

		}
	},

	spawnItems: function(){
		var key = null, door = null;
		for(var i  =0 ; i < this.itemCount; i++)
		for(var loop = 0; loop = this.maxLoop; loop++){
			var ground = Engine.ground[Utils.randomZ(0,Engine.ground.length-1)];
			if(this.isFree(Engine.enemies, ground.x, ground.y)){
				if(!key){
						key = Engine.addGo(new Engine.GO({x: ground.x, y: ground.y}),Engine.go, Engine.items)
						.addComponent("item", new Engine.Item());
						
						key.frame = 2;
					}
				else if(!door){
					door = Engine.addGo(new Engine.GO({x: ground.x, y: ground.y}),Engine.go, Engine.items)
					.addComponent("item", new Engine.Item());
					door.frame = 3;
				}
				else
					Engine.addGo(new Engine.GO({x: ground.x, y: ground.y}),Engine.go, Engine.items)
						.addComponent("item", new Engine.Item());
				break;
			}

		}
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

