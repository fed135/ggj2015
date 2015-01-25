// Title Screen
define("screens/chooseOptions",
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
	"Arstider/Mouse",
	// List sdk custom entities here...
	"entities/LargeButton"
],
function(Events, Background, DisplayObject, Shape, Dictionary, Tween, Easings, GameData, Sound, Mouse, LargeButton)
{	
	function chooseOptions(props){	
		Arstider.Super(this, DisplayObject, props);
	/**
    * Returns an object to be mixed-in to a screen class object. Methods are rescoped so that the 'this' keyword refers to the screen. 
    */
		this.ballPressed = false;

		this.bg = new Shape({
			width:1680,
			height:1050,
			fillStyle:"black",
			alpha: 0.8
		});
		this.addChild(this.bg);

		// Screen assets
		/*this.btnSpin = new DisplayObject({
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

		this.resoBar = new Shape({
			rpY:0.5,
			x:10,
			y:100,
			width:200,
			height:10,
			fillStyle:"white"
		});
		this.addChild(this.resoBar);

		this.resoBall = new Shape({
			x:this.resoBar.x,
			y:this.resoBar.y-10,
			rpX:0.5,
			rpY:0.5,
			shape:"circ",
			width:30,
			height:30,
			fillStyle:"white",
			onpress:ballClicked.bind(this),
			onrelease:ballLeft.bind(this)
			onleave:ballLeft.bind(this)
		});
		this.addChild(this.resoBall);*/

		this.btnQuit = new DisplayObject({
			name: "btnQuit",
			data:"media/images/buttons/btnQuit.png",
			x:0,
			y:0,
			onclick:quit.bind(this),
		    onpress:function(){this.loadBitmap("media/images/buttons/btnQuitPress.png")},
			onrelease:function(){this.loadBitmap("media/images/buttons/btnQuit.png")},
			onleave:function(){this.loadBitmap("media/images/buttons/btnQuit.png")}
		});
		this.addChild(this.btnQuit);
		this.btnQuit.dock(0.95,0.15);

		this.update = function(){
			if(this.ballPressed){
				console.log(Mouse.x() +" "+ this.resoBar.x);
				if(Mouse.x() > this.resoBar.x && Mouse.x() < this.resoBar.x + this.resoBar.width){
					this.resoBall.x = Mouse.x() - this.resoBall.width * 0.5;
				}
			}
		}

	};
		
	function ballClicked()
	{
		console.log("marche");
		this.ballPressed = true;
	};
	
	function ballLeft()
	{
		this.ballPressed = false;

	};

	function quit()
	{						
		this.alpha = 0;
		this.parent.isOverlay = false;
		this.btnQuit.loadBitmap("media/images/buttons/btnQuit.png");
		//Events.broadcast("Engine.gotoScreen", "screens/gameplay");
	};

	Arstider.Inherit(chooseOptions, DisplayObject);

	return chooseOptions;
});