define("entities/HUD",
[
	"Arstider/DisplayObject",
	"Arstider/Shape",
	"Arstider/Tween",
	"Arstider/Easings",
	"Arstider/Viewport"
],
function(DisplayObject, Shape, Tween, Easings, Viewport){
	
	function HUD(){
		Arstider.Super(this, DisplayObject);

		this.turnBar = new Shape({
			height:20,
			width:Viewport.visibleWidth,
			x:(Viewport.maxWidth - Viewport.visibleWidth) *0.5,
			fillStyle:"white"
		});

		this.fill(1,1);

		this.turnBar.dock(null, 1);

		this.addChild(this.turnBar);

		this.turnBarTween;
	}	

	Arstider.Inherit(HUD, DisplayObject);

	HUD.prototype.updateBarFill = function(time){
		if(this.turnBarTween) this.turnBarTween.kill();

		this.turnBarTween = new Tween(this.turnBar, {width:0}, time).play();
	};

	return HUD;
});