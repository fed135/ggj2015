define("managers/PlayerController",
[
	"Arstider/Keyboard",
	"Arstider/GameData",
	"Arstider/Events"
],
function(Keyboard, GameData, Events){

	function PlayerController(){

		//Player 1, Player 2
		this.selectedInput;
		this.numPlayers = 0;
	}

	PlayerController.prototype.init = function(players){

		var 
			i = 0,
			u = 0,
			inputs = GameData.get("playerControlls"),
			thisRef = this
		;

		this.numPlayers = players;

		for(;i<players;i++){ 
			for(u=0;u<inputs[i].length;u++){
				(function(player, command){
					Keyboard.bind(command.key, "down", function(){
						thisRef.selectInput.call(thisRef, player, command.action);
					});
				})(i, inputs[i][u]);
			}
		}

		Events.bind("turnStart", this.askForInput.bind(this));
		Events.bind("turnEnd", this.blockInputs.bind(this));
	};

	PlayerController.prototype.askForInput = function(){

		Keyboard.enabled = true;
		this.selectedInput = new Array(this.numPlayers);
	};

	PlayerController.prototype.blockInputs = function(){

		Keyboard.enabled = false;
	};

	PlayerController.prototype.selectInput = function(player, input){

		var
			i = 0
		;

		if(!this.selectedInput) return;

		if(this.selectedInput[player] == undefined){
			//console.log("input for player ", player, " : ", input);

			this.selectedInput[player] = input;

			//Check if all inputs have been made
			for(; i<this.selectedInput.length; i++){
				if(this.selectedInput[i] == undefined) return;
			}

			Events.broadcast("playerInput");
		}
	};

	return new PlayerController();	
});