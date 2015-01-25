define("managers/TurnManager", 
[
	"Arstider/GameData",
	"Arstider/Timer",
	"Arstider/Events",
	
	"managers/MountainScroller",
	"managers/CameraManager"
],
function(GameData, Timer, Events, MountainScroller, CameraManager){
	
	TurnManager.MOVE = 0;
	TurnManager.CLIMB = 1;
	TurnManager.DEFENCE = 2;
	TurnManager.ATTACK = 3;
	TurnManager.FALL = 4;
	TurnManager.PENALTY = 5;
	TurnManager.ATTACK_AND_FALL = 6;

	TurnManager.PRIORITIES = [
		TurnManager.MOVE,
		TurnManager.CLIMB,
		TurnManager.DEFENCE,
		TurnManager.ATTACK
	];

	function TurnManager(){
		this.turnTimer;
		this.turnDuration = GameData.get("turnDuration");	//The ammount of time you have to place your inputs
		this.turnDelay = GameData.get("turnDelay");			//Delay at the end of a turn before the next one

		this.maxLevel = GameData.get("maxLevel");

		this.players;
		this.playersReady=0;

		this.forceReadyTimer;

		this.endReached = false;

		this.currentTurn = 0;

		Events.bind("playerInput", this.endTurn.bind(this));
		Events.bind("playerReady", this.checkPlayersReady.bind(this));
	}

	TurnManager.prototype.startTurn = function(){

		this.currentTurn++;

		//console.log("Turn ", this.currentTurn);
		Events.broadcast("turnStart", this.turnDuration);
		if(this.forceReadyTimer) this.forceReadyTimer.kill();
		this.turnTimer = new Timer(this.endTurn.bind(this), this.turnDuration);
	};

	TurnManager.prototype.endTurn = function(){
		//console.log("Round completed");
		if(this.turnTimer) this.turnTimer.kill();
		this.playersReady = 0;
		if(this.forceReadyTimer) this.forceReadyTimer.kill();

		this.forceReadyTimer = new Timer(this.startTurn.bind(this), 3000);
		Events.broadcast("turnEnd");

		for(var i = 0; i<this.players.length; i++){
			if(CameraManager.cameras[i].currentAltitude - this.players[i].altitude <= 3){
				if(this.players[i].altitude < this.maxLevel){
				
					//console.log("Loading section for player ", i);
					MountainScroller.generateSection([CameraManager.cameras[i]]);
				}
			}
		}
	};

	TurnManager.prototype.checkPlayersReady = function(){

		this.playersReady++;

		var winners = [];

		if(this.playersReady == this.players.length){
			if(this.forceReadyTimer) this.forceReadyTimer.kill();

			for(var i = 0; i<this.players.length; i++){

				this.players[i].returnToIdle();

				//console.log('checking if player ', i, ' has finished (',this.players[i].altitude,"/",this.maxLevel,")");
				if(this.players[i].altitude >= this.maxLevel-1){
					console.log("player ", i, " won");
					this.endReached = true;
					winners.push(i);
					this.players[i].victoryDance();
				}
			}

			if(!this.endReached){
				setTimeout(this.startTurn.bind(this), this.turnDelay);
			}
			else{
				if(winners.length > 1){
					GameData.set("winner", "draw");
				}
				else if(winners.length == 1){
					GameData.set("winner", winners[0]);
				}
				else{
					console.error("Dafuk happenned");
				}
			}
		}
	};

	TurnManager.prototype.resolveTurn = function(actions){

		actions[0] = Arstider.checkIn(actions[0], TurnManager.PENALTY);
		actions[1] = Arstider.checkIn(actions[1], TurnManager.PENALTY);

		//If player made no input...
		//Go defence ?

		if((actions[0] == TurnManager.ATTACK || actions[0] == TurnManager.ATTACK_AND_FALL) && actions[1] != TurnManager.DEFENCE && this.players[0].numPickups > 0){
			if(actions[1] == TurnManager.ATTACK || actions[1] == TurnManager.ATTACK_AND_FALL){
				actions[1] = TurnManager.ATTACK_AND_FALL;
			}
			else{
				actions[1] = TurnManager.FALL;
			}
		}

		if((actions[1] == TurnManager.ATTACK || actions[1] == TurnManager.ATTACK_AND_FALL) && actions[0] != TurnManager.DEFENCE && this.players[1].numPickups > 0){
			if(actions[0] == TurnManager.ATTACK || actions[0] == TurnManager.ATTACK_AND_FALL){
				actions[0] = TurnManager.ATTACK_AND_FALL;
			}
			else{
				actions[0] = TurnManager.FALL;
			}
		}

		return actions;
	};

	return new TurnManager();
});