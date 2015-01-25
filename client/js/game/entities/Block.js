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
				x:this.x + (-24 + (Math.random()*24)),
				y:this.y + (-24 + (Math.random()*24))
			});
		}

		if(this.type == 2){
			this.pickup = new DisplayObject({
				name:"pickup",
				data:"media/images/gameplay/pickup.png",
				x:(256-76)*0.5,
				y:(256-125)*0.5
			});
			this.addChild(this.pickup);
		}
	}

	Arstider.Inherit(Block, DisplayObject);

	return Block;
});