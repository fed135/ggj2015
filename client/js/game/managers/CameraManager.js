define("managers/CameraManager", 
[
	"Arstider/Viewport",
	"Arstider/DisplayObject",

	"entities/Camera"
],
function(Viewport, DisplayObject, Camera){
	
	function CameraManager(){
		this.cameras=[];
	}

	CameraManager.prototype.splitScreen = function(gamescene, sections){

		var
			i = 0,
			cam
		;

		for(;i<sections;i++){
			cam = new Camera({
				index:i,
				name:"Camera"+i
			});

			cam.fill(1/sections, 1);

			gamescene.addChild(cam);
			this.cameras.push(cam);
		}
	};

	return new CameraManager(); 
});