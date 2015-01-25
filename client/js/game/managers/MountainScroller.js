define("managers/MountainScroller", 
[
	"Arstider/GameData",
	"Arstider/DisplayObject",

	"entities/Block"
],
function(GameData, DisplayObject, Block){

	MountainScroller.CLIMBABLE = 0;
	MountainScroller.BLOCKER = 1;
	MountainScroller.PICKUP = 2;
	MountainScroller.WATERFALL = 3;
	
	function MountainScroller(){

		this.blockerList = GameData.get("blockers");
		this.patternList = GameData.get("patterns");

		this.maxLevel = GameData.get("maxLevel");
		this.tileSize = GameData.get("tileSize");

		this.sideTreeOccurance = GameData.get("sideTreeOccurance");
	}

	MountainScroller.prototype.generateSection = function(views, pattern){

		//Choose a random section
		var 
			i = 0,
			u,
			tile,
			side,
			sideTree
		;

		for(;i<views.length;i++){
			if(!pattern){
				pattern = getRandomFrom(this.patternList);
			}

			//Build the pattern
			for(u = 0; u< pattern.length; u++){
				if(views[i].currentAltitude >= this.maxLevel -1){

					if(views[i].topSpawned) return;

					var top = new DisplayObject({
						name:"top",
						data:"media/images/gameplay/top.png",
						largeData:true,
						width:586,
						height:380,
						dataWidth:586,
						dataHeight:380,
						y:(-(this.maxLevel-0.5)*this.tileSize) + 10,
						xOffset:views[i].index*586
					});

					if(views[i].index == 0){
						top.x = -74;
					}
					else{
						top.x = -20;
					}

					views[i].topSpawned = true;

					views[i].pushBlock(top, 0, this.maxLevel, 3);

					top.setIndex(0);
					return;
				}
				else{
					for(tile=0; tile<pattern[u].length;tile++){
						this.buildTile(views[i], u , tile, pattern[u][tile]);
					}

					//Build side + posible decoration
					//console.log("adding side ", views[i].currentAltitude*this.tileSize);
					side = new DisplayObject({
						data:"media/images/gameplay/decoration/border_0"+(Math.ceil(Math.random()*8))+".png",
						x:(views[i].index == 0)?-53:512,
						y:-views[i].currentAltitude*this.tileSize,
						scaleX:(views[i].index == 0)?-1:1,
						rpX:(views[i].index == 0)?0.5:0,
					});

					var randTest = Math.ceil(Math.random()*this.sideTreeOccurance);
					if(randTest == 1){
						sideTree = new DisplayObject({
							data:"media/images/gameplay/decoration/side_tree_0"+(Math.ceil(Math.random()*6))+".png",
							x:(views[i].index == 0)?-280:512,
							y:-views[i].currentAltitude*this.tileSize,
							scaleX:(views[i].index == 0)?1:-1,
							rpX:(views[i].index == 0)?0:0.5,
						});

						views[i].decorationLayer.addChild(sideTree);
					}

					views[i].decorationLayer.addChild(side);

					views[i].currentAltitude++;

					views[i].clearFrom(views[i].currentAltitude - 20);
				}
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
			yPos:container.currentAltitude,
			blocker:(type == MountainScroller.BLOCKER)?getRandomFrom(this.blockerList):null
		});

		container.pushBlock(tile, x, y, (type == MountainScroller.BLOCKER));
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