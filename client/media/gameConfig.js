define([], {

	tileSize:256,
	travelSpeed: 900,
	climbTiles:2,
	climbSpeed:900,
	throwSpeed:900,
	preThrowDelay:150,
	numSpins:3,
	fallSpeed:150,

	sideTreeOccurance:8,

	maxLevel:12,

	/*	Local mode game playerControlls	*/
	playerControlls:[

		/*	Player 1	*/
		[
			{key:"s", action:0},
			{key:"w", action:1},
			{key:"d", action:2},
			{key:"a", action:3}
		],

		/*	Player 2	*/
		[
			{key:"down", action:0},
			{key:"up", action:1},
			{key:"right", action:2},
			{key:"left", action:3}
		]
	],

	actions:[
		{name: "move", message:"is doing zig-zags!"},
		{name: "climb", message:"is going for the top!"},
		{name: "defence", message:"is a chicken. Coo coo ka cha. Coo coo ka choo!"},
		{name: "attack", message:"is a savage beast!"},
		{name: "fall", message:"is falling towards possible knee injuries!"},
		{name: "penalty", message:"is gazing at the clouds..."}
	],

	turnDuration: 3000,
	turnDelay:150,

	tiles:[
		{
			url: "tile1.png"
		}
	],

	blockers:[
		{
			url: "arbre_01.png"
		},
		{
			url: "arbre_02.png"
		},
		{
			url: "arbre_03.png"
		},
		{
			url: "arbre_04.png"
		},
		{
			url: "arbre_05.png"
		},
		{
			url: "arbre_06.png"
		},
		{
			url: "arbre_07.png"
		},
		{
			url: "arbre_08.png"
		},
		{
			url: "arbre_09.png"
		},
		{
			url: "roche_01.png"
		},
		{
			url: "roche_02.png"
		},
		{
			url: "roche_03.png"
		},
		{
			url: "roche_04.png"
		},
		{
			url: "roche_05.png"
		},
		{
			url: "roche_06.png"
		}
	],

	patterns:[
		[
			[0, 0],
			[0, 0],
			[0, 1],
			[0, 0],
			[0, 0],
			[0, 1],
			[2, 0],
			[1, 0],
			[0, 0]
		]

	]
});
