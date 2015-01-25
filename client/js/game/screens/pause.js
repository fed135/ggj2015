// Title Screen
define("screens/pause",
[
	// List sdk required module here...
	"Arstider/Events",
	"Arstider/Background",
	"Arstider/DisplayObject",
	"Arstider/TextField",
	"Arstider/Shape",
	"Arstider/Dictionary",
	"Arstider/Tween",
	"Arstider/Easings",
	"Arstider/GameData",
	"Arstider/Sound",
	"Arstider/Gradient",
	"Arstider/Viewport",
	// List sdk custom entities here...
	"entities/LargeButton",
	"screens/chooseOptions"
],
function(Events, Background, DisplayObject, TextField, Shape, Dictionary, Tween, Easings, GameData, Sound, Gradient, Viewport, LargeButton, chooseOptions)
{	
	/**
    * Returns an object to be mixed-in to a screen class object. Methods are rescoped so that the 'this' keyword refers to the screen. 
    */
	return {

		// You can define screen properties, in this case, is an overlay is visible
		isOverlay: false,

		init:function()
		{
			
			// Set screen background
			this.bg = new Shape({
				width:1680,
				height:1050,
				fillStyle:"black",
				alpha: 0.8,
				onclick:this.resume
			});
			this.addChild(this.bg);

			this.gradient = new Gradient({
				type:"linear",
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 1,
				height:150
			});
			this.gradient.addColor(0, "#FFEE00");
			this.gradient.addColor(1, "#E86507");

			this.pauseTxt = new TextField(
			{
				name: "pauseTxt",
			    text:Dictionary.translate("PAUSE_TITLE"),
			    x:1680 * 0.5 - 200,
			    y:100,
			    width:400,
			    height:150,
			    rpX:0.25,
			    rpY:0.5,
			    //rotation:15,
			    strokeText: true,
			    alpha:0
			});
			this.addChild(this.pauseTxt);
			this.pauseTxt.setFont("pauseTitleFont",{"fillStyle":this.gradient.pattern});

			
		},
		
		// Called at the end of the preloading
		onload:function()
		{						
			var thisRef = this;
			//setTimeout(function(){
				new Tween(this.pauseTxt, {rotation:5},400 , Easings.QUAD_IN_OUT)
			.then(function(){
				//thisRef.wobble.call(thisRef);
				//setTimeout(function(){
					thisRef.wobble.call(thisRef);
				//},500)
			})
			.play();
					//thisRef.wobble.call(thisRef);
			//},500)


			new Tween(this.pauseTxt, {y:Viewport.maxHeight * 0.5-25+35/*,rotation:-5*/,alpha:1},1000 , Easings.BACK_IN)
			.then(function(){
				//thisRef.wobble.call(thisRef);
				//setTimeout(function(){
					thisRef.bounce.call(thisRef);
				//},500)
			})
			.play();
		},
		
		bounce:function(){
			var thisRef = this;
			
			var tween1 = new Tween(this.pauseTxt, {y:Viewport.maxHeight * 0.5-25-35},1000 , Easings.QUAD_IN_OUT)
			.then({y:Viewport.maxHeight * 0.5-25+35},1000 , Easings.QUAD_IN_OUT)
			.then(function(){
				tween1.kill();
				thisRef.bounce.call(thisRef);
			})
			//.loop()
			.play();
		},

		wobble:function(){
			var thisRef = this;

			var tween1 = new Tween(this.pauseTxt, {rotation:-10},1000 , Easings.QUAD_IN_OUT)
			.then({rotation:10},1000 , Easings.QUAD_IN_OUT)
			.then(function(){
				tween1.kill();
				thisRef.wobble.call(thisRef);
			})
			//.loop()
			.play();
			
		},

		resume:function()
		{
			//this.setDefaultLocalStorage();

			//GameData.set("firstTime", "false", true);
			
			Events.broadcast("Engine.gotoScreen", "currentGameplay");

			//this.hideOverlay();
		}
		
	};
});