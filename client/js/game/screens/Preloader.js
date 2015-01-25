define("screens/Preloader",[                         
	"Arstider/DisplayObject","Arstider/Viewport","Arstider/BitmapAnimation"
], function(DisplayObject, Viewport, BitmapAnimation){
	
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

			this.bar = new BitmapAnimation({
				name: "bar",
				x:500,
				y:500,
				spritesheet:"media/images/screens/preloader/loading"/*,
            	speed:0.32*/
			});
			this.addChild(this.bar);
		},

		update:function(pc)
		{

			/*this.bar.currentFrame += 1;
			if(this.bar.currentFrame > 3)this.bar.currentFrame = 0;*/
			/*var w = 576 * (pc * 0.01);
			
			if(w < 1) w = 1;

			this.bar.width = this.bar.dataWidth = w;*/

			// this.drawImage(bar, 0, 0, Math.floor(w), 27, 412, 347, Math.floor(w), 27);
		}
	};
});