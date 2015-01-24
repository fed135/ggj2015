define("screens/gameplay", [
	"Arstider/Keyboard",
	"Arstider/Browser",
	"Arstider/DisplayObject",
	"Arstider/Viewport",
	"Arstider/Mouse",
	"Arstider/Bitmap",
	"Arstider/GameData",
	"Arstider/Background",
	"Arstider/Timer",
	"Arstider/GlobalTimers",
	"Arstider/TextField",
	"Arstider/Dictionary",
	"Arstider/Tween",
	"Arstider/Easings",
	"Arstider/Sound",
	"Arstider/Events"
], function(Keyboard, Browser, DisplayObject, Viewport, Mouse, Bitmap, GameData, Background, Timer, GlobalTimers, TextField, Dictionary, Tween, Easings, Sound, Events){
	var thisRef;
	//The game object
	return {	

		paused: false,
		//called when class is constructed
		init:function(){
			thisRef = this;
			
			Background.set("media/images/gameplay/bg.jpg");
			

			this.title = new TextField({
			    name:"title",
			    width:400,
			    height:70,
			    x:568 - 200,
			    y:20,
			});
			this.addChild(this.title);
			this.title.setFont("titleFont");
			this.title.setText(Dictionary.translate("GAMEPLAY_TITLE"));

			this.btnPause = new DisplayObject({
				name: "btnPause",
				data:"media/images/buttons/btnPause.png",
				x: 0,//10 + Viewport.maxWidth - Viewport.visibleWidth,
				y: 0,//Viewport.visibleHeight * 0.5 - 75 * 0.5,
				alpha: 1,
				onclick:function(){
					if(thisRef.paused){ return; }
					thisRef.paused = true;
					Events.broadcast("Engine.showPopup", "screens/popupPause");
		        },
		        onpress:function(){this.alpha = 0.8;},
    			onrelease:function(){this.alpha = 1;},
    			onleave:function(){this.alpha = 1;},
			});
			this.addChild(this.btnPause);
			this.btnPause.dock(0.99, 0.01);
			
					
		},
		
		//once assets are loaded
		onload:function(){	
			
		},
		
		//called every frame
		update:function(){
			
		},
		
		//when screen gets unloaded
		onunload:function(){
			
		},
		
	};
});