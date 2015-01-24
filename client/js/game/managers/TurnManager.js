define("managers/TurnManager", 
[
	"Arstider/GameData",
	"Arstider/Timer",
	"Arstider/Events"
],
function(GameData, Timer, Events){
	
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
		Events.broadcast("turnStart");

		this.turnTimer = new Timer(this.endTurn.bind(this), this.turnDuration);
	};

	TurnManager.prototype.endTurn = function(){
		console.log("Round completed");
		if(this.turnTimer) this.turnTimer.kill();
		Events.broadcast("turnEnd");

		setTimeout(this.startTurn.bind(this), this.turnDelay);
	};

	return new TurnManager();
});