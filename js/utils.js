Utils = {
	extend: function(){
		for(var i in arguments)
			for(var j in arguments[i])
				arguments[0][j] = arguments[i][j];
	},

	randomR: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    randomZ: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};