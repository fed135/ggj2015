// Title Screen
define("screens/result",
[
	// List sdk required module here...
	"Arstider/Events",
	"Arstider/Background",
	"Arstider/DisplayObject",
	"Arstider/TextField",
	"Arstider/Shape",
	"Arstider/Gradient",
	"Arstider/Dictionary",
	"Arstider/Tween",
	"Arstider/Easings",
	"Arstider/GameData",
	"Arstider/Sound",
	// List sdk custom entities here...
	"entities/LargeButton",
	"entities/Overlay"
],
function(Events, Background, DisplayObject, TextField, Shape, Gradient, Dictionary, Tween, Easings, GameData, Sound, LargeButton, Overlay)
{	
	/**
    * Returns an object to be mixed-in to a screen class object. Methods are rescoped so that the 'this' keyword refers to the screen. 
    */
	return {

		// You can define screen properties, in this case, is an overlay is visible
		isOverlay: false,

		init:function()
		{
			
			this.bg = new Shape({
				width:1680,
				height:1050,
				fillStyle:"black",
				alpha: 0.8
			});
			this.addChild(this.bg);

			// Screen assets

			this.btnPlay = new LargeButton({
				name: "btnPlay",
				string: "REPLAY",
				font: "btnLargeFont",
				scope: this,
				x: 240,
				y: 672,
				alpha: 0,
				callback: this.play
			});
			this.addChild(this.btnPlay);
			this.btnPlay.dock(0.95,0.15);

			this.winGradient = new Gradient({
				type:"linear",
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 1,
				height:150
			});
			this.winGradient.addColor(0, "#FFEE00");
			this.winGradient.addColor(1, "#E86507");

			this.winTxt = new TextField(
			{
				name: "winTxt",
			    text:Dictionary.translate("WIN"),
			    x:500-250,
			    y:525,
			    width:500,
			    height:180,
			    strokeText: true
			});
			this.addChild(this.winTxt);
			this.winTxt.setFont("resultFont",{"fillStyle":this.winGradient.pattern});

			this.loseGradient = new Gradient({
				type:"linear",
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 1,
				height:150
			});
			this.loseGradient.addColor(0, "#03B7FF");
			this.loseGradient.addColor(1, "#000878");

			this.failTxt = new TextField(
			{
				name: "failTxt",
			    text:Dictionary.translate("FAIL"),
			    x:1100-250,
			    y:300,
			    width:500,
			    height:180,
			    rpY:0.5,
			    alpha:0,
			    strokeText: true
			});
			this.addChild(this.failTxt);
			this.failTxt.setFont("resultFont",{"fillStyle":this.loseGradient.pattern, "strokeStyle":"black"});

		},

		
		// Called at the end of the preloading
		onload:function()
		{			
			var thisRef = this;

			new Tween(this.failTxt, {y:this.failTxt.y+75,alpha:1},650 , Easings.LINEAR)
			.then({rotation:120},1000,Easings.QUAD_IN_OUT)
			.then({rotation:80},500,Easings.QUAD_IN_OUT)
			.then({rotation:90},300,Easings.BACK_IN)
			.play();

			new Tween(this.winTxt, {x:325},1000 , Easings.SIN_IN_OUT)
			.then({x:275},1000,Easings.SIN_IN_OUT)
			.then(thisRef.sideBySide.bind(thisRef))
			.play();

			new Tween(this.winTxt, {y:530},250 , Easings.SIN_IN_OUT)
			.then({y:500},250,Easings.SIN_IN_OUT)
			.then({y:530},250,Easings.SIN_IN_OUT)
			.then({y:500},250,Easings.SIN_IN_OUT)
			.then(thisRef.upDown.bind(thisRef))
			.play();

		},

		sideBySide:function(){
			var thisRef = this;
			new Tween(this.winTxt, {x:325},1000 , Easings.SIN_IN_OUT)
			.then({x:275},1000,Easings.SIN_IN_OUT)
			.then(thisRef.sideBySide.bind(thisRef))
			.play();
		},

		upDown:function(){
			var thisRef = this;
			new Tween(this.winTxt, {y:530},250 , Easings.SIN_IN_OUT)
			.then({y:500},250,Easings.SIN_IN_OUT)
			.then({y:530},250,Easings.SIN_IN_OUT)
			.then({y:500},250,Easings.SIN_IN_OUT)
			.then(thisRef.upDown.bind(thisRef))
			.play();
		},
		
		play:function()
		{
			if(this.isOverlay) return;
						
			Events.broadcast("Engine.gotoScreen", "screens/chooseLevel");
		}
		
	};
});