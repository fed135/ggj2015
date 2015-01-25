define("screens/credits",
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
	"Arstider/Viewport",
	"Arstider/Keyboard"
],
function(Events, Background, DisplayObject, TextField, Dictionary, Tween, Easings, Browser, GameData, Viewport, Keyboard){

	return {
		
		
		init:function(){

			this.bg = new DisplayObject({
				name: "bg",
				data:"media/images/screens/credits/bg.jpg"
			});
			this.addChild(this.bg);


			this.press = new DisplayObject({
				name: "press",
				data:"media/images/screens/credits/press.png"
			});
			this.addChild(this.press);
			this.press.dock(0.5,0.9);

			Keyboard.bind("space", "up",this.skipStory.bind(this));
		},

		onload:function(){
		},
		

		skipStory:function(){
			Events.broadcast("Engine.gotoScreen", "screens/title");
			Keyboard.unbind("space");
		}
	};
});