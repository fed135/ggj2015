define("entities/IconButton", ["Arstider/commons/Button"], function(Button){
	
	function IconButton(props){
		var tmp = Arstider.clone(props);
		tmp.states = {
			normal:{
				data: "media/images/buttons/"+props.asset+".png"
			},
			hover:{
				data: "media/images/buttons/"+props.asset+"Hover.png"
			},
			pressed:{
				data: "media/images/buttons/"+props.asset+"Press.png"
			}
		};

		var scope = props.scope || this;
		tmp.onclick = function(){props.callback.apply(scope)};

		Arstider.Super(this, Button, tmp);
	}
	Arstider.Inherit(IconButton, Button);

	return IconButton;

});