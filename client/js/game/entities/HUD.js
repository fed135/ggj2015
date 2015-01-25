define("entities/HUD",
[
	"Arstider/DisplayObject",
	"Arstider/commons/RingFiller",
	"Arstider/GameData",
	"Arstider/Tween",
	"Arstider/Events",
	"Arstider/Easings",
	"Arstider/Gradient",
	"Arstider/TextField",
	"Arstider/Dictionary",
	"Arstider/Viewport"
],
function(DisplayObject, RingFiller, GameData, Tween, Events, Easings, Gradient, TextField, Dictionary, Viewport){
	
	function HUD(){
		Arstider.Super(this, DisplayObject)

		this.fill(1,1);
		
		this.minimap = new DisplayObject({
			name: "minimap",
			data:"media/images/screens/hud/progress.png",
			x: 0,
			y: 0
		});
		this.addChild(this.minimap);
		this.minimap.dock(0.5,0);

		this.p1Progress = new DisplayObject({
			name: "p1Progress",
			data:"media/images/screens/hud/pion_bleu.png",
			x: 820 - 76*0.5,
			y: 710
		});
		this.addChild(this.p1Progress);

		this.p2Progress = new DisplayObject({
			name: "p2Progress",
			data:"media/images/screens/hud/pion_rouge.png",
			x: 860 - 76*0.5,
			y: 710
		});
		this.addChild(this.p2Progress);
		
		this.underTimer = new DisplayObject({
			name: "underTimer",
			data:"media/images/screens/hud/timer_cercle_under.png",
			x: 0,
			y: 781
		});
		this.addChild(this.underTimer);
		this.underTimer.dock(0.5,null);

		this.turnBar = new RingFiller({
			name: "bar",
			texture: "media/images/screens/hud/timer_cercle.png",
			x: 100,
			y: 705,
			rpX:0.5,
			rpY:0.5,
			rotation:-90,
			startAngle:0,
			centerRadius: 0,
			outsideRadius: 155
		});
		this.turnBar.dock(0.5, null);
		this.turnBar.update = function(){
			this.setProgress(this._pcent);
		}
		this.addChild(this.turnBar);

		this.timerTab = new DisplayObject({
			name: "timerTab",
			data:"media/images/screens/hud/timer_coche.png",
			x: 0,
			y: 776
		});
		this.addChild(this.timerTab);
		this.timerTab.dock(0.5,null);

		this.title = new DisplayObject({
			name: "title",
			data:"media/images/screens/hud/title.png",
			x: 0,
			y: 925
		});
		this.addChild(this.title);
		this.title.dock(0.5,null);

		this.p1Controls = new DisplayObject({
			name: "p1Controls",
			data:"media/images/screens/hud/pad_bleu_left_normal.png",
			x: 10,
			y: 800
		});
		this.addChild(this.p1Controls);

		this.p2Controls = new DisplayObject({
			name: "p2Controls",
			data:"media/images/screens/hud/pad_rouge_right_normal.png",
			x: 1680-10-261,
			y: 800
		});
		this.addChild(this.p2Controls);

		this.turnBarTween;
		Events.bind("turnStart", this.updatePlayersPos.bind(this));
		Events.bind("turnEnd", this.stopBarProgress.bind(this));
		Events.bind("turnStart", this.updatePickaxes.bind(this));
		Events.bind("turnEnd", this.updatePickaxes.bind(this));

		this.redPickaxes = [];
		this.bluePickaxes = [];
		var shizzle = 0;
		for (var i = 0; i < 6; i++) {
			if(i%3 == 0)shizzle++;
			var pickax = new DisplayObject({
				name: "pickax",
				data:"media/images/screens/hud/pick_ui_empty.png",
				x: (i>=3)?1480:80,
				y: 60 - 135 * (i - 3*shizzle)
			});
			this.addChild(pickax);

			if(i>=3){
				this.redPickaxes.push(pickax);
			}else{
				this.bluePickaxes.push(pickax);
			}
		};

		this.winGradient = new Gradient({
			type:"linear",
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 1,
			height:150
		});
		this.winGradient.addColor(0, "#FFEE00");
		this.winGradient.addColor(1, "#E86507");

		this.winTxt = new TextField(
		{
			name: "winTxt",
		    text:Dictionary.translate("WIN"),
		    x:500-250,
		    y:525,
		    width:500,
		    height:180,
		    strokeText: true
		});
		//this.addChild(this.winTxt);
		this.winTxt.setFont("resultFont",{"fillStyle":this.winGradient.pattern});

		this.loseGradient = new Gradient({
			type:"linear",
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 1,
			height:150
		});
		this.loseGradient.addColor(0, "#03B7FF");
		this.loseGradient.addColor(1, "#000878");

		this.failTxt = new TextField(
		{
			name: "failTxt",
		    text:Dictionary.translate("FAIL"),
		    x:1100-250,
		    y:300,
		    width:500,
		    height:180,
		    rpY:0.5,
		    alpha:0,
		    strokeText: true
		});
		//this.addChild(this.failTxt);
		this.failTxt.setFont("resultFont",{"fillStyle":this.loseGradient.pattern, "strokeStyle":"black"});
	}	


	Arstider.Inherit(HUD, DisplayObject);

	HUD.prototype.updateBarFill = function(time){
		this.turnBar._pcent = 1;
		if(this.turnBarTween) this.turnBarTween.kill();
		this.turnBarTween = new Tween(this.turnBar, {_pcent:0}, time).play();
		//this.turnBar.draw = this.turnBar._draw;
	};

	HUD.prototype.updatePlayersPos = function(){
		var maxAltitude = GameData.get("maxLevel");
		var p1Altitude = this.parent.players[0].altitude;
		var p2Altitude = this.parent.players[1].altitude;
		var p1Ratio = p1Altitude / maxAltitude;
		var p2Ratio = p2Altitude / maxAltitude;
		var pStart = 710;
		var maxY = 100;

		//console.log(p1Ratio);

		new Tween(this.p1Progress, {y:pStart - (pStart - maxY)*p1Ratio },300 , Easings.LINEAR).play();
		new Tween(this.p2Progress, {y:pStart - (pStart - maxY)*p2Ratio },300 , Easings.LINEAR).play();
	};

	HUD.prototype.stopBarProgress = function(){
		if(this.turnBarTween) this.turnBarTween.kill();
	};

	HUD.prototype.updatePickaxes = function(){
		var p1Ammo = this.parent.players[0].numPickups;
		var p2Ammo = this.parent.players[1].numPickups;
		
		for (var i = 0; i < 3; i++) {
			if(i < p1Ammo){
				this.bluePickaxes[i].loadBitmap("media/images/screens/hud/pick_ui_blue.png")
			}else{
				this.bluePickaxes[i].loadBitmap("media/images/screens/hud/pick_ui_empty.png")
			}
			if(i < p2Ammo){
				this.redPickaxes[i].loadBitmap("media/images/screens/hud/pick_ui_red.png")
			}else{
				this.redPickaxes[i].loadBitmap("media/images/screens/hud/pick_ui_empty.png")

			}
		};
	};

	HUD.prototype.result = function(){
		//if(this.turnBarTween) this.turnBarTween.kill();
	};

	return HUD;
});