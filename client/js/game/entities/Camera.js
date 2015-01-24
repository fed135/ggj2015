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

		this.update = function(dt){
			this.x = this.width*this.index;
		};

		this.toCharTween = null

		this.travelSpeed = GameData.get("travelSpeed");

		this.lanes = [[], []];

		this.wrapper = new DisplayObject({
			width:512
		});
		this.addChild(this.wrapper);

		this.backLayer = new DisplayObject();
		this.wrapper.addChild(this.backLayer);
		this.tileLayer = new DisplayObject();
		this.wrapper.addChild(this.tileLayer);
		this.decorationLayer = new DisplayObject();
		this.wrapper.addChild(this.decorationLayer);

		this.wrapper.dock((this.index == 0)?1:0, null);
	}

	Arstider.Inherit(Camera, DisplayObject);

	Camera.prototype.travel = function(){

		if(this.toCharTween != null) this.toCharTween.kill();

		var targetY = ((this.height - this.target.height) *0.5) - this.target.y;

		this.toCharTween = new Tween(this, {y : targetY}, this.travelSpeed, Easings.QUAD_IN_OUT).play();
	};

	Camera.prototype.addPlayer = function(player){
		this.target = player;
		player.level = this;
		this.decorationLayer.addChild(this.target);
		this.travel();

		Events.bind("turnEnd", this.travel.bind(this));
	};

	Camera.prototype.pushBlock = function(tile, x, y, isBlocker){
		this.tileLayer.addChild(tile);
		if(tile.blocker) this.decorationLayer.addChild(tile.blocker);
		this.lanes[x].length = y;
		if(isBlocker) this.lanes[x][y] = 1;
	};

	Camera.prototype.isBlocker = function(x, y){
		return (this.lanes[x] && this.lanes[x].length >= y && this.lanes[x][y] == 1);
	};

	Camera.prototype.checkNextBlocker = function(x, y, max){

		var
			i = y,
			len = Math.min(this.lanes[x].length, y+max)
		;

		for(; i<len;i++){
			if(this.lanes[x][y] == 1 || (i-y > max)){
				break;
			}
		}

		return i - y;
	};

	Camera.prototype.checkPreviousBlocker = function(x, y){
		for(var i = y; i>=0; i--){
			if(this.lanes[x][y] == 1){
				break;
			}
		}

		return y - i;
	};

	return Camera;
});