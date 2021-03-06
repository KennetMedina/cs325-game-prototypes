
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlePage', 'assets/maze-title.png');
		this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		this.load.audio('titleMusic', ['assets/crystal cave.mp3']);
		//	+ lots of other required assets here
		this.load.spritesheet('book', 'assets/book.png', 64, 64);
		this.load.audio('mainMusic', ['assets/deep.mp3']);
		//this.load.atlasJSONHash('player', 'assets/player.png', 'assets/player.json');
		this.load.atlas('feet', 'assets/feet.png', 'assets/feet.json');
		this.load.atlas('body', 'assets/body.png', 'assets/body.json');
		//this.load.spritesheet('feet', 'assets/feet.png');
		//this.load.spritesheet('body', 'assets/body.png');
	    this.load.tilemap('maze', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
	    this.load.image('tiles-2', 'assets/tiles-2.png');

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
