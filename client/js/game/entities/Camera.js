define("entities/Camera",
[
	"Arstider/DisplayObject",
	"Arstider/GameData"
],
function(DisplayObject, GameData){
	
	function Camera(props){
		Arstider.Super(this, DisplayObject, props);

		this.index = props.index;
		this.currentAltitude = 0;

		this.update = function(dt){
			this.x = this.width*this.index;
		};

		this.travelSpeed = GameData.get("tileSize");
	}

	Camera.prototype.travel = function(num){
		this.y += (num * this.travelSpeed);
	}

	Arstider.Inherit(Camera, DisplayObject);

	return Camera;
});