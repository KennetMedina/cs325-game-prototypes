
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

        this.music = this.add.audio('mainMusic');
        this.music.play();

        this.map = this.game.add.tilemap('maze');
        this.map.addTilesetImage('tiles-2');
        this.background = this.map.createLayer('background');
        this.layer = this.map.createLayer('walls');
        //this.map.setCollisionByExclusion([], true, this.layer);
        this.map.setCollision([0, 117], true, this.layer);
        this.layer.resizeWorld();
        
        //this.background.resizeWorld();

        this.pfeet = this.game.add.sprite(888, 648, 'feet', 'f0001');
        this.pfeet.anchor.setTo(0.5, 0.5);
        this.pfeet.animations.add('bWalk', Phaser.Animation.generateFrameNames('f', 1, 20, '', 4), 20, true, false);
        this.pfeet.scale.setTo(0.20, 0.20);
        //this.pfeet.animations.play('bWalk');
        this.pfeet.body.collideWorldBounds = true;
        this.pfeet.body.setSize(20, 32, 5, 16);

        this.pbody = this.game.add.sprite(888, 648, 'body', 'b0001');
        this.pbody.anchor.setTo(0.3, 0.5);
        this.pbody.animations.add('tWalk', Phaser.Animation.generateFrameNames('b', 1, 20, '', 4), 20, true, false);
        this.pbody.scale.setTo(0.20, 0.20);
        //this.pbody.animations.play('tWalk');
        this.pbody.body.collideWorldBounds = true;
        this.pbody.body.setSize(20, 32, 5, 16);

        this.pfeet.body.maxAngular = 500;
        this.pfeet.body.angularDrag = 50;

        this.pbody.body.maxAngular = 500;
        this.pbody.body.angularDrag = 50;

        this.game.camera.follow(this.pbody);

        this.book1 = this.game.add.sprite(48, 48, 'book');
        this.book1.animations.add('pturn1', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.book1.scale.setTo(0.25, 0.25);
        this.book1.animations.play('pturn1');
        this.book2 = this.game.add.sprite(264, 312, 'book');
        this.book2.animations.add('pturn2', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.book2.scale.setTo(0.25, 0.25);
        this.book2.animations.play('pturn2');
        this.book3 = this.game.add.sprite(768, 120, 'book');
        this.book3.animations.add('pturn3', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.book3.scale.setTo(0.25, 0.25);
        this.book3.animations.play('pturn3');
        this.book4 = this.game.add.sprite(96, 384, 'book');
        this.book4.animations.add('pturn4', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.book4.scale.setTo(0.25, 0.25);
        this.book4.animations.play('pturn4');
        this.book5 = this.game.add.sprite(456, 672, 'book');
        this.book5.animations.add('pturn5', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.book5.scale.setTo(0.25, 0.25);
        this.book5.animations.play('pturn5');


        this.game.physics.enable(this.pfeet, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.pbody, Phaser.Physics.ARCADE);
        this.pfeet.bringToTop();
        this.pbody.bringToTop();

        this.cursors = this.game.input.keyboard.createCursorKeys();

    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer( this.bouncy, this.game.input.activePointer, 500, 500, 500 );

        this.game.physics.arcade.collide(this.pfeet, this.layer);
        //this.game.physics.arcade.collide(this.pbody, this.layer);

        this.pfeet.animations.stop();
        this.pbody.animations.stop();

        this.pfeet.body.velocity.x = 0;
        this.pfeet.body.velocity.y = 0;
        this.pfeet.body.angularVelocity = 0;

        this.pbody.body.velocity.x = 0;
        this.pbody.body.velocity.y = 0;
        this.pbody.body.angularVelocity = 0;

        if (this.cursors.left.isDown) {
            this.pfeet.body.angularVelocity = -200;
            this.pbody.body.angularVelocity = -200;
        }
        else if (this.cursors.right.isDown) {
            this.pfeet.body.angularVelocity = 200;
            this.pbody.body.angularVelocity = 200;
        }
        if (this.cursors.up.isDown) {
            this.game.physics.arcade.velocityFromAngle(this.pfeet.angle, 200, this.pfeet.body.velocity);
            this.game.physics.arcade.velocityFromAngle(this.pbody.angle, 200, this.pbody.body.velocity);
            this.pfeet.animations.play('bWalk');
            this.pbody.animations.play('tWalk');
        }
        else if (this.cursors.down.isDown) {
            //this.pfeet.y += 2;
            //this.pbody.y += 2;
        }

        this.pbody.x = this.pfeet.x;
        this.pbody.y = this.pfeet.y;

        //this.pbody.rotation = this.pfeet.rotation;
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
