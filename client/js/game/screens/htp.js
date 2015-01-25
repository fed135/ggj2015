define("screens/htp",
[
	"Arstider/Events",
	"Arstider/Background",
	"Arstider/DisplayObject",
	"Arstider/TextField",
	"Arstider/Dictionary",
	"Arstider/Tween",
	"Arstider/Easings",
	"Arstider/Browser",
	"Arstider/GameData",
	"Arstider/Viewport"
],
function(Events, Background, DisplayObject, TextField, Dictionary, Tween, Easings, Browser, GameData, Viewport){

	return {
		
		currentPage: 1,
		totalPage: 2,
		
		init:function(){
			
			var preloader = new DisplayObject();
			preloader.loadBitmap("media/images/screens/htp/page1.jpg");
			preloader.loadBitmap("media/images/screens/htp/page2.jpg");

			this.bg = new DisplayObject({
				name: "bg",
				data:"media/images/screens/story/page1.jpg"
			});
			this.addChild(this.bg);

			/*this.textContainer = new DisplayObject({
				width:400,
				height:300,
				x:270,
				y:810
			});
			this.addChild(this.textContainer);
			
			this.dockingScreen = new DisplayObject();
			this.addChild(this.dockingScreen);
			
			//Left hud to adjust with screen width
			this.hudLeft = new DisplayObject();
			this.hudLeft.dock(20 / 940, null);
			this.dockingScreen.addChild(this.hudLeft);
			
			//Right hud to adjust with screen width
			this.hudRight = new DisplayObject();
			this.hudRight.dock(920 / 940, null);
			this.dockingScreen.addChild(this.hudRight);
	
			this.text = new TextField({
				name: "text",
				width: 380,
				height:200,
                font:"htpTextFont",
                textWrap:true,
                text:"..."
			});
			this.textContainer.addChild(this.text);
			this.text.dock(0.5, 0.5);

			this.btnPrev = new DisplayObject({
				name: "btnPrev",
				data:"media/images/buttons/btnPrev.png",
				x: 0,
				y: 932,
				onclick:(GameData.get("leftToRight"))?this.prevPage.bind(this):this.nextPage.bind(this),
			    onpress:function(){this.loadBitmap("media/images/buttons/btnPrevPress.png");},
				onrelease:function(){this.loadBitmap("media/images/buttons/btnPrev.png");},
				onleave:function(){this.loadBitmap("media/images/buttons/btnPrev.png");}
			});
			this.hudLeft.addChild(this.btnPrev);

			this.btnNext = new DisplayObject({
				name: "btnNext",
				data:"media/images/buttons/btnNext.png",
				x: -84,
				y: 932,
				onclick:(GameData.get("leftToRight"))?this.nextPage.bind(this):this.prevPage.bind(this),
			    onpress:function(){this.loadBitmap("media/images/buttons/btnNextPress.png");},
				onrelease:function(){this.loadBitmap("media/images/buttons/btnNext.png");},
				onleave:function(){this.loadBitmap("media/images/buttons/btnNext.png");}
			});
			this.hudRight.addChild(this.btnNext);

			this.btnQuit = new DisplayObject({
				name: "btnQuit",
				data:"media/images/buttons/btnQuit.png",
				x: -68,
				y: 769,
				scaleX:0.8,
				scaleY:0.8,
				onclick:this.skipStory.bind(this),
			    onpress:function(){this.loadBitmap("media/images/buttons/btnQuitPress.png");},
				onrelease:function(){this.loadBitmap("media/images/buttons/btnQuit.png");},
				onleave:function(){this.loadBitmap("media/images/buttons/btnQuit.png");}
			});
			this.hudRight.addChild(this.btnQuit);*/
		},

		onload:function(){
			this.updatePage();
		},

		updatePage:function(){
			//var page = this.currentPage;
			this.bg.loadBitmap("media/images/screens/htp/page"+this.currentPage+".jpg");
			//this.text.setText(Dictionary.translate("STORY_TEXT"+page));
		},
	
		update:function()
		{
			/*this.dockingScreen.width = Viewport.visibleWidth;
			this.dockingScreen.height = Viewport.visibleHeight;
			this.dockingScreen.x = (Viewport.maxWidth - Viewport.visibleWidth) >> 1;
			this.dockingScreen.y = (Viewport.maxHeight - Viewport.visibleHeight) >> 1;*/
		},
		
		prevPage:function(){
			if(this.currentPage == 1){
				Events.broadcast("Engine.gotoScreen", "screens/title");
			}
			else{
				this.currentPage--;
				this.updatePage();
			}
		},

		nextPage:function(){
			if(this.currentPage == this.totalPage){
				this.skipStory();
			}
			else{
				this.currentPage++;
				this.updatePage();
			}
		},

		skipStory:function(){
			//GameData.set("firstTimeStory", "false", true); 
			Events.broadcast("Engine.gotoScreen", "screens/gameplay");
		}
	};
});