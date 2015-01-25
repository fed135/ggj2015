define([], {

	tileSize:256,
	travelSpeed: 500,
	climbTiles:2,
	climbSpeed:900,
	throwSpeed:900,
	preThrowDelay:150,
	numSpins:3,

	maxLevel:50,

	/*	Local mode game playerControlls	*/
	playerControlls:[

		/*	Player 1	*/
		[
			{key:"q", action:0},
			{key:"w", action:1},
			{key:"a", action:2},
			{key:"s", action:3}
		],

		/*	Player 2	*/
		[
			{key:"up", action:0},
			{key:"down", action:1},
			{key:"left", action:2},
			{key:"right", action:3}
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
			url: "blocker1.png",
			xOffset:0,
			yOffset:0
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
			[0, 0],
			[1, 0],
			[2, 0]
		]

	]
});
