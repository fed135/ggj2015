define("entities/Player", 
[
	"Arstider/DisplayObject",
	"Arstider/Shape",
	"Arstider/GameData",
	"Arstider/Events",

	"Arstider/TextField",

	"Arstider/Sound",
	"Arstider/Tween",
	"Arstider/Easings",
	"Arstider/BitmapAnimation"
],
function(DisplayObject, Shape, GameData, Events, TextField, Sound, Tween, Easings, Sprite){
	
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
		this.fallSpeed = GameData.get("fallSpeed");
		this.numSpins = GameData.get("numSpins");
		this.moveDist = tileSize;

		this.debugShape = new Shape({
			width:this.width,
			height:this.width,
			fillStyle:"red",
			alpha:0.7
		});
		//this.addChild(this.debugShape);

		this.sprite = new Sprite({
            x:-104,
            y:-82,
            spritesheet:"media/images/gameplay/spritesheets/p"+(parseInt(this.index)+1),
            speed:0.32
        });
        this.addChild(this.sprite);
        console.log(this.sprite);

        this.scaleX = (this.index == 0)?1:-1,
        this.rpX = 1;


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
		//this.addChild(this.debugLocation);
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

    Player.prototype.returnToIdle = function(){
        this.sprite.gotoAnim("idle");
    };

	//////Actions

	Player.prototype.climb= function(callback){

		//Check if can go up by 
		//Sound.play("climb"+Math.floor((Math.random() * 2) + 1));
		//Max dist
		var numTiles = this.climbDist;
		var availTiles = this.level.checkNextBlocker(this.lane, this.altitude, numTiles);

		this.sprite.gotoAnim("climb");
		numTiles = Math.min(numTiles, availTiles);

		if(numTiles == 0)Sound.play("wrong");

		this.level.travel(this.level.y + (numTiles * this.moveDist));
		this.level.skipTravel = true;
        var sumTween = new Tween(this, {y:this.y - (numTiles * this.moveDist)}, this.climbSpeed, Easings.QUAD_OUT).then(callback).then(this.returnToIdle.bind(this)).play();
		this.altitude += numTiles;

		//Pickup check
		if(this.level.lanes[this.lane][this.altitude] == 2){
			this.getPickup(this.level.tileLayer.getChild("tile_" +this.lane+"_"+this.altitude));
		}
	};

	Player.prototype.victoryDance = function(callback){

		var thisRef = this;
		var playerPos = this.y;
		var xTarget = (this.lane == 0)?128:-128;
		setTimeout(function(){
			thisRef.level.skipTravel = false;
			thisRef.level.travel(thisRef.level.y + 350);
			thisRef.level.skipTravel = true;
			var sumTween = new Tween(thisRef, {y:playerPos - 420, x:thisRef.x+xTarget}, thisRef.climbSpeed*0.8, Easings.QUAD_OUT).then({y:playerPos-280}, thisRef.climbSpeed*0.6, Easings.QUAD_IN).play();
		}, 125);
	};

	Player.prototype.getPickup = function(block){
		console.log(block);
		var thisRef = this;

		setTimeout(function(){
			block.removeChildByName("pickup");

			thisRef.numPickups++;
			if(thisRef.numPickups > 3) thisRef.numPickups = 3;
		}, 500);
	};

	Player.prototype.move = function(callback){

		var isBlocked = this.level.isBlocker((this.lane == 0)?1:0, this.altitude+1);
		var direction;
		if(isBlocked){
			Sound.play("wrong");
			return;
		} 

		this.sprite.gotoAnim("climb");

		var curveType = Easings.QUAD_IN;
		if(this.level.isBlocker(this.lane, this.altitude+1)){
			curveType = Easings.QUAD_OUT;
		}

		if(this.lane == 0){
			this.lane = 1;
			direction = this.x + this.moveDist;
		}
		else{
			this.lane = 0;
			direction = this.x - this.moveDist;
		}

		//Sound.play("climb"+Math.floor((Math.random() * 2) + 1));



		var sumTween = new Tween(this, {x:direction}, this.climbSpeed, Easings.QUAD_IN_OUT).then(callback).play();
        var sumTween2 = new Tween(this, {y:this.y - this.moveDist}, this.climbSpeed, curveType).then(callback).then(this.returnToIdle.bind(this)).play();
		this.level.travel(this.level.y + this.moveDist);
		this.level.skipTravel = true;
		this.altitude += 1;

		//Pickup check
		if(this.level.lanes[this.lane][this.altitude] == 2){
			this.getPickup(this.level.tileLayer.getChild("tile_" +this.lane+"_"+this.altitude));
		}
	};

	Player.prototype.defence = function(callback){
		//Defence anim

		//this.sprite.gotoAnim("defence");
		callback();

	};

	Player.prototype.attack = function(callback){

		//Attack anim
		if(this.numPickups > 0){
			this.numPickups--;

			this.sprite.gotoAnim("attack"+((this.index==0)?"R":"L"));

			var thisRef = this;
			var topLevel = this.level.parent;
			var direction = (this.index== 0)?1:-1;
			var rot = (direction * 360) * this.numSpins;
			var otherHero = topLevel.getChild("Camera" + ((this.level.index == 0)?1:0)).target;
			var pebbleWrapper = new DisplayObject({
				width:72,
				height:100,
				x:this.global.x,
				y:this.global.y,
				rpX:0.49,
				rpY:0.49
			});

			var pebble = new DisplayObject({
				data:"media/images/gameplay/pebble.png",
				scaleX:direction
			});
			pebbleWrapper.addChild(pebble);

			Sound.play("throw");

			topLevel.addChild(pebbleWrapper);
			setTimeout(function(){
				var pebbleTween = new Tween(pebbleWrapper, {x:otherHero.global.x, y:otherHero.global.y, rotation:rot}, thisRef.throwSpeed, Easings.CIRC_IN_OUT).then(function(){
					topLevel.removeChild(pebbleWrapper);
					callback();
				}).play()
			},this.preThrowDelay);
			
		}else{
			Sound.play("wrong");
			callback();
		}
	};

	Player.prototype.fall = function(callback){

		

		var fallDist = this.level.checkPreviousBlocker(this.lane, this.altitude);
		var thisRef = this;

		setTimeout(function(){
			Sound.play("player_hit"+Math.floor((Math.random() * 2) + 1));

			//thisRef.sprite.gotoAnim("fall");

			thisRef.level.travel(thisRef.level.y -  (fallDist * thisRef.moveDist));
			thisRef.level.skipTravel = true;
	        var sumTween = new Tween(thisRef, {y:thisRef.y + (fallDist * thisRef.moveDist)}, thisRef.fallSpeed*fallDist, Easings.QUAD_IN).then(callback).then(thisRef.returnToIdle.bind(thisRef)).play();
			
			thisRef.altitude -= fallDist;

		},thisRef.throwSpeed + this.preThrowDelay);
	};

	Player.prototype.penalty = function(callback){

		//Penalty anim

		callback();
	};
	var currentFrame = null;
	Player.prototype.update = function(){
		//console.log(this.sprite.frame.index);
		if(this.sprite.animation.name == "climb"){
			if(this.sprite.frame.index != currentFrame){
				currentFrame = this.sprite.frame.index;
				Sound.play("climb"+Math.floor((Math.random() * 2) + 1));
			}
		}
	};

	return Player;	
});