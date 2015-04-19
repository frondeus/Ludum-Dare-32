Engine.generateMap= function(){
	Engine.init();
	Engine.generator.makeRooms();
	Engine.generator.spawnEnemies();
	Engine.generator.spawnPlayer();

	Engine.sort();
};

Engine.generator = {
	mapW: 32,
	mapH: 32,
	enemyCount: 32,
	roomCount: 50,
	maxLoop: 10,

	uniqueId: 0,

	makeRooms: function(){
		this.rooms = [];
		for(var i = 0; i < this.roomCount; i++)
			this.makeRoom();

		this.makePassages();
		// this.makeWalls();
	},

	makeMaze: function(x, y){
		var mazeId = this.uniqueId++;
		var maze = [];

		Engine.addGo(new Engine.GO({x: x, y:y, id: mazeId}), Engine.go, Engine.ground);
		maze[maze.length] = [x,y];

		var dirs = [[0,1],[1,0],[-1,0],[0,-1]];

		while(maze.length > 0){
			for(var i = 0; i < 5; i++){
				var _dir = dirs[Utils.randomZ(0,3)];
				var _x = maze[maze.length-1][0] + _dir[0];
				var _y = maze[maze.length-1][1] + _dir[1];
				
			}
		}
	},

	makePassages: function(){
		for(var x= -this.mapW/2 ; x < this.mapW*1.5; x++)
			for(var y = -this.mapH/2; y < this.mapH*1.5; y++)
				if(!Engine.isGo(Engine.ground,x,y) &&
					!Engine.isGo(Engine.ground,x+1,y) &&
					!Engine.isGo(Engine.ground,x-1,y) &&
					!Engine.isGo(Engine.ground,x,y+1) &&
					!Engine.isGo(Engine.ground,x+1,y+1) &&
					!Engine.isGo(Engine.ground,x-1,y+1) &&
					!Engine.isGo(Engine.ground,x+1,y-1) &&
					!Engine.isGo(Engine.ground,x-1,y-1) &&
					!Engine.isGo(Engine.ground,x,y-1))
						this.makeMaze(x,y);

					// Engine.addGo(new Engine.GO({x: x, y: y, zIndex: 1, frame: 1}), Engine.go, Engine.block);
	},

	makeWalls: function(){
		for(var x= -this.mapW/2 ; x < this.mapW*1.5; x++)
			for(var y = -this.mapH/2; y < this.mapH*1.5; y++)
				if(!Engine.isGo(Engine.ground,x,y))
					Engine.addGo(new Engine.GO({x: x, y: y, zIndex: 1, frame: 1}), Engine.go, Engine.block);
	},

	makeRoom: function(){
		for(var loop = 0; loop < this.maxLoop; loop++){
			var X = Utils.randomZ(0,this.mapW-1);
			var Y = Utils.randomZ(0,this.mapH-1);
			var W = X + Utils.randomZ(2,this.mapW/2);
			var H = Y + Utils.randomZ(2,this.mapH/2);
			
			if(!this.isOverlap(X,Y,W,H)){
				var roomid = this.uniqueId++;
				for(var x = X; x < W; x++)
					for(var y = Y; y < H; y++)
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
				var x = Utils.randomZ(0,this.mapW-1);
				var y = Utils.randomZ(0,this.mapH-1);
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
			var x = Utils.randomZ(0,this.mapW-1);
			var y = Utils.randomZ(0,this.mapH-1);
			if(this.isFree(x,y))
			{
				Engine.player =new Engine.GO({x: x, y: y});
				Engine.addGo(Engine.player, Engine.go, Engine.block, Engine.players)
					.addComponent("player", new Engine.Player());
				break;
			}
		}
		
	},
};