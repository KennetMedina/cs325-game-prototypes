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
    var jumpButton;
    var shootBotton;
    var facing = 'left';
    var jumpTimer;
    
    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.stage.backgroundColor = '#000000';

        bg = game.add.tileSprite(0, 0, 800, 400, 'map');
        bg.fixedToCamera = true;

        game.physics.arcade.gravity.y = 250;

        player = game.add.sprite(400, 0, 'cowboy');
        game.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        //player.body.setSize(20, 32, 5, 16);

        //player.animations.add('left', [0, 1, 2, 3], 10, true);
        //player.animations.add('turn', [4], 20, true);
        //player.animations.add('right', [5, 6, 7, 8], 10, true);

        game.camera.follow(player);

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
    }
    
    function update() {
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;

            if (facing != 'left') {
                //player.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 150;

            if (facing != 'right') {
                //player.animations.play('right');
                facing = 'right';
            }
        }
        //else {
           // if (facing != 'idle') {
                //player.animations.stop();

                //if (facing == 'left') {
                    //player.frame = 0;
                //}
                //else {
                   // player.frame = 5;
               // }

                //facing = 'idle';
            //}
        //}

        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
            player.body.velocity.y = -250;
            jumpTimer = game.time.now + 750;
        }
    }
};
