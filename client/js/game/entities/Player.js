define("entities/Player", 
[
	"Arstider/DisplayObject",
	"Arstider/Shape",
	"Arstider/GameData",
	"Arstider/Events",

	"Arstider/TextField",

	"Arstider/Tween",
	"Arstider/Easings"
],
function(DisplayObject, Shape, GameData, Events, TextField, Tween, Easings){
	
	function Player(props){
		Arstider.Super(this, DisplayObject, props);

		this.width = 64;
		this.height = 64;
		this.index = props.index;

		var tileSize = GameData.get("tileSize");

		this.climbDist = GameData.get("climbTiles");
		this.climbSpeed = GameData.get("climbSpeed");
		this.throwSpeed = GameData.get("throwSpeed");
		this.preThrowDelay = GameData.get("preThrowDelay");
		this.numSpins = GameData.get("numSpins");
		this.moveDist = tileSize;

		this.debugShape = new Shape({
			width:this.width,
			height:this.width,
			fillStyle:"red",
			alpha:0.7
		});
		this.addChild(this.debugShape);

		this.numPickups = 0;

		this.lane = 0;

		this.altitude = 0;

		this.level;

		this.x += ((tileSize - this.width)*0.5);
		this.y += ((tileSize - this.height)*0.5);

		this.debugLocation = new TextField({
			width:this.width,
			height:this.width,
			text:" - "
		});

		this.debugLocation.setFont("scoreFont", {fillStyle:"white"});
		this.addChild(this.debugLocation);
	}

	Arstider.Inherit(Player, DisplayObject);

	Player.prototype.doAction = function(action){

		var move = GameData.get("actions")[action];
		var thisRef = this;
		this[move.name](function(){
			Events.broadcast("playerReady", thisRef.index);
		});

		this.debugLocation.setText(this.lane + ", "+this.altitude);
		//console.log(Arstider.findElement("tile_"+this.lane+"_"+this.altitude));
	};


	//////Actions

	Player.prototype.climb= function(callback){

		//Check if can go up by 

		//Max dist
		var numTiles = this.climbDist;
		var availTiles = this.level.checkNextBlocker(this.lane, this.altitude, numTiles);

		numTiles = Math.min(numTiles, availTiles);

		this.level.travel(this.level.y + (numTiles * this.moveDist));
		this.level.skipTravel = true;
		var sumTween = new Tween(this, {y:this.y - (numTiles * this.moveDist)}, this.climbSpeed, Easings.QUAD_IN_OUT).then(callback).play();
		this.altitude += numTiles;

		//Pickup check
		if(this.level.lanes[this.lane][this.altitude] == 2){
			this.getPickup(this.level.decorationLayer.getChildByName("tile_" +this.lanes+"_"+this.altitude));
		}
	};

	Player.prototype.victoryDance = function(callback){

		var thisRef = this;
		var playerPos = this.y;
		setTimeout(function(){
			thisRef.level.skipTravel = false;
			thisRef.level.travel(thisRef.level.y + 400);
			thisRef.level.skipTravel = true;
			var sumTween = new Tween(thisRef, {y:playerPos - 420}, thisRef.climbSpeed, Easings.QUAD_OUT).then({y:playerPos-380}, thisRef.climbSpeed, Easings.QUAD_IN).play();
		}, 125);
	};

	Player.prototype.getPickup = function(block){
		console.log(block);

		block.removeChildByName("pickup");
		this.numPickups++;
	};

	Player.prototype.move = function(callback){

		var isBlocked = this.level.isBlocker((this.lane == 0)?1:0, this.altitude+1);
		var direction;
		if(isBlocked) return;

		if(this.lane == 0){
			this.lane = 1;
			direction = this.x + this.moveDist;
		}
		else{
			this.lane = 0;
			direction = this.x - this.moveDist;
		}

		var sumTween = new Tween(this, {y:this.y - this.moveDist, x:direction}, this.climbSpeed, Easings.QUAD_IN_OUT).then(callback).play();
		this.level.travel(this.level.y + this.moveDist);
		this.level.skipTravel = true;
		this.altitude += 1;
	};

	Player.prototype.defence = function(callback){
		//Defence anim

		callback();
	};

	Player.prototype.attack = function(callback){

		//Attack anim
		if(this.numPickups > 0){
			this.numPickups--;

			var thisRef = this;
			var topLevel = this.level.parent;
			var direction = (this.index== 0)?1:-1;
			var rot = (direction * 360) * this.numSpins;
			var otherHero = topLevel.getChild("Camera" + ((this.level.index == 0)?1:0)).target;
			var pebbleWrapper = new DisplayObject({
				width:28,
				height:28,
				x:this.global.x,
				y:this.global.y,
				rpX:0.4,
				rpY:0.4
			});

			var pebble = new DisplayObject({
				data:"media/images/gameplay/blockers/blocker1.png",
				width:24,
				height:24,
				scaleX:direction
			});
			pebbleWrapper.addChild(pebble);

			topLevel.addChild(pebbleWrapper);
			setTimeout(function(){
				var pebbleTween = new Tween(pebbleWrapper, {x:otherHero.global.x, y:otherHero.global.y, rotation:rot}, thisRef.throwSpeed, Easings.CIRC_IN_OUT).then(function(){
					topLevel.removeChild(pebbleWrapper);
					callback();
				}).play()
			},this.preThrowDelay);
			
		}
	};

	Player.prototype.fall = function(callback){

		var fallDist = this.level.checkPreviousBlocker(this.lane, this.altitude);

		this.y += (fallDist*this.moveDist);
		this.altitude -= fallDist;

		callback();
	};

	Player.prototype.penalty = function(callback){

		//Penalty anim

		callback();
	};

	return Player;	
});