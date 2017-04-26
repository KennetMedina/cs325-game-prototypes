
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
    this.books = null;
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
        this.layer = this.map.createLayer('walls');
        this.map.setCollisionByExclusion([], true, this.layer);
        this.layer.resizeWorld();
        //this.background = this.map.createLayer('background');
        //this.background.resizeWorld();

        //this.pfeet = this.game.add.sprite(32, 32, 'feet', 'f0001');
        this.pfeet = this.game.add.sprite(888, 648, 'feet');
        this.pfeet.anchor.setTo(0.3, 0.5);
        //this.pfeet.animations.add('bWalk', ['f0001', 'f0002' ,'f0003' ,'f0004' ,'f0005' ,'f0006' ,'f0007' ,'f0008' ,'f0009' ,'f0010' ,'f0011' ,'f0012' ,'f0013' ,'f0014', 'f0015', 'f0016', 'f0017', 'f0018', 'f0019', 'f0020'], 20, true);
        this.pfeet.animations.add('bWalk', [0, 2, 4, 7, 9, 11, 10, 8, 5, 3, 1, 3, 6, 8, 10, 11, 9, 7, 4, 2], 20, true);
        this.pfeet.scale.setTo(0.25, 0.25);
        //this.pfeet.animations.play('bWalk');

        //this.pbody = this.game.add.sprite(32, 32, 'body', 'b0001');
        this.pbody = this.game.add.sprite(888, 648, 'body');
        this.pbody.anchor.setTo(0.5, 0.5);
        //this.pbody.animations.add('tWalk', ['b0001', 'b0002', 'b0003', 'b0004', 'b0005', 'b0006', 'b0007', 'b0008', 'b0009', 'b0010', 'b0011', 'b0012', 'b0013', 'b0014', 'b0015', 'b0016', 'b0017', 'b0018', 'b0019', 'b0020'], 20, true);
        this.pbody.animations.add('tWalk', [3, 11, 6, 2, 19, 15, 13, 5, 1, 12, 14, 8, 9, 16, 17, 18, 14, 10, 7], 20, true);
        this.pbody.scale.setTo(0.25, 0.25);
        //this.pbody.animations.play('tWalk');

        this.game.camera.follow(this.pbody);

        this.books = this.game.add.group();
        this.books.enableBody = true;
        this.books.physicsBodyType = Phaser.Physics.ARCADE;
        this.books.animations.add('pturn', [0, 1, 2, 3, 4, 5, 6, 7, 8], 20, true);

        this.book1 = this.books.create(48, 48, 'book');
        this.book2 = this.books.create(264, 312, 'book');
        this.book3 = this.books.create(768, 120, 'book');
        this.book4 = this.books.create(96, 384, 'book');
        this.book5 = this.books.create(456, 672, 'book');


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
        this.game.physics.arcade.collide(this.pbody, this.layer);

        if (this.cursors.left.isDown) {
            //this.feet.angle -= 4;
            //this.player.angle -= 4;
            this.pfeet.x -= 2;
            this.pbody.x -= 2;
        }
        else if (this.cursors.right.isDown) {
            //this.feet.angle += 4;
            //this.player.angle += 4;
            this.pfeet.x += 2;
            this.pbody.x += 2;
        }
        if (this.cursors.up.isDown) {
            this.pfeet.y -= 2;
            this.pbody.y -= 2;
            this.feet.animations.play('bWalk');
            this.body.animations.play('tWalk');
        }
        else if (this.cursors.down.isDown) {
            this.pfeet.y += 2;
            this.pbody.y += 2;
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
