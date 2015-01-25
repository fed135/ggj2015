define([],{
	/*Longer, individual songs/ tracks - no more than one of these can play at a given time*/
	"tracks":{
		/*menu bgm track*/
		"menu":				{"files":["media/music/menu.mp3"], "loop":true},
		"gameplayA":				{"files":["media/music/gameplayA.mp3"], "loop":true},
		"gameplayB":				{"files":["media/music/gameplayB.mp3"], "loop":true},
		"gameplayC":				{"files":["media/music/gameplayC.mp3"], "loop":true}
	},
	/*SFX files - go crazy!*/
	"sounds":{
		/*pickup sfx*/
		"win":				{"offset":0, "duration":1985},
		/*bad note sfx*/
		"fail":				{"offset":1985, "duration":836},
		/*boost sfx*/
		"missions": 		{"offset":2821, "duration":940},
		/*ui button sfx*/
		"obstacle": 		{"offset":3762, "duration":1437},
		/*powerup sfx*/
		"powerup": 			{"offset":5198, "duration":1392}
	}
});