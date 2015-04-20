
var app = playground({
	smoothing: false,

	create: function(){
		this.loadAtlases("map", "characters", "ui");
		this.loadSounds("enemy1",
			"enemy2",
			"enemy3",
			"hurt1",
			"hurt2",
			"hurt3",
			"step1",
			"step2",
			"step3",
			"love1",
			"love2",
			"love3"
			);
	},

	ready: function(){
		this.setState(Engine.Map);
	},
});

