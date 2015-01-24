// Title Screen
define("screens/hud",
[
	// List sdk required module here...
	"Arstider/Events",
	"Arstider/Background",
	"Arstider/DisplayObject",
	"Arstider/Dictionary",
	"Arstider/Tween",
	"Arstider/Easings",
	"Arstider/GameData",
	"Arstider/Sound",
	// List sdk custom entities here...
	"entities/LargeButton"
],
function(Events, Background, DisplayObject, Dictionary, Tween, Easings, GameData, Sound, LargeButton){
	function hud(props){	
		Arstider.Super(this, DisplayObject, props);
		/**
	    * Returns an object to be mixed-in to a screen class object. Methods are rescoped so that the 'this' keyword refers to the screen. 
	    */

		/*this.bg = new Shape({
			width:1680,
			height:1050,
			fillStyle:"black",
			alpha: 0.8
		});
		this.addChild(this.bg);*/

		// Screen assets
		this.btnPause = new DisplayObject({
			name: "btnPause",
			data:"media/images/buttons/btnPause.png",
			x: 700,
			y: 20,
			onclick:pause.bind(this),
		    onpress:function(){this.loadBitmap("media/images/buttons/btnPause.png")},
			onrelease:function(){this.loadBitmap("media/images/buttons/btnPause.png")},
			onleave:function(){this.loadBitmap("media/images/buttons/btnPause.png")}
		});
		this.addChild(this.btnPause);
		this.btnPause.dock(0.95,0.15);
	};

	function pause(){
		this.saveStateAs("currentGameplay");
		Events.broadcast("Engine.gotoScreen", "screens/pause");
	}

	Arstider.Inherit(hud, DisplayObject);

	return hud;
});