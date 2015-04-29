/* global Engine */
Engine = {
	tileSize: 32,
	tileMargin: 0,
	camera: {
		x: 100,
		y: 100,
		scale: 1,
	},

	// go: [],

	init: function(){
		this.players = [];
		this.enemies = [];
		this.go = [];
		this.ground = [];
		this.block = [];
		this.allies = [];
		this.items = [];
	},

	addGo: function(){
		var go = arguments[0];
		for(var i = 1; i < arguments.length; i++){
			arguments[i][arguments[i].length] = go;
		}
		return go;
	},

	removeGo: function(){
		var go = arguments[0];
		for(var i = 1; i < arguments. length; i++){
			var index = arguments[i].indexOf(go);
			if(index > -1)
				arguments[i].splice(index,1);
		}
	},

	isGo: function(collection, x, y){
		for(var i in collection)
			if(x == collection[i].x && y == collection[i].y) return collection[i];
		return null;
	},

	isNear: function(A, B, radius){
		var dX = A.x - B.x;
		var dY = A.y - B.y;
		var l = (dX * dX) + (dY * dY);
		return l < (radius * radius);
	},

	turn: function(){
		for(var i in this.enemies)
			this.enemies[i].enemy.action();
		for(var i in this.allies)
			this.allies[i].ally.action();

		if(this.player.lifes <= 0){
			// console.log("Game Over!");
			app.setState(this.GameOver);
		}
	},

	sort: function() {
		this.go.sort(function(a, b) {
			if (a.zIndex === b.zIndex) {
				return (a.index > b.index) ? 1 : (a.index < b.index ? -1 : 0);
			}
			return (a.zIndex | 0) - (b.zIndex | 0);
		});
	},

	

};