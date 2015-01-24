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

			"media/fonts",
			"media/gameConfig",
			"media/strings",
			"media/music/spriteInfo"
		],
		function(Browser, Engine, Sound, Fonts, Dictionary, preloaderContent, GameData, fonts, configs, strings, soundSprite){
			
			Dictionary.load(strings);
			Fonts.load(fonts);
			GameData.load(configs);
			Sound.load("media/music/sprite", soundSprite);
			
			
			Engine.start("main", true);
			Engine.debug = true;
			Arstider.verbose = 2;
			Engine.setPreloaderScreen(preloaderContent);
				
			//#################################################
			
			Engine.loadScreen("screens/title");
		});
	});
}
