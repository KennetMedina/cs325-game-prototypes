
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    // Create your own variables.
    this.bouncy = null;
    this.map = null;
    this.player = null;
    this.pfeet = null;
    this.pbody = null;
    //this.books = null;
    this.book1 = null;
    this.book2 = null;
    this.book3 = null;
    this.book4 = null;
    this.book5 = null;
    this.music = null;
    this.layer = null;
    this.background = null;
    this.cursors = null;
    this.isIdle = true;
    this.wallsBmd = null;
    this.floor = null;
    this.lightAngle = Math.PI / 4;
    this.numOfRays = 20;
    this.rayLen = 100;
    this.maskGraphics = null;

    this.score = 0;
    this.scoreString = 'Books recovered : ';
    this.scoreText = null;
    this.stateText = null;

};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Create a sprite at the center of the screen using the 'logo' image.
        //this.bouncy = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //this.bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        //this.game.physics.enable( this.bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //this.bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = this.game.add.text( this.game.world.centerX, 15, "Build something amazing.", style );
        //text.anchor.setTo( 0.5, 0.0 );
        
        // When you click on the sprite, you go back to the MainMenu.
        //this.bouncy.inputEnabled = true;
        //this.bouncy.events.onInputDown.add(function () { this.state.start('MainMenu'); }, this);


        // Start of Code for game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.music = this.game.add.audio('mainMusic');
        this.music.play();
        /*
        this.map = this.game.add.tilemap('maze');
        this.map.addTilesetImage('tiles-2');
        this.background = this.map.createLayer('background');
        this.layer = this.map.createLayer('walls');
        //this.map.setCollisionByExclusion([], true, this.layer);
        this.map.setCollision([0, 117], true, this.layer);
        this.layer.resizeWorld();
        //this.background.resizeWorld();
        */
        this.floor = this.game.add.sprite(0, 0, 'floor');

        // bitmapdata
        this.wallsBmd = this.game.make.bitmapData(960, 720);
        this.wallsBmd.draw('walls');
        this.wallsBmd.update();
        this.game.add.sprite(0, 0, this.wallsBmd);

        this.maskGraphics = this.game.add.graphics(0, 0);
        //this.background.mask = this.maskGraphics;
        //this.layer.mask = this.maskGraphics;
        this.wallsBmd.mask = this.maskGraphics;

        this.pfeet = this.game.add.sprite(888, 648, 'feet', 'f0001');
        this.pfeet.anchor.setTo(0.5, 0.5);
        this.pfeet.animations.add('bWalk', Phaser.Animation.generateFrameNames('f', 1, 20, '', 4), 10, true, false);
        this.pfeet.scale.setTo(0.20, 0.20);
        //this.pfeet.animations.play('bWalk');
        this.game.physics.enable(this.pfeet, Phaser.Physics.ARCADE);
        this.pfeet.body.collideWorldBounds = true;
        this.pfeet.body.setSize(24, 24, 5, 0);

        this.pbody = this.game.add.sprite(888, 648, 'body', 'b0001');
        this.pbody.anchor.setTo(0.3, 0.5);
        this.pbody.animations.add('tWalk', Phaser.Animation.generateFrameNames('b', 1, 20, '', 4), 10, true, false);
        this.pbody.scale.setTo(0.20, 0.20);
        //this.pbody.animations.play('tWalk');
        this.game.physics.enable(this.pbody, Phaser.Physics.ARCADE);
        this.pbody.body.collideWorldBounds = true;
        this.pbody.body.setSize(24, 24, 18, 11);

        this.pfeet.body.maxAngular = 500;
        this.pfeet.body.angularDrag = 75;

        this.pbody.body.maxAngular = 500;
        this.pbody.body.angularDrag = 75;

        this.game.camera.follow(this.pbody);

        //this.books = this.game.add.group();


        this.book1 = this.game.add.sprite(48, 48, 'book');
        this.book1.animations.add('pturn1', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.book1.scale.setTo(0.25, 0.25);
        this.game.physics.enable(this.book1, Phaser.Physics.ARCADE);
        this.book1.animations.play('pturn1');
        this.book2 = this.game.add.sprite(264, 312, 'book');
        this.book2.animations.add('pturn2', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.book2.scale.setTo(0.25, 0.25);
        this.game.physics.enable(this.book2, Phaser.Physics.ARCADE);
        this.book2.animations.play('pturn2');
        this.book3 = this.game.add.sprite(768, 120, 'book');
        this.book3.animations.add('pturn3', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.book3.scale.setTo(0.25, 0.25);
        this.game.physics.enable(this.book3, Phaser.Physics.ARCADE);
        this.book3.animations.play('pturn3');
        this.book4 = this.game.add.sprite(96, 395, 'book');
        this.book4.animations.add('pturn4', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.book4.scale.setTo(0.25, 0.25);
        this.game.physics.enable(this.book4, Phaser.Physics.ARCADE);
        this.book4.animations.play('pturn4');
        this.book5 = this.game.add.sprite(456, 668, 'book');
        this.book5.animations.add('pturn5', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.book5.scale.setTo(0.25, 0.25);
        this.game.physics.enable(this.book5, Phaser.Physics.ARCADE);
        this.book5.animations.play('pturn5');

        this.pfeet.bringToTop();
        this.pbody.bringToTop();

        this.scoreText = this.game.add.text(10, 10, this.scoreString + this.score + ' out of 5', { font: '24px Arial', fill: '#fff' });
        this.scoreText.fixedToCamera = true;

        this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', { font: '84px Arial', fill: '#fff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;

        this.cursors = this.game.input.keyboard.createCursorKeys();

    },

    update: function () {

        //this.game.physics.arcade.collide(this.pfeet, this.layer);


        this.pfeet.body.velocity.x = 0;
        this.pfeet.body.velocity.y = 0;
        this.pfeet.body.angularVelocity = 0;

        this.pbody.body.velocity.x = 0;
        this.pbody.body.velocity.y = 0;
        this.pbody.body.angularVelocity = 0;

        if (this.cursors.left.isDown) {
            this.pfeet.body.angularVelocity = -150;
            this.pbody.body.angularVelocity = -150;
        }
        else if (this.cursors.right.isDown) {
            this.pfeet.body.angularVelocity = 150;
            this.pbody.body.angularVelocity = 150;
        }
        if (this.cursors.up.isDown) {
            this.game.physics.arcade.velocityFromAngle(this.pfeet.angle, 150, this.pfeet.body.velocity);
            this.game.physics.arcade.velocityFromAngle(this.pbody.angle, 150, this.pbody.body.velocity);
            this.pfeet.animations.play('bWalk');
            this.pbody.animations.play('tWalk');
            this.isIdle = false;
        }
        else if (this.cursors.down.isDown) {
            this.game.physics.arcade.velocityFromAngle(this.pfeet.angle, -150, this.pfeet.body.velocity);
            this.game.physics.arcade.velocityFromAngle(this.pbody.angle, -150, this.pbody.body.velocity);
            this.pfeet.animations.stop();
            this.pbody.animations.stop();
            this.isIdle = false;
        }
        else if (this.isIdle !== true) {
                this.pfeet.animations.stop();
                this.pbody.animations.stop();
                
                this.isIdle = true;
            }

        this.pbody.x = this.pfeet.x;
        this.pbody.y = this.pfeet.y;

        var mouseAngle = Math.atan2(this.pbody.y - this.game.input.y, this.pbody.x - this.game.input.x);
        this.maskGraphics.clear();
        this.maskGraphics.lineStyle(2, 0xffffff, 1);
        this.maskGraphics.beginFill(0xffff00);
        this.maskGraphics.moveTo(this.pbody.x, this.pbody.y);
        for (var i = 0; i < this.numOfRays; i++) {
            var rayAngle = mouseAngle - (this.lightAngle / 2) + (this.lightAngle / this.numOfRays) * i;
            var lastX = this.pbody.x;
            var lastY = this.pbody.y;
            for (var j = 1; j <= this.rayLen; j += 1) {
                var landingX = Math.round(this.pbody.x - (2 * j) * Math.cos(rayAngle));
                var landingY = Math.round(this.pbody.y - (2 * j) * Math.sin(rayAngle));
                if (this.wallsBmd.getPixel32(landingX, landingY) == 0x01bababa) {
                    lastX = landingX;
                    lastY = landingY;
                }
                else {
                    this.maskGraphics.lineTo(lastX, lastY);
                    break;
                }
            }
            this.maskGraphics.lineTo(lastX, lastY);
        }
        this.maskGraphics.lineTo(this.pbody.x, this.pbody.y);
        this.maskGraphics.endFill();
        //this.background.alpha = 0.5 + Math.random() * 0.5;

        //this.pbody.rotation = this.pfeet.rotation;

        this.game.physics.arcade.overlap(this.pfeet, this.book1, this.collectBook, null, this);
        this.game.physics.arcade.overlap(this.pfeet, this.book2, this.collectBook, null, this);
        this.game.physics.arcade.overlap(this.pfeet, this.book3, this.collectBook, null, this);
        this.game.physics.arcade.overlap(this.pfeet, this.book4, this.collectBook, null, this);
        this.game.physics.arcade.overlap(this.pfeet, this.book5, this.collectBook, null, this);
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },

    collectBook: function (pfeet, book) {
        this.score += 1;
        this.scoreText.text = this.scoreString + this.score + ' out of 5';
        book.kill();

        if (this.score === 5) {
            //score += 1000;
            this.music.stop();
            this.scoreText.text = this.scoreString + this.score + ' out of 5';

            this.stateText.text = "You Won, \n Click to restart";
            this.stateText.fixedToCamera = true;
            this.stateText.visible = true;

        //the "click to restart" handler
            this.game.input.onTap.addOnce(this.restart, this);
        }
    },

    restart: function () {
        //  A new level starts
        this.score = 0;
        this.scoreText.text = this.scoreString + this.score + ' out of 5';
        
        //  And brings the aliens back from the dead :)
        this.book1.revive();
        this.book1.reset(48, 48);
        this.book2.revive();
        this.book2.reset(264, 312);
        this.book3.revive();
        this.book3.reset(768, 120);
        this.book4.revive();
        this.book4.reset(96, 395);
        this.book5.revive();
        this.book5.reset(456, 668);

        //  resets the player
        this.pfeet.reset(888, 648);
        this.pbody.reset(888, 648);
        //this.pfeet.kill();
        //this.pbody.kill();
        //this.pfeet.revive();
        //this.pbody.revive();

        //restart the music
        this.music.restart();

        //hides the text
        this.stateText.visible = false;
        //scoreText.text = scoreString + score;
    }

};
