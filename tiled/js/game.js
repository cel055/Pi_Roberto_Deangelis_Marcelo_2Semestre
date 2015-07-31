var Calciumtrice = Calciumtrice || {};

Calciumtrice.Game = function () {};

Calciumtrice.Game.prototype = {
    create: function () {
        this.mundoX = window.innerWidth / 1000;
        this.mundoY = window.innerHeight / 1000;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
//        this.mapa = this.game.add.tilemap("mapaJson");
        this.mapa = new TileMap(this.game, "mapaJson");
        this.mapa.addTilesetImage("dungeon_tileset_calciumtrice", "tileset");

        this.layerGround = this.mapa.createLayer("ground");
        this.layerDetails = this.mapa.createLayer("details");

//        
//        this.jogadores = this.game.add.group();
//        this.jogadores.push(new Jogador());
        this.layerWalls = this.mapa.createLayer("walls");

//        this.layerGround.position.set(this.game.world.centerX, this.game.world.centerY);
//        this.layerDetails.position.set(this.game.world.centerX, this.game.world.centerY);
//        this.layerWalls.position.set(this.game.world.centerX, this.game.world.centerY);

//        this.layerGround.scale.set(2,2);
//        this.layerWalls.scale.set(2,2);
//        this.layerDetails.scale.set(2,2);

        this.mapa.setCollisionBetween(1, 1000, true, 'walls');

        this.controle = this.game.input.keyboard.createCursorKeys();


        this.criaTorch();
        this.criaChest();
        this.criaJogador();

        this.teclaAtk = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
//        this.game.input.keyboard.addKey(Phaser.Keyboard.);
//        this.game.input.keyboard.addKey(Phaser.Keyboard.);
//        this.game.input.keyboard.addKey(Phaser.Keyboard.);

//        Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
    },
    update: function () {
        this.game.physics.arcade.collide(this.shadow, this.layerWalls);
//        this.game.physics.arcade.collide(this.shadow, this.chests, this.openChest);

        this.player.body.x = this.shadow.body.x;
        this.player.body.y = this.shadow.body.y;

        this.game.debug.bodyInfo(this.player, 32, 32);
        this.game.debug.body(this.player);

        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;
        this.shadow.body.velocity.y = 0;
        this.shadow.body.velocity.x = 0;
//        teclaAtk.onDown.add(pauseFunction, this);

        if (this.controle.left.isDown) {
//            this.player.body.velocity.x -= 50;
            this.shadow.body.velocity.x -= 50;
            this.player.scale.x = -1;
            this.player.animations.play('walk');
        }
        else if (this.controle.right.isDown) {
//            this.player.body.velocity.x+= 50;
            this.shadow.body.velocity.x += 50;
            this.player.scale.x = 1;
            this.player.animations.play('walk');
        }
        else if (this.controle.down.isDown) {
//            this.player.body.velocity.y+= 50;
            this.shadow.body.velocity.y += 50;
            this.player.animations.play('walk');
        }
        else if (this.controle.up.isDown) {
//            this.player.body.velocity.y-= 50;
            this.shadow.body.velocity.y -= 50;
            this.player.animations.play('walk');
        }
        else {
            this.player.animations.play('idle');
        }
//        
    },
    pauseFunction: function () {
        this.player.animations.play('atack');
    },
    criaJogador: function () {
        this.player = this.mapa.createFromObject('itens', 961, 'warrior', 0, true, true);
        this.game.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.anchor.setTo(0.5, 0.5);
        this.game.camera.follow(this.player);
        this.player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 14, true);
        this.player.animations.add('walk', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 24, true);
        this.player.animations.add('atack', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 24, false);
        this.player.animations.add('dead', [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 24, true);
        this.criaShadow(this.player);
    },
    criaTorch: function () {
        this.torchs = this.game.add.group();
        this.mapa.createFromObjects('itens', 581, 'tilesetSpriteSheet', 580, true, true, this.torchs);    //Frames 581, 582, 583 fire
        this.torchs.callAll('animations.add', 'animations', 'firing', [581, 582, 583], 5, true);
        this.torchs.callAll('animations.play', 'animations', 'firing');
//            this.torchs.scale.set(2,2);
    },
    criaChest: function () {
        this.chests = this.game.add.group();
        this.chests.enableBody = true;
        this.mapa.createFromObjects('itens', 573, 'tilesetSpriteSheet', 572, true, true, this.chests);    //Frames 572, 573 open
        this.chests.forEach(function (element) {
            element.enableBody = true;
            element.animations.add('open', [572, 573], 14, false);
//            element.scale.set(2,2);
            this.chest = element;
        }, this);
    },
    criaShadow: function (heroi) {
        this.shadow = this.game.add.sprite(heroi.x, heroi.y, 'tilesetSpriteSheet', 960);
        this.game.physics.arcade.enable(this.shadow);
//        this.shadow.enableBody = true;
        this.shadow.alpha = 0.5;
    },
    openChest: function () {
        this.chest.animations.play('open');
    }
};