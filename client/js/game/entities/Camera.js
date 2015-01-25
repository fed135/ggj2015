define("entities/Camera",
[
	"Arstider/DisplayObject",
	"Arstider/GameData",
	"Arstider/Events",
	"Arstider/Tween",
	"Arstider/Easings"
],
function(DisplayObject, GameData, Events, Tween, Easings){
	
	function Camera(props){
		Arstider.Super(this, DisplayObject, props);

		this.index = props.index;
		this.currentAltitude = 0;

		this.toCharTween = null

		this.travelSpeed = GameData.get("travelSpeed");
		this.tileSize = GameData.get("tileSize");

		this.lanes = [[], []];

		this.cameraPosY = 0.75;

		this.topSpawned = false;

		this.background = new DisplayObject({
			name:"backgroundP",
			data:"media/images/gameplay/parallax.png",
			xOffset:(this.index == 0)?0:840,
			largeData:true,
			width:840,
			dataWitdh:840
		});
		this.addChild(this.background);

		this.wrapper = new DisplayObject({
			width:527,
			x:(this.index == 0)?0:15
		});
		this.addChild(this.wrapper);

		this.skipTravel = false;
		this.maxLevel = GameData.get("maxLevel");

		this.backLayer = new DisplayObject();
		this.wrapper.addChild(this.backLayer);
		this.tileLayer = new DisplayObject();
		this.wrapper.addChild(this.tileLayer);
		this.decorationLayer = new DisplayObject();
		this.wrapper.addChild(this.decorationLayer);

		this.wrapper.dock((this.index == 0)?1:0, null);
	}

	Arstider.Inherit(Camera, DisplayObject);

	Camera.prototype.travel = function(targetY){

		if(this.skipTravel){
			this.skipTravel = false;
			return;
		}

		//console.log("take me to ", targetY);

		if(this.toCharTween != null) this.toCharTween.kill();

		targetY = Arstider.checkIn(targetY, ((this.height - this.target.height) *this.cameraPosY) - this.target.y);

		this.toCharTween = new Tween(this, {y : targetY}, this.travelSpeed, Easings.QUAD_IN_OUT).play();
	};

	Camera.prototype.addPlayer = function(player){
		this.target = player;
		player.level = this;
		this.decorationLayer.addChild(this.target);
		this.travel();

		var thisRef = this;

		Events.bind("turnEnd", this.travel.bind(this));
		Events.bind("turnStart", function(){
			if(thisRef.target.global.y > 1050*thisRef.cameraPosY){
				console.log("emergencyTravel");
				thisRef.skipTravel = false;
				thisRef.travel.call(thisRef);
			}
		});
	};

	Camera.prototype.pushBlock = function(tile, x, y, isBlocker){
		this.tileLayer.addChild(tile);
		if(tile.blocker) this.decorationLayer.addChild(tile.blocker);
		this.lanes[x].push(tile.type);
	};

	Camera.prototype.isBlocker = function(x, y){

		var isBlocker = (this.lanes[x] && this.lanes[x][y] == 1);
		//console.log(this.lanes);
		//console.log("tile ", x, ", ",y, " :", isBlocker);
		return isBlocker;
	};

	Camera.prototype.clearFrom = function(index){
		//TODO: Optimize ;)
	};

	Camera.prototype.checkNextBlocker = function(x, y, max){

		var
			i = y+1,
			dist=0,
			len = Math.min(this.lanes[x].length+1, i+max)
		;

		for(; i<len;i++){
			//console.log("checking ", x,",",i,"... is " , this.lanes[x][i]);
			//if(i > this.maxLevel) break;
			if(this.lanes[x][i] == 1){
				break;
			}
			dist++;
		}

		return dist;
	};

	Camera.prototype.checkPreviousBlocker = function(x, y){

		var
			i = y-1,
			dist=0
		;

		for(; i>=0; i--){
			//console.log("checking ", x,",",i,"... is " , this.lanes[x][i]);
			if(this.lanes[x][i] == 1){
				break;
			}
			dist++;
		}

		return dist;
	};

	Camera.prototype.update = function(){
		this.x = this.width*this.index;
		this.background.y = (-this.y);
		if(!this.target) return;

		//console.log("player pos:",this.target.y);
		this.background.y = (-this.y) - (1680 - 1050) + ((1680 - 1050)*(-this.target.y / (this.maxLevel*this.tileSize)));
	}

	return Camera;
});