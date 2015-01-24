define("entities/LargeButton", ["Arstider/commons/Button", "Arstider/Dictionary"], function(Button, Dictionary){
	
	function LargeButton(props){
		var tmp = Arstider.clone(props);
		tmp.label = Dictionary.translate(props.string);
		tmp.font = props.font || "btnLargeFont";
		tmp.states = {
			normal:{
				data: "media/images/buttons/btnLarge.png"
			},
			hover:{
				data: "media/images/buttons/btnLargeHover.png"
			},
			pressed:{
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