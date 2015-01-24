define("entities/Player", 
[
	"Arstider/DisplayObject",
	"Arstider/Shape"
],
function(DisplayObject, Shape){
	
	function Player(props){
		Arstider.Super(this, DisplayObject, props);

		this.debugShape = new Shape({
			width:64,
			height:64,
			fillStyle:"red",
			alpha:0.7
		});
		this.addChild(this.debugShape);
	}

	Arstider.Inherit(Player, DisplayObject);

	return Player;	
});