define("entities/Block",
[
	"Arstider/DisplayObject",

	"Arstider/GameData"
],
function(DisplayObject, GameData){

	function Block(props){
		Arstider.Super(this, DisplayObject, props);

		var tileSize = GameData.get("tileSize");

		this.type = props.type;
		this.name = "tile_" +props.xPos+"_"+props.yPos;
		this.width = this.dataWidth = tileSize;
		this.height = this.dataHeight = tileSize;
		this.x = props.xPos * tileSize;
		this.y = props.yPos * tileSize;
		this.loadBitmap("media/images/gameplay/tiles/"+props.texture.url);

		if(props.blocker){
			this.addChild(new DisplayObject({
				name:"blocker",
				data:"media/images/gameplay/blockers/"+props.blocker.url,
				x:props.blocker.xOffset,
				y:props.blocker.yOffset
			}));
		}
	}

	Arstider.Inherit(Block, DisplayObject);

	return Block;
});