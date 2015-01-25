define("screens/gameplay", 
[
	"Arstider/Background",
	"Arstider/DisplayObject",
	"Arstider/Shape",
	"Arstider/Gradient",
	"Arstider/Events",
	"Arstider/Sound",

	"managers/CameraManager",
	"managers/MountainScroller",
	"managers/PlayerController",
	"managers/TurnManager",

	"entities/Player",
	"entities/HUD"
], 
function(Background, DisplayObject, Shape, Gradient, Events, Sound, CameraManager, MountainScroller, PlayerController, TurnManager, Player, HUD){
	var thisRef;

	function resolvePlayerActions(){
		var actions = TurnManager.resolveTurn(PlayerController.selectedInput)

		for(var i=0; i<this.numberOfPlayers; i++){	
			this.players[i].doAction(actions[i]);
		}
	}


	//The game object
	return {	

		paused: false,
		//called when class is constructed
		init:function(){
			thisRef = this;

			//Number of players hard-coded here. Could easily be dynamic
			this.numberOfPlayers = 2;
			
			Background.killBuffer();
			var bgGradient = new Gradient();
			bgGradient.addColor(0, "#4bb5ff");
			bgGradient.addColor(1, "#afdeff");
			Background.addChild(new Shape({
				fillStyle:bgGradient.pattern,
				width:1680,
				height:1050
			}));
			
			CameraManager.splitScreen(this, this.numberOfPlayers);
			PlayerController.init(this.numberOfPlayers);
			//MountainScroller;
			for(var i = 0; i<5; i++){
				MountainScroller.generateSection(CameraManager.cameras, [[0, 0]]);
				//console.log(CameraManager.cameras[1].currentAltitude);
			}
			//console.log(CameraManager.cameras[1].currentAltitude);

			MountainScroller.generateSection(CameraManager.cameras);
			//console.log(CameraManager.cameras[1].currentAltitude);

			this.players = [];

			var player;
			var ground;
			for(var p = 0; p<this.numberOfPlayers; p++){
				player = new Player({
					index:p,
					name:"Player"+p
				});
				this.players.push(player);
				CameraManager.cameras[p].addPlayer(player);

				//Add startingGrass
				ground = new DisplayObject({
					name:"ground",
					data:"media/images/gameplay/ground.png",
					largeData:true,
					width:840,
					height:937,
					dataWidth:840,
					dataHeight:937,
					y:152,
					xOffset:p*840
				});
				CameraManager.cameras[p].addChild(ground);
			}

			TurnManager.players= this.players;

			


			this.hud = new HUD()
			this.addChild(this.hud);

			Events.bind("turnStart", this.hud.updateBarFill.bind(this.hud));
			Events.bind("turnEnd", resolvePlayerActions.bind(this));
		},
		
		//once assets are loaded
		onload:function(){	
			console.log("Starting");
			Sound.stop();
			//Sound.play("gameplayA");
			//Sound.play("gameplayB",{volume:0});
			Sound.play("gameplayC");
			TurnManager.startTurn();
		},
		
		//called every frame
		update:function(dt){
			
		},
		
		//when screen gets unloaded
		onunload:function(){
			
		}
		
	};
});