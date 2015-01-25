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
		this.y = -props.yPos * tileSize;
		this.loadBitmap("media/images/gameplay/tiles/tile"+((props.blocker)?"_blocked":"")+(Math.ceil(Math.random()*4))+".png");

		if(props.blocker){
			this.blocker = new DisplayObject({
				name:"blocker",
				data:"media/images/gameplay/blockers/"+props.blocker.url,
				x:this.x + props.blocker.xOffset,
				y:this.y + props.blocker.yOffset
			});
		}
	}

	Arstider.Inherit(Block, DisplayObject);

	return Block;
});