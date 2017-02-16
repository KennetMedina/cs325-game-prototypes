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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        
        game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles-1', 'assets/tiles-1.png');
        game.load.spritesheet('soldier', 'assets/soldier.png', 51, 55);
        game.load.spritesheet('robot', 'assets/robot.png', 64, 64);
        game.load.image('heart', 'assets/heart.png');
        game.load.image('eye', 'assets/eye.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('space', 'assets/space.png');
    }
    
    var map;
    var tileset;
    var layer;
    var player;
    var robots;
    var facing = 'left';
    var jumpTimer = 0;
    var cursors;
    var shootButton;
    var bg;
    
    function create() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.stage.backgroundColor = '#000000';

        bg = game.add.tileSprite(0, 0, 800, 600, 'space');
        bg.fixedToCamera = true;

        //create tilemap
        map = game.add.tilemap('level1');

        map.addTilesetImage('tiles-1');

        map.setCollisionByExclusion([13, 14, 15, 16, 46, 47, 48, 49, 50, 51]);

        layer = map.createLayer('Tile Layer 1');

        layer.resizeWorld();

        game.physics.arcade.gravity.y = 250;

        //create player
        player = game.add.sprite(32, 32, 'soldier');
        game.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        player.body.setSize(20, 32, 5, 16);

        player.animations.add('left', [1, 16, 17, 18, 19, 20, 21, 22, 23], 10, true);
        player.animations.add('turn', [7, 6], 20, true);
        player.animations.add('right', [0, 8, 9, 10, 11, 12, 13, 14, 15], 10, true);
        player.animations.add('down', [3, 2], 20, true);
        player.animations.add('up', [5, 4], 10, true);

        game.camera.follow(player);

        //create robots
        robots = game.add.group();
        robots.enableBody = true;
        robots.physicsBodyType = Phaser.Physics.ARCADE;

        for (var y = 0; y < 10; y++) {
            var robot = robots.create(game.world.randomX, game.world.randomY, 'robot');       
        }

        cursors = game.input.keyboard.createCursorKeys();
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }
};
