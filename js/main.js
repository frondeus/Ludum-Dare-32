
var app = playground({
	smoothing: false,

	create: function(){
		this.loadAtlases("map", "characters", "ui");
	},

	ready: function(){
		this.setState(Engine.Map);
	},
});

