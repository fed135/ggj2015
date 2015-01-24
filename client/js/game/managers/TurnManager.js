define("managers/TurnManager", 
[
	"Arstider/GameData",
	"Arstider/Timer",
	"Arstider/Events"
],
function(GameData, Timer, Events){
	
	TurnManager.MOVE = 0;
	TurnManager.CLIMB = 1;
	TurnManager.DEFENCE = 2;
	TurnManager.ATTACK = 3;
	TurnManager.FALL = 4;
	TurnManager.PENALTY = 5;

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

		this.currentTurn = 0;

		Events.bind("playerInput", this.endTurn.bind(this));
	}

	TurnManager.prototype.startTurn = function(){

		this.currentTurn++;

		console.log("Turn ", this.currentTurn);
		Events.broadcast("turnStart", this.turnDuration);

		this.turnTimer = new Timer(this.endTurn.bind(this), this.turnDuration);
	};

	TurnManager.prototype.endTurn = function(){
		console.log("Round completed");
		if(this.turnTimer) this.turnTimer.kill();
		Events.broadcast("turnEnd");

		setTimeout(this.startTurn.bind(this), this.turnDelay);
	};

	TurnManager.prototype.resolveTurn = function(actions){

		var playerActions = [];

		playerActions[0] = Arstider.checkIn(actions[0], TurnManager.PENALTY);
		playerActions[1] = Arstider.checkIn(actions[1], TurnManager.PENALTY);

		//If player made no input...
		//Go defence ?

		if(playerActions[0] == TurnManager.ATTACK && playerActions[1] != TurnManager.DEFENCE){
			playerActions[1] == TurnManager.FALL;
		}

		if(playerActions[1] == TurnManager.ATTACK && playerActions[0] != TurnManager.DEFENCE){
			playerActions[0] == TurnManager.FALL;
		}

		return playerActions;
	};

	return new TurnManager();
});