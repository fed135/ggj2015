define("entities/HUD",
[
	"Arstider/DisplayObject",
	"Arstider/Shape",
	"Arstider/Tween",
	"Arstider/Easings"
],
function(DisplayObject, Shape, Tween, Easings){
	
	function HUD(){
		Arstider.Super(this, DisplayObject);

		this.turnBar = new Shape({
			height:20,
			fillStyle:"white"
		});

		this.turnBar.dock(null, 1);
		this.turnBar.fill(1, null);

		this.addChild(this.turnBar);

		this.turnBarTween;
	}	

	Arstider.Inherit(HUD, DisplayObject);

	HUD.prototype.updateBarFill = function(time){
		if(this.turnBarTween) this.turnBarTween.kill();

		this.turnBarTween = new Tween(this.turnBar, {_fillX:0}, time).play();
	};

	return HUD;
});