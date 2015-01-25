// Title Screen
define("screens/title",
[
	// List sdk required module here...
	"Arstider/Events",
	"Arstider/Background",
	"Arstider/DisplayObject",
	"Arstider/Shape",
	"Arstider/Dictionary",
	"Arstider/Tween",
	"Arstider/Easings",
	"Arstider/GameData",
	"Arstider/Sound",
	// List sdk custom entities here...
	"entities/LargeButton",
	"screens/chooseOptions"
],
function(Events, Background, DisplayObject, Shape, Dictionary, Tween, Easings, GameData, Sound, LargeButton, chooseOptions)
{	
	/**
    * Returns an object to be mixed-in to a screen class object. Methods are rescoped so that the 'this' keyword refers to the screen. 
    */
	return {

		// You can define screen properties, in this case, is an overlay is visible
		isOverlay: false,

		init:function()
		{
			
			Tween.AUTO_KILL = true;

			// Set screen background
			Background.loadBitmap("media/images/screens/title/bg.jpg");

			// Screen assets

			this.logo3 = new DisplayObject({
				name: "logo3",
				data: "media/images/screens/title/title.png",
				x: 117,
				y: 250,
				rpX:0.5,
				rpY:0.5,
				alpha:0.50
			});
			this.addChild(this.logo3);

			this.logo2 = new DisplayObject({
				name: "logo2",
				data: "media/images/screens/title/title.png",
				x: 117,
				y: 250,
				rpX:0.5,
				rpY:0.5,
				alpha:0.80
			});
			this.addChild(this.logo2);

			this.logo = new DisplayObject({
				name: "logo",
				data: "media/images/screens/title/title.png",
				x: 117,
				y: 250,
				rpX:0.5,
				rpY:0.5
			});
			this.addChild(this.logo);

			this.btnPlay2 = new DisplayObject({
				name: "btnPlay2",
				data:"media/images/screens/title/btnPlay.png",
				x: 0,
				y: 500
			});
			this.addChild(this.btnPlay2);
			this.btnPlay2.dock(0.5,null);

			this.btnPlay = new DisplayObject({
				name: "btnPlay",
				data:"media/images/screens/title/btnPlay.png",
				x: 758,
				y: 500,
				onclick:this.play.bind(this),
			    onpress:function(){this.loadBitmap("media/images/screens/title/btnPlayPress.png")},
				onrelease:function(){this.loadBitmap("media/images/screens/title/btnPlay.png")},
				onleave:function(){this.loadBitmap("media/images/screens/title/btnPlay.png")}
			});
			this.addChild(this.btnPlay);

			this.btnControls2 = new DisplayObject({
				name: "btnControls2",
				data:"media/images/screens/title/btnControls.png",
				x: 0,
				y: 575
			});
			this.addChild(this.btnControls2);
			this.btnControls2.dock(0.5,null);

			this.btnControls = new DisplayObject({
				name: "btnControls",
				data:"media/images/screens/title/btnControls.png",
				x: 711,
				y: 575,
				onclick:function(){},
			    onpress:function(){this.loadBitmap("media/images/screens/title/btnControlsPress.png")},
				onrelease:function(){this.loadBitmap("media/images/screens/title/btnControls.png")},
				onleave:function(){this.loadBitmap("media/images/screens/title/btnControls.png")}
			});
			this.addChild(this.btnControls);

			this.btnCredits2 = new DisplayObject({
				name: "btnCredits2",
				data:"media/images/screens/title/btnCredits.png",
				x: 0,
				y: 650
			});
			this.addChild(this.btnCredits2);
			this.btnCredits2.dock(0.5,null);

			this.btnCredits = new DisplayObject({
				name: "btnCredits",
				data:"media/images/screens/title/btnCredits.png",
				x: 730,
				y: 650,
				onclick:function(){},
			    onpress:function(){this.loadBitmap("media/images/screens/title/btnCreditsPress.png")},
				onrelease:function(){this.loadBitmap("media/images/screens/title/btnCredits.png")},
				onleave:function(){this.loadBitmap("media/images/screens/title/btnCredits.png")}
			});
			this.addChild(this.btnCredits);
				
			/*this.btnContinue = new LargeButton({
				name: "btnContinue",
				string: "CONTINUE",
				font: "btnLargeFont",
				scope: this,
				x: 240,
				y: 672,
				alpha: 0,
				callback: this.play
			});
			this.addChild(this.btnContinue);
			this.btnContinue.dock(0.7, null);


			this.btnNewGame = new LargeButton({
				name: "btnNewGame",
				string: "NEW_GAME",
				font: "btnLargeFont",
				scope: this,
				x: 240,
				y: 672,
				alpha: 0,
				callback: this.showOverlay
			});
			this.addChild(this.btnNewGame);
			this.btnNewGame.dock(0.3, null);*/


			// Overlay assets

			/*this.overlay = new Overlay({
				name: "overlay",
				x: 0,
				y: -672,
				scope: this,
				text: {
					font: "overlayFont",
					value: "CONFIRM_ERASE"
				},
				confirm: {
					font: "btnSmallFont",
					label: "YES",
					callback: this.reset
				},
				cancel: {
					font: "btnSmallFont",
					label: "NO",
					callback: this.hideOverlay
				}
			});
			this.addChild(this.overlay);*/

			this.optOverlay = new chooseOptions({
				width:1680,
				height:1050
			});
			this.optOverlay.alpha = 0;
			this.addChild(this.optOverlay);
		},
		
		// Called at the end of the preloading
		onload:function()
		{				
			Sound.play("menu");

			this.logoAnimControl();

			this.buttonAnimControl();
				//this.setDefaultLocalStorage();
		},

		logoAnimControl:function(){
			var thisRef = this;
			this.logoAnimation(this.logo);
			setTimeout(function(){
				thisRef.logoAnimation(thisRef.logo2);
			},300);	

			setTimeout(function(){
				thisRef.logoAnimation(thisRef.logo3);
			},600);
		},

		logoAnimation:function(theThing)
		{
			var thisRef = this;
			if(theThing.tween)theThing.tween.kill();
			theThing.tween = new Tween(theThing, {x:175,y:260, rotation:-5},3500 , Easings.QUAD_IN_OUT)
			.then({x:125,y:265,rotation:2},3000, Easings.QUAD_IN_OUT)
			.then({x:80,y:230, rotation:-3},3000, Easings.QUAD_IN_OUT)
			.then({x:145,y:210,rotation:3},3000, Easings.QUAD_IN_OUT)
			.then(function(){
				this.kill();
				thisRef.logoAnimControl.call(thisRef);
			})
			.play();
		},

		buttonAnimControl:function(){
			var thisRef = this;
			this.buttonAnimation(this.btnPlay);
			this.buttonAnimation(this.btnControls);
			this.buttonAnimation(this.btnCredits);
		},

		buttonAnimation:function(theThing)
		{
			var thisRef = this;
			if(theThing.tween)theThing.tween.kill();
			theThing.tween = new Tween(theThing, {x:theThing.x-5,y:theThing.y+10},3000 , Easings.QUAD_IN_OUT)
			.then({x:theThing.x+3,},3000, Easings.QUAD_IN_OUT)
			.then({x:theThing.x,y:theThing.y},3000, Easings.QUAD_IN_OUT)
			.then(function(){
				this.kill();
				thisRef.buttonAnimControl.call(thisRef);
			})
			.play();
		},
		
		play:function()
		{
			if(this.isOverlay) return;
						
			Events.broadcast("Engine.gotoScreen", "screens/gameplay");
		},

		showOptions:function()
		{
			if(this.isOverlay) return;
			this.isOverlay = true;
			this.optOverlay.alpha = 1;
		},

		/*showOverlay:function()
		{
			var thisRef = this;
			if(this.isOverlay) return;
			console.log(this.overlay, thisRef.overlay);
			this.overlayTween = new Tween(this.overlay, { y: 0 }, 400, Easings.QUAD_IN).then(function(){ thisRef.isOverlay = true; }).play();
		},

		hideOverlay:function()
		{
			var thisRef = this;

			this.overlayTween = new Tween(this.overlay, { y: 672 }, 400, Easings.QUAD_OUT).then(function(){ thisRef.overlay.y = -672; thisRef.isOverlay = false; }).play();
		},*/

		reset:function()
		{
			this.setDefaultLocalStorage();

			GameData.set("firstTime", "false", true);
			
			Events.broadcast("Engine.gotoScreen", "screens/story");

			this.hideOverlay();
		},
		
		setDefaultLocalStorage:function()
		{
			GameData.set("firstTime", "true", true);
			GameData.set("muted", "false", true);
		}
		
	};
}
);