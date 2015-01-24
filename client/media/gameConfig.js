define([], {

	/*	Local mode game playerControlls	*/
	playerControlls:[

		/*	Player 1	*/
		[
			{key:"q", action:"move1"},
			{key:"w", action:"move2"},
			{key:"a", action:"move3"},
			{key:"s", action:"move4"},
			{key:"d", action:"move5"}
		],

		/*	Player 2	*/
		[
			{key:"up", action:"move1"},
			{key:"down", action:"move2"},
			{key:"left", action:"move3"},
			{key:"right", action:"move4"},
			{key:"l", action:"move5"}
		]
	],

	turnDuration: 3000,
	turnDelay:1000
});
