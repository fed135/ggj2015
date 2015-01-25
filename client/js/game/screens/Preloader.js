define("screens/Preloader",[                         
	"Arstider/DisplayObject","Arstider/Viewport"
], function(DisplayObject, Viewport){
	
	return {
		init:function()
		{
			this.width = Viewport.maxWidth;
			this.height = Viewport.maxHeight;

			this.bg = new DisplayObject({
				name: "bg",
				data: "media/images/screens/title/bg.jpg",
			});
			this.addChild(this.bg);

			this.bar = new DisplayObject({
				name: "bar",
				data: "media/images/screens/preloader/bar.png",
				x: 280,
				y: 318
			});
			this.addChild(this.bar);
			this.bar.dock(0.33,0.485);
		},
		update:function(pc)
		{
			var w = 576 * (pc * 0.01);
			
			if(w < 1) w = 1;

			this.bar.width = this.bar.dataWidth = w;

			// this.drawImage(bar, 0, 0, Math.floor(w), 27, 412, 347, Math.floor(w), 27);
		}
	};
});