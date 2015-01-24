define("managers/MountainScroller", 
[
	"Arstider/GameData",

	"entities/Block"
],
function(GameData, Block){

	MountainScroller.CLIMBABLE = 0;
	MountainScroller.BLOCKER = 1;
	MountainScroller.PICKUP = 2;
	MountainScroller.WATERFALL = 3;
	
	function MountainScroller(){

		this.textureList = GameData.get("tiles");
		this.blockerList = GameData.get("blockers");
		this.patternList = GameData.get("patterns");
	}

	MountainScroller.prototype.generateSection = function(views, pattern){

		//Choose a random section
		var 
			i = 0,
			u,
			tile
		;

		console.log("generating sections with pattern ", pattern);

		for(;i<views.length;i++){
			if(!pattern){
				pattern = getRandomFrom(this.patternList);
			}

			//Build the pattern
			for(u = 0; u< pattern.length; u++){
				for(tile=0; tile<pattern[u].length;tile++){
					this.buildTile(views[i], u , tile, pattern[u][tile]);
				}
				views[i].currentAltitude++;
			}
		}
	};



	MountainScroller.prototype.buildTile = function(container, y, x, type){

		var
			tile
		;

		tile = new Block({
			type:type,
			xPos:x,
			yPos:container.currentAltitude + y,
			texture:getRandomFrom(this.textureList),
			blocker:(type == MountainScroller.BLOCKER)?getRandomFrom(this.blockerList):null
		});

		container.pushBlock(x, y, (type == MountainScroller.BLOCKER));

		container.addChild(tile);
	};


	function getRandomFrom(list){

		var 
			rand = Math.floor(Math.random()*list.length)
		;

		if(list[rand]) return list[rand];

		console.error("Out of range ",rand, " from ", list );
	}

	return new MountainScroller();
});