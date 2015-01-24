define("entities/Camera",
[
	"Arstider/DisplayObject"
],
function(DisplayObject){
	
	function Camera(props){
		Arstider.Super(this, DisplayObject, props);

		this.index = props.index;
	}

	Camera.prototype.update = function(dt){
		this.x = this.width*this.index;
	};

	Arstider.Inherit(Camera, DisplayObject);

	return Camera;
});