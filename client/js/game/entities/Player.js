define("entities/Player", 
[
	"Arstider/DisplayObject",
	"Arstider/Shape",
	"Arstider/GameData"
],
function(DisplayObject, Shape, GameData){
	
	function Player(props){
		Arstider.Super(this, DisplayObject, props);

		this.width = 64;
		this.height = 64;

		var tileSize = GameData.get("tileSize");

		this.climbDist = GameData.get("climbTiles");
		this.moveDist = tileSize;

		this.debugShape = new Shape({
			width:64,
			height:64,
			fillStyle:"red",
			alpha:0.7
		});
		this.addChild(this.debugShape);

		this.numPickups = 0;

		this.lane = 0;

		this.altitude = 0;
	}

	Arstider.Inherit(Player, DisplayObject);

	Player.prototype.doAction = function(action){

		var move = GameData.get("actions")[action];
		this[move.name](move.message);
	};


	//////Actions

	Player.prototype.climb= function(msg){
		console.log(this.name + " " + msg);

		//Check if can go up by 

		//Max dist
		var numTiles = this.climbDist;

		console.log("trying to climb ", numTiles, " tiles in lane ", this.lane, " at altitude ", this.altitude );


		var availTiles = this.parent.checkNextBlocker(this.lane, this.altitude, numTiles);

		console.log(availTiles, " available tiles");

		numTiles = Math.min(numTiles, availTiles);

		this.y -= (numTiles * this.moveDist);
		this.altitude += numTiles;
	};

	Player.prototype.move = function(msg){
		console.log(this.name + " " + msg);

		var canGo = this.parent.isBlocker((this.lane == 0)?1:0, this.altitude+1);
		if(!canGo) return;

		if(this.lane == 0){
			this.lane = 1;
			this.x += this.moveDist;
		}
		else{
			this.lane = 0;
			this.x -= this.moveDist;
		}

		this.y -= this.moveDist;
		this.altitude += 1;
	};

	Player.prototype.defence = function(msg){
		console.log(this.name + " " + msg);
		//Defence anim
	};

	Player.prototype.attack = function(msg){
		console.log(this.name + " " + msg);
		//Attack anim
		if(this.numPickups > 0){
			console.log("throwing pebble");
			this.numPickups--;
		}
	};

	Player.prototype.fall = function(msg){
		console.log(this.name + " " + msg);
		var fallDist = this.parent.checkPreviousBlocker(this.altitude, this.lane);

		this.y += (fallDist*this.moveDist);
		this.altitude -= fallDist;
	};

	Player.prototype.penalty = function(msg){
		console.log(this.name + " " + msg);
		//Penalty anim
	};

	return Player;	
});