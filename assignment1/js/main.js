window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 400, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        //game.load.image( 'logo', 'assets/phaser.png' );
        game.load.image('map', 'assets/map.png');
        game.load.image('cowboy', 'assets/cowboy.png');
        game.load.image('asteroid', 'assets/asteroid.png');
    }
    
    var player;
    var bg;
    var cursors;
    var asteroids;
    
    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.stage.backgroundColor = '#000000';

        bg = game.add.tileSprite(0, 0, 800, 400, 'map');
        bg.fixedToCamera = true;

        game.physics.arcade.gravity.y = 250;

        player = game.add.sprite(400, 345, 'cowboy');
        game.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        player.anchor.setTo(0.5, 0.5);


        asteroids = game.add.group();
        asteroids.enableBody = true;
        asteroids.physicsBodyType = Phaser.Physics.ARCADE;

        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 10; x++) {
                var asteroid = asteroids.create(200 + x * 48, y * 50, 'asteroid');
                asteroid.name = 'asteroid' + x.toString() + y.toString();
                asteroid.checkWorldBounds = true;
                asteroid.events.onOutOfBounds.add(asteroidOut, this);
                asteroid.body.velocity.y = 50 + Math.random() * 200;
            }
        }

        
        game.camera.follow(player);

        cursors = game.input.keyboard.createCursorKeys();
        
    }

    function asteroidOut(asteroid) {

        //  Move the asteroid to the top of the screen again
        asteroid.reset(asteroid.x, 0);

        //  And give it a new random velocity
        asteroid.body.velocity.y = 50 + Math.random() * 200;

    }
    
    function update() {
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
        }
        
    }
};
