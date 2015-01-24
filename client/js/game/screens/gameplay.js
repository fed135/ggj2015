define("screens/gameplay", 
[
	"Arstider/Background",
	"Arstider/DisplayObject",

	"managers/CameraManager",
	"managers/MountainScroller",
	"managers/PlayerController",
	"managers/TurnManager",

	"entities/Player"
], 
function(Background, DisplayObject, CameraManager, MountainScroller, PlayerController, TurnManager, Player){
	var thisRef;
	//The game object
	return {	

		paused: false,
		//called when class is constructed
		init:function(){
			thisRef = this;

			//Number of players hard-coded here. Could easily be dynamic
			this.numberOfPlayers = 2;
			
			Background.loadBitmap("media/images/gameplay/bg.jpg");
			
			CameraManager.splitScreen(this, this.numberOfPlayers);
			PlayerController.init(this.numberOfPlayers);
			//MountainScroller;
			for(var i = 0; i<5; i++){
				MountainScroller.generateSection(CameraManager.cameras, [[0, 0]]);
			}

			var player;
			for(var p = 0; p<this.numberOfPlayers; p++){
				player = new Player({
					id:p,
					name:"Player"+p
				});
				CameraManager.cameras[p].addChild(player);
			}
		},
		
		//once assets are loaded
		onload:function(){	
			console.log("Starting");
			TurnManager.startTurn();
		},
		
		//called every frame
		update:function(dt){
			
		},
		
		//when screen gets unloaded
		onunload:function(){
			
		},
		
	};
});