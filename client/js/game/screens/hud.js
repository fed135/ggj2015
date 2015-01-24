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

		// You can define screen properties, in this case, is an overlay is visible

		// Screen assets
		this.btnPause = new DisplayObject({
			name: "btnPause",
			data:"media/images/buttons/btnPause.png",
			x: 700,
			y: 20,
			onclick:this.pause
		    onpress:function(){this.loadBitmap("media/images/buttons/btnPausePress.png")},
			onrelease:function(){this.loadBitmap("media/images/buttons/btnPause.png")},
			onleave:function(){this.loadBitmap("media/images/buttons/btnPause.png")}
		});
		this.addChild(this.btnPause);
		
		this.pause = function()
		{						
			console.log("PAUSE GAME MOFOCKA");
		}
	};

	Arstider.Inherit(Overlay, DisplayObject);

	return hud;
});