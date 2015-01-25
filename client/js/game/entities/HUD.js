define("entities/HUD",
[
	"Arstider/DisplayObject",
	"Arstider/commons/RingFiller",
	"Arstider/Shape",
	"Arstider/GameData",
	"Arstider/Tween",
	"Arstider/Events",
	"Arstider/Easings",
	"Arstider/Gradient",
	"Arstider/TextField",
	"Arstider/Dictionary",
	"Arstider/Viewport"
],
function(DisplayObject, RingFiller, Shape, GameData, Tween, Events, Easings, Gradient, TextField, Dictionary, Viewport){
	
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

		/*this.title = new DisplayObject({
			name: "title",
			data:"media/images/screens/hud/title.png",
			x: 0,
			y: 925
		});
		this.addChild(this.title);
		this.title.dock(0.5,null);*/

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

		/*this.bgWin = new Shape({
			x:0,
			width:840,
			height:1050,
			fillStyle:"#00adf5",
			alpha: 0,
			onclick:this.resume
		});
		this.addChild(this.bg);

		this.bgFail = new Shape({
			x:840,
			width:1680,
			height:1050,
			fillStyle:"#ce1922",
			alpha: 0,
			onclick:this.resume
		});
		this.addChild(this.bg);*/

		this.winGradient = new Gradient({
			type:"linear",
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 1,
			height:150
		});
		this.winGradient.addColor(0, "#03B7FF");
		this.winGradient.addColor(1, "#000878");

		

		this.loseGradient = new Gradient({
			type:"linear",
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 1,
			height:150
		});
		this.loseGradient.addColor(0, "#03B7FF");
		this.loseGradient.addColor(1, "#C40010");

	}	


	Arstider.Inherit(HUD, DisplayObject);

	HUD.prototype.updateBarFill = function(time){
		this.turnBar._pcent = 1;
		this.turnBar.alpha = 1;
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
		var maxY = 50;

		//console.log(p1Ratio);

		new Tween(this.p1Progress, {y:pStart - (pStart - maxY)*p1Ratio },300 , Easings.LINEAR).play();
		new Tween(this.p2Progress, {y:pStart - (pStart - maxY)*p2Ratio },300 , Easings.LINEAR).play();
	};

	HUD.prototype.stopBarProgress = function(){
		if(this.turnBarTween) this.turnBarTween.kill();
		this.turnBar.alpha = 0.5;
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

		var winner = GameData.get("winner");

		for (var i = 0; i < 3; i++) {
			this.bluePickaxes[i].alpha = 0;
			this.redPickaxes[i].alpha = 0;
		};
		this.underTimer.alpha = 0;
		this.turnBar.alpha = 0;
		this.timerTab.alpha = 0;
		this.p2Controls.alpha = 0;
		this.p1Controls.alpha = 0;
		
		console.log( winner );
		switch(winner){
			case 0:
				this.bg1 = this.getBG(true,true);
				this.addChild(this.bg1);
				this.bg2 = this.getBG(false,false);
				this.addChild(this.bg2);

				this.resultTxt1 = this.getWinTxt(true);
				this.addChild(this.resultTxt1);
				this.resultTxt2 = this.getFailTxt(false);
				this.addChild(this.resultTxt2);

				this.resultTxt1.setFont("resultFont",{"fillStyle":this.winGradient.pattern});
				this.resultTxt2.setFont("resultFont",{"fillStyle":this.loseGradient.pattern});

				this.sideBySide(this.resultTxt1,true);
				this.upDown(this.resultTxt1);

				new Tween(this.resultTxt2, {y:this.resultTxt2.y+75,alpha:1},650 , Easings.LINEAR)
					.then({rotation:120},1000,Easings.QUAD_IN_OUT)
					.then({rotation:80},500,Easings.QUAD_IN_OUT)
					.then({rotation:90},300,Easings.BACK_IN)
					.play();

			break;
			case 1:
				this.bg1 = this.getBG(false,true);
				this.addChild(this.bg1);
				this.bg2 = this.getBG(true,false);
				this.addChild(this.bg2);

				this.resultTxt1 = this.getWinTxt(false);
				this.addChild(this.resultTxt1);
				this.resultTxt2 = this.getFailTxt(true);
				this.addChild(this.resultTxt2);

				this.resultTxt1.setFont("resultFont",{"fillStyle":this.loseGradient.pattern});
				this.resultTxt2.setFont("resultFont",{"fillStyle":this.winGradient.pattern});

				this.sideBySide(this.resultTxt1,false);
				this.upDown(this.resultTxt1);

				new Tween(this.resultTxt2, {y:this.resultTxt2.y+75,alpha:1},650 , Easings.LINEAR)
					.then({rotation:120},1000,Easings.QUAD_IN_OUT)
					.then({rotation:80},500,Easings.QUAD_IN_OUT)
					.then({rotation:90},300,Easings.BACK_IN)
					.play();

			break;
			case "draw":
				this.bg1 = this.getBG(true,true);
				this.addChild(this.bg1);
				this.bg2 = this.getBG(true,false);
				this.addChild(this.bg2);

				this.resultTxt1 = this.getWinTxt(true);
				this.addChild(this.resultTxt1);
				this.resultTxt2 = this.getWinTxt(false);
				this.addChild(this.resultTxt2);
				
				this.resultTxt1.setFont("resultFont",{"fillStyle":this.winGradient.pattern});
				this.resultTxt2.setFont("resultFont",{"fillStyle":this.loseGradient.pattern});

				this.sideBySide(this.resultTxt1,true);
				this.upDown(this.resultTxt1);

				this.sideBySide(this.resultTxt2,false);
				this.upDown(this.resultTxt2);
			break;
		}

		new Tween(this.bg1, {alpha:0.25},1000 , Easings.LINEAR).play();
		new Tween(this.bg2, {alpha:0.25},1000 , Easings.LINEAR).play();

		this.btnMenu = new DisplayObject({
			name: "btnMenu",
			data:"media/images/screens/result/btnMenu.png",
			x: 0,
			y: 850,
			onclick:function(){
				Events.broadcast("Engine.gotoScreen", "screens/title");
			},
		    onpress:function(){this.loadBitmap("media/images/screens/result/btnMenuPress.png")},
			onrelease:function(){this.loadBitmap("media/images/screens/result/btnMenu.png")},
			onleave:function(){this.loadBitmap("media/images/screens/result/btnMenu.png")}
		});
		this.addChild(this.btnMenu);
		this.btnMenu.dock(0.5,null);

		this.btnReplay = new DisplayObject({
			name: "btnReplay",
			data:"media/images/screens/result/btnReplay.png",
			x: 0,
			y: 750,
			onclick:function(){
				Events.broadcast("Engine.gotoScreen", "screens/gameplay");
			},
		    onpress:function(){this.loadBitmap("media/images/screens/result/btnReplayPress.png")},
			onrelease:function(){this.loadBitmap("media/images/screens/result/btnReplay.png")},
			onleave:function(){this.loadBitmap("media/images/screens/result/btnReplay.png")}
		});
		this.addChild(this.btnReplay);
		this.btnReplay.dock(0.5,null);

	};

	HUD.prototype.sideBySide = function(theThing,isLeft){
		var thisRef = this;
		new Tween(theThing, {x:((isLeft)?100:950), alpha:1},1000 , Easings.SIN_IN_OUT)
		.then({x:((isLeft)?50:900)},1000,Easings.SIN_IN_OUT)
		.then(thisRef.sideBySide.bind(thisRef,theThing,isLeft))
		.play();
	};

	HUD.prototype.upDown = function(theThing){
		var thisRef = this;
		new Tween(theThing, {y:130},250 , Easings.SIN_IN_OUT)
		.then({y:80},250,Easings.SIN_IN_OUT)
		.then({y:130},250,Easings.SIN_IN_OUT)
		.then({y:80},250,Easings.SIN_IN_OUT)
		.then(thisRef.upDown.bind(thisRef,theThing))
		.play();
	};

	var num=0;
	HUD.prototype.getBG = function(win,isLeft){
		num++;
		return new Shape({
					name:"bg"+num,
					x:(isLeft)?0:840,
					width:840,
					height:1050,
					fillStyle:(win)?"#00adf5":"#ce1922",
					alpha: 0
				});
	}

	HUD.prototype.getWinTxt = function(isLeft){
		num++;
		return new TextField(
				{
					name: "winTxt"+num,
				    text:Dictionary.translate("WIN"),
				    x:(isLeft)?450-325:900,
				    y:75,
				    width:650,
				    height:180,
				    strokeText: true,
				    alpha:0
				});
				
	}

	HUD.prototype.getFailTxt = function(isLeft){
		num++;
		return new TextField(
				{
					name: "failTxt"+num,
				    text:Dictionary.translate("FAIL"),
				    x:(isLeft)?450-325:1250-325,
				    y:0,
				    width:650,
				    height:180,
				    rpY:0.5,
				    alpha:0,
				    strokeText: true
				});
				
	}
		

	return HUD;
});