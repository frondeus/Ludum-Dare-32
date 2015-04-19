Engine.generateMap= function(){
	Engine.init();

	Engine.generator.mapW = Utils.randomZ(8,16);
	Engine.generator.mapH = Utils.randomZ(8,16);
	Engine.generator.enemyCount = Utils.randomZ(8,32);
	Engine.generator.roomCount = Utils.randomZ(8,32);
	Engine.generator.maxMaze = Utils.randomZ(2,12);

	Engine.generator.makeRooms();
	Engine.generator.spawnEnemies();
	Engine.generator.spawnPlayer();

	Engine.sort();
};

Engine.generator = {
	mapW: 16,
	mapH: 16,
	enemyCount: 32,
	roomCount: 32,
	maxLoop: 10,
	maxMaze: 8,

	uniqueId: 0,

	makeRooms: function(){
		this.rooms = [];
		this.zones = [];

		for(var i = 0; i < this.roomCount; i++)
			this.makeRoom();

		this.makePassages();
	},

	makeMaze: function(x, y){
		var mazeId = this.uniqueId++;
		var maze = [];
		var mazeLength = 1;
		this.zones[mazeId] = [];
		this.zones[mazeId][0] = Engine.addGo(new Engine.GO({x: x, y:y, id: mazeId}), Engine.go, Engine.ground);


		maze[maze.length] = [x,y];

		var dirs = [[0,1],[1,0],[-1,0],[0,-1]];

		while(maze.length > 0 && mazeLength < this.maxMaze ){
			for(var i = 0; i < 5; i++){
				var _dir = dirs[Utils.randomZ(0,3)];
				var _x = maze[maze.length-1][0] + _dir[0];
				var _y = maze[maze.length-1][1] + _dir[1];
				if(!Engine.isGo(Engine.ground, _x , _y )){
					var __x, __y;
					var free = true;
					for(__x = -1; __x <= 1; __x ++)
						for(__y = -1; __y <= 1; __y++)
							if(Engine.isGo(Engine.ground, _x + _dir[0] + __x, _y + _dir[1] + __y)) free = false;
					if(free){

						this.zones[mazeId][this.zones[mazeId].length] = 
						Engine.addGo(new Engine.GO({x: _x, y:_y, id: mazeId}), Engine.go, Engine.ground);

						this.zones[mazeId][this.zones[mazeId].length] = 
						Engine.addGo(new Engine.GO({x: _x + _dir[0], y:_y + _dir[1], id: mazeId}), Engine.go, Engine.ground);

						maze[maze.length] = [_x + _dir[0], _y + _dir[1]];
						mazeLength++;
						break;
					}
				}
			}
			maze.splice(0,1);
					
		}
	},

	makePassages: function(){
		var x,y, _x, _y;

		for(x= -this.mapW/2 ; x < this.mapW*1.5; x++)
			for(y = -this.mapH/2; y < this.mapH*1.5; y++){
				var free = true;
				for(_x = -1; _x <= 1; _x++)
					for(_y = -1; _y <= 1; _y++)
						if(Engine.isGo(Engine.ground, x + _x, y + _y)) free = false;
				if(free)
					this.makeMaze(x,y);
			}
		
		for(x = -this.mapW; x < this.mapW * 2; x++)
			for(y = -this.mapH; y < this.mapH * 2; y++)
			{
				var XY = Engine.isGo(Engine.ground,x,y);
				if(!XY){ // wall
					var first = null;
					var second = null;
					for(_x = -1; _x <= 1; _x++)
						for(_y = -1; _y <= 1; _y++){
							var tile = Engine.isGo(Engine.ground,x + _x,y + _y);
							if(!tile || tile.id == null) continue;

							if(first && first.id != tile.id)
							{
								second = tile;
								var zone = this.zones[tile.id];
								for(var t in zone)
									zone[t].id = first.id;
								
								if(!Engine.isGo(Engine.ground, x, y))
									Engine.addGo(new Engine.GO({x: x, y: y}), Engine.go, Engine.ground);
								
							}
							else 
								first = tile;
						}
					if(first && !second)
						Engine.addGo(new Engine.GO({x: x, y: y , frame: 1, zIndex: 2}), Engine.go, Engine.block);
				}
			}
	},

	makeRoom: function(){
		for(var loop = 0; loop < this.maxLoop; loop++){
			var X = Utils.randomZ(0,this.mapW-1);
			var Y = Utils.randomZ(0,this.mapH-1);
			var W = X + Utils.randomZ(2,this.mapW/2);
			var H = Y + Utils.randomZ(2,this.mapH/2);
			
			if(!this.isOverlap(X,Y,W,H)){
				var roomid = this.uniqueId++;
				this.zones[roomid] = [];
				
				for(var x = X; x < W; x++)
					for(var y = Y; y < H; y++)
						this.zones[roomid][this.zones[roomid].length] = 
							Engine.addGo(new Engine.GO({x: x, y:y, id: roomid}), Engine.go, Engine.ground);
				this.rooms[this.rooms.length]= {X: X,Y: Y,W: W,H: H};
				break;
			}
		}
		
	},

	isOverlap: function(X,Y,W,H){
		for(var i in this.rooms){
			if(!(W < this.rooms[i].X || X > this.rooms[i].W ||
				H < this.rooms[i].Y || Y > this.rooms[i].H))
				return true;
		}
		return false;
	},

	isFree: function(x,y){
		return Engine.isGo(Engine.ground,x,y) && Engine.isGo(Engine.block,x,y) == null;
	},

	spawnEnemies: function(){
		for(var i = 0; i < this.enemyCount; i++){
			for(var loop = 0; loop < this.maxLoop; loop++) {
				var x = Utils.randomZ(-this.mapW/2,this.mapW*1.5);
				var y = Utils.randomZ(-this.mapW/2,this.mapH*1.5);
				if(this.isFree(x,y))
				{
					Engine.addGo(new Engine.GO({x: x, y: y}),Engine.go, Engine.enemies, Engine.block)
						.addComponent("enemy", new Engine.Enemy());
					break;
				}
			}
		}
	},

	spawnPlayer: function(){
		for(var loop = 0; loop < this.maxLoop; loop++) {
			var x = Utils.randomZ(-this.mapW/2,this.mapW*1.5);
			var y = Utils.randomZ(-this.mapW/2,this.mapH*1.5);
			if(this.isFree(x,y))
			{
				Engine.player =new Engine.GO({x: x, y: y});
				Engine.addGo(Engine.player, Engine.go, Engine.block, Engine.players)
					.addComponent("player", new Engine.Player());

				// for(var _x = -1; _x <= 1; _x++)
				// 	for(var _y = -1; _y <= 1; _y++)
				// 	{
				// 		Engine.addGo(new Engine.GO({x: x + _x, y: y + _y, zIndex: 1, tileset: app.atlases.ui}), Engine.go);
				// 	}

				break;
			}
		}
		
	},
};