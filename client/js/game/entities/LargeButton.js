define("entities/LargeButton", ["Arstider/commons/Button", "Arstider/Dictionary"], function(Button, Dictionary){
	
	function LargeButton(props){
		var tmp = Arstider.clone(props);
		tmp.states = {
			normal:{
				label: Dictionary.translate(props.string),
				font: props.font || "btnLargeFont",
				data: "media/images/buttons/btnLarge.png"
			},
			hover:{
				label: Dictionary.translate(props.string),
				font: props.font || "btnLargeFont",
				data: "media/images/buttons/btnLargeHover.png"
			},
			pressed:{
				label: Dictionary.translate(props.string),
				font: props.font || "btnLargeFont",
				data: "media/images/buttons/btnLargePress.png"
			}
		};

		var scope = props.scope || this;
		tmp.onclick = function(){props.callback.apply(scope)};

		Arstider.Super(this, Button, tmp);
	}
	Arstider.Inherit(LargeButton, Button);

	return LargeButton;

});