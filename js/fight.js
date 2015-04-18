Engine.Fight = function(){

	this.timeout = 10.0;
	this.delay = 1.0;

	this.reqs = [];
	this.passphrase = "";
};

Engine.Requirements = {

	length: function(){
		this.minimum = Utils.randomZ(3, 12);
		this.maximum = this.minimum + Utils.randomZ(1,12);
		this.text = "Length: [" + this.minimum + " , " + this.maximum + "]";
		this.validate = function(string){
			return string.length >= this.minimum && string.length <= this.maximum;
		};
	},

	atLeastSpecial: function(){
		this.number = Utils.randomZ(1,5);
		this.text = "At least " + this.number + " '" + this.char + "'";
		this.validate = function(string){
			return Engine.Requirements.occurrences(string,this.char) >= this.number;
		};
	},

};


Engine.Fight.prototype = {

	addReq: function(req){
		
		this.reqs[this.reqs.length] = req;
	},

	create: function() {
		this.addReq(new Engine.Requirements.length());
		this.addReq(new Engine.Requirements.atLeastSpecial());


		

	},

	enter: function() {
		this.input = document.getElementById("input");
		this.input.className = "";
	},

	leave: function() {
		this.input.className = "hidden";
	},

	checkValid: function(){
		for(var i in this.reqs)
			if(this.reqs[i].validate(this.passphrase) === false) return false;
		return true;
	},

	step: function(dt) {
		if((this.timeout -= dt) <= 0){
			console.log("Timeout!");
			if((this.delay -= dt) <= 0){
				Engine.player.lifes--;
				app.setState(Engine.Map);
			}
		}
		else if(this.checkValid()){
			console.log("Winner!");
			if((this.delay -= dt) <= 0)
				app.setState(Engine.Map);
		}
		else this.passphrase = this.input.value;
	},

	render: function(dt) {
		app.layer.clear("#422");

		app.layer.font("16px Arial");
		for(var i in this.reqs){
			app.layer.fillStyle(this.reqs[i].validate(this.passphrase)?"#afa":"#faa");

			app.layer.fillText(this.reqs[i].text, 200, 200 + 38 * i);
		}
	},

};