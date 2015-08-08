var Calciumtrice = Calciumtrice || {};

Calciumtrice.Game = function () {};

Calciumtrice.Game.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.mapa = new TileMap(this.game, "mapaJsonTeste");
        
        this.mapa.addTilesetImage("tileset-calciumtrice", "tileset");

        this.layerGround = this.mapa.createLayer("ground");
        this.layerDetails = this.mapa.createLayer("details");
        this.layerWalls = this.mapa.createLayer("walls");
        
        this.layerGround.resizeWorld();
        
        this.mapa.setCollisionBetween(1, 1000, true, 'walls');
        
        this.criaTorch();
        this.criaChest();
        this.criaGoldBag();
        this.criahealthPotion();
        this.criafire();
        this.criaSwitch();
        this.player = this.mapa.createFromObject('itens', 961, 'warrior', 0, true, true, Jogador);
        this.player.cria();
        this.camera.follow(this.player);
        this.game.world.bringToTop(this.layerDetails);
    },
    update: function () {
        this.game.physics.arcade.collide(this.player.shadow, this.layerWalls);
        this.game.physics.arcade.collide(this.shadow, this.chests, this.openChest);
        
    },
    criaTorch: function () {
        this.torchs = this.game.add.group();
        this.mapa.createFromObjects('itens', 581, 'tilesetSpriteSheet', 580, true, true, this.torchs);//Frames 581, 582, 583
        this.torchs.callAll('animations.add', 'animations', 'firingTorch', [581, 582, 583], 5, true);
        this.torchs.callAll('animations.play', 'animations', 'firingTorch');
    },
    criaChest: function () {
        this.chests = this.game.add.group();
        this.chests.enableBody = true;
        this.mapa.createFromObjects('itens', 573, 'tilesetSpriteSheet', 572, true, true, this.chests);//Frames 572, 573
        this.chests.forEach(function (element) {
            element.enableBody = true;
            element.body.immovable = true;
        }, this);
    },
    criafire: function () {
        this.fire = this.mapa.createFromObject('itens', 975, 'tilesetSpriteSheet', 974, true, true);
        this.fire.animations.add('firing', [974, 975, 976], 3, true);
        this.fire.animations.play('firing');
    },
    criahealthPotion: function(){
        this.fire = this.mapa.createFromObject('itens', 721, 'tilesetSpriteSheet', 720, true, true);
    },
    criaGoldBag: function(){
        this.goldBags = this.game.add.group();
        this.goldBags.enableBody = true;
        this.mapa.createFromObjects('itens', 577, 'tilesetSpriteSheet', 576, true, true, this.goldBags);
        this.goldBags.forEach(function (element) {
            element.enableBody = true;
            element.body.immovable = true;
        }, this);
    },
    criaSwitch: function(){
        this.alavanca = this.mapa.createFromObject('itens', 586, 'tilesetSpriteSheet', 585, true, true);
    },
    openChest: function () {
        this.chest.frame = 573;
    }
};