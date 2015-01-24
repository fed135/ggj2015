define("entities/Block",
[
	"Arstider/DisplayObject",

	"Arstider/GameData"
],
function(DisplayObject, GameData){

	function Block(props){
		Arstider.Super(this, DisplayObject, props);
		this.type = props.type;
		this.name = "tile_" +props.xPos+"_"+props.yPos;
		this.loadBitmap(props.texture.url);

		if(props.blocker){
			this.addChild(new DisplayObject({
				name:"blocker",
				data:props.blocker.url,
				x:props.blocker.xOffset,
				y:props.blocker.yOffset
			}));
		}
	}

	Arstider.Inherit(Block, DisplayObject);

	return Block;
});