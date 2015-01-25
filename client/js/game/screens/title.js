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

			/*this.property = new DisplayObject({
				name: "property",
				data: "media/locale/property.png",
				x: 212,
				y: 75
			});
			this.addChild(this.property);
			this.property.dock(0.5, null);

			this.logo = new DisplayObject({
				name: "logo",
				data: "media/locale/logo.png",
				x: 142,
				y: 250
			});
			this.addChild(this.logo);
			this.logo.dock(0.5, null);*/

			this.btnPlay = new LargeButton({
				name: "btnPlay",
				string: "PLAY",
				font: "btnLargeFont",
				scope: this,
				x: 240,
				y: 400,
				alpha: 1,
				callback: this.play
			});
			this.addChild(this.btnPlay);
			this.btnPlay.dock(0.5, 0.7);

			this.moreOpt = new LargeButton({
				name: "moreOpt",
				string: "MORE_OPT",
				font: "btnLargeFont",
				scope: this,
				x: 240,
				y: 500,
				alpha: 1,
				callback: this.showOptions
			});
			this.addChild(this.moreOpt);
			this.moreOpt.dock(0.5, 0.8);
				
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
				this.setDefaultLocalStorage();
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