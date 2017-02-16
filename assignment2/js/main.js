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
    var bullets;
    var bulletTime = 0;
    var heart;
    var eye;
    var facing = 'left';
    var jumpTimer = 0;
    var cursors;
    var shootButton;
    var bg;
    var score = 0;
    var scoreString = 'Score : ';
    var scoreText;
    var stateText;
    
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
        //player.animations.add('down', [3, 2], 20, true);
        //player.animations.add('up', [5, 4], 10, true);

        game.camera.follow(player);

        //create robots
        robots = game.add.group();
        robots.enableBody = true;
        robots.physicsBodyType = Phaser.Physics.ARCADE;
        createRobots();
        

        //  Our bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(300, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('bulletOOB', true);
        bullets.setAll('checkWorldBounds', true);

        //  The score
        scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

        cursors = game.input.keyboard.createCursorKeys();
        shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    
    function update() {
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(robots, layer);

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;

            if (facing != 'left') {
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 150;

            if (facing != 'right') {
                player.animations.play('right');
                facing = 'right';
            }
        }
        else {
            if (facing != 'idle') {
                player.animations.stop();

                if (facing == 'left') {
                    player.frame = 1;
                }
                else {
                    player.frame = 0;
                }

                facing = 'idle';
            }
        }
        if (cursors.up.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
            player.body.velocity.y = -250;
            jumpTimer = game.time.now + 750;
            //player.animations.play('up');
        }

        if (shootButton.isDown) {
            if (game.time.now >= bulletTime) {
                if (facing == 'left') {
                    //  Grab the first bullet we can from the pool
                    var bullet = bullets.getFirstExists(false);
                    if (bullet) {
                        //  And fire it
                        bullet.reset(player.x , player.y );
                        bullet.body.velocity.x = -400;
                        bulletTime = game.time.now + 200;
                    }
                }
                else if (facing == 'right'){
                    var bullet = bullets.getFirstExists(false);
                    if (bullet) {
                        //  And fire it
                        bullet.reset(player.x , player.y );
                        bullet.body.velocity.x = 400;
                        bulletTime = game.time.now + 200;
                    }
                }
            }
        }

        game.physics.arcade.overlap(bullets, robots, collisionHandler, null, this);
    }

    function createRobots() {
        for (var y = 0; y < 10; y++) {
            var robot = robots.create(game.world.randomX, game.world.randomY, 'robot');
        }
    }

    function collisionHandler(bullet, robot) {

        //  When a bullet hits an alien we kill them both
        bullet.kill();
        robot.kill();

        //  Increase the score
        score += 20;
        scoreText.text = scoreString + score;

        //  And drop an organ
        

        if (robots.countLiving() == 0) {
            score += 1000;
            scoreText.text = scoreString + score;

            stateText.text = " You Won, \n Click to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart, this);
        }

    }

    function bulletOOB(bullet) {
        bullet.kill();
    }

    function restart() {

        //  A new level starts
        score = 0;
        bulletTime = 0;

        //  And brings the aliens back from the dead :)
        robots.removeAll();
        createRobots();

        //resets the player
        player.reset();
        //hides the text
        stateText.visible = false;
        //scoreText.text = scoreString + score;

    }
};
