// Title Screen
define("screens/chooseOptions",
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
function(Events, Background, DisplayObject, Dictionary, Tween, Easings, GameData, Sound, LargeButton, Overlay)
{	
	function chooseOptions(props){	
		Arstider.Super(this, DisplayObject, props);
	/**
    * Returns an object to be mixed-in to a screen class object. Methods are rescoped so that the 'this' keyword refers to the screen. 
    */

		// Screen assets
		this.btnSpin = new DisplayObject({
			name: "btnSpin",
			data:"media/images/buttons/btnSpin.png",
			x: 10,
			y: 10,
			scaleX:0.5,
			scaleY:0.5,
			onclick:function(){},
		    onpress:function(){this.loadBitmap("media/images/buttons/btnSpinPress.png")},
			onrelease:function(){this.loadBitmap("media/images/buttons/btnSpin.png")},
			onleave:function(){this.loadBitmap("media/images/buttons/btnSpin.png")}
		});
		this.addChild(this.btnSpin);

		
		this.play = function()
		{						
			Events.broadcast("Engine.gotoScreen", "screens/gameplay");
		}
	};

	Arstider.Inherit(chooseOptions, DisplayObject);

	return chooseOptions;
});