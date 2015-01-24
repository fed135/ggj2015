define("entities/Overlay",[
	"Arstider/DisplayObject",
	"Arstider/TextField",
	"Arstider/Tween",
	"Arstider/Easings",
	"Arstider/Viewport",
	"Arstider/Dictionary",

	"entities/LargeButton"
], 
function(DisplayObject, TextField, Tween, Easings, Viewport, Dictionary, LargeButton){
	function Overlay(props){
		Arstider.Super(this, DisplayObject, props);

		this.overlayBg = new DisplayObject({
			data: "media/images/backgrounds/overlayBg.png",
		});
		this.addChild(this.overlayBg);

		this.overlayText = new TextField({
			name: "text_" + this.name,
			x: 368,
			y: 214,
			width: 400,
			height: 200,
			textWrap: true,
            font:props.text.font,
            text:Dictionary.translate(props.text.value)
		});
		this.addChild(this.overlayText);

		this.btnConfirm = new LargeButton({
			name: "btnConfirm_" + this.name,
			string: props.confirm.label,
			font: props.confirm.font,
			x: 319,
			y: 383,
			scope:props.scope,
			callback: props.confirm.callback
		});
		this.addChild(this.btnConfirm);

		this.btnCancel = new LargeButton({
			name: "btnCancel_" + this.name,
			string: props.cancel.label,
			font: props.cancel.font,
			x: 633,
			y: 383,
			scope:props.scope,
			callback: props.cancel.callback
		});
		this.addChild(this.btnCancel);
	}
	
	Arstider.Inherit(Overlay, DisplayObject);
	
	return Overlay;
});