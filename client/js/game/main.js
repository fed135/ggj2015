function gameStart(){
	require(["js/libs/Arstider.min"], function(){
		require([
			"Arstider/Browser",
			"Arstider/Engine",
			"Arstider/Sound",
			"Arstider/Fonts",
			"Arstider/Dictionary",
			"screens/Preloader",
			"Arstider/GameData",
			"Arstider/Viewport",

			"media/fonts",
			"media/gameConfig",
			"media/strings",
			"media/music/spriteInfo"
		],
		function(Browser, Engine, Sound, Fonts, Dictionary, preloaderContent, GameData, Viewport, fonts, configs, strings, soundSprite){
			
			Dictionary.load(strings);
			Fonts.load(fonts);
			GameData.load(configs);
			Sound.load("media/music/sprite", soundSprite);
			
			Viewport.minWidth = 1680;
			Viewport.minHeight = 1050;
			Viewport.maxWidth = 1680;
			Viewport.maxHeight = 1050;
			
			//Engine.debug = true;
			Arstider.verbose = 2;
			Engine.start("main", true);
			
			Engine.setPreloaderScreen(preloaderContent);
				
			//#################################################
			

			Viewport._resize();
			Engine.loadScreen("screens/title");
		});
	});
}
