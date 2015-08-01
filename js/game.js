var Calciumtrice = Calciumtrice || {};

Calciumtrice.Game = function () {};

Calciumtrice.Game.prototype = {
    create: function () {
        this.mundoX = window.innerWidth / 1000;
        this.mundoY = window.innerHeight / 1000;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.mapa = new TileMap(this.game, "mapaJson");
        
        this.mapa.addTilesetImage("dungeon_tileset_calciumtrice", "tileset");

        this.layerGround = this.mapa.createLayer("ground");
        this.layerDetails = this.mapa.createLayer("details");
        this.layerWalls = this.mapa.createLayer("walls");

        this.mapa.setCollisionBetween(1, 1000, true, 'walls');

//        this.controle = this.game.input.keyboard.createCursorKeys();
        
        this.criaTorch();
        this.criaChest();
        this.player = this.mapa.createFromObject('itens', 961, 'warrior', 0, true, true, Jogador);
        this.player.cria();
    },
    update: function () {
        this.game.physics.arcade.collide(this.player.shadow, this.layerWalls);
//        this.game.physics.arcade.collide(this.shadow, this.chests, this.openChest);

        this.game.debug.bodyInfo(this.player, 32, 32);
        this.game.debug.body(this.player);
    },
    pauseFunction: function () {
        this.player.animations.play('atack');
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
    openChest: function () {
        this.chest.animations.play('open');
    }
};