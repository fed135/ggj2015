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