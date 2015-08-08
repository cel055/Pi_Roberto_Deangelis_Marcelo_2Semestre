var Calciumtrice = Calciumtrice || {};

Calciumtrice.Game = function () {};

Calciumtrice.Game.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.mapa = new TileMap(this.game, "mapaJsonTeste");
        
        this.mapa.addTilesetImage("dungeon_tileset_calciumtrice", "tileset-calciumtrice");

        this.layerGround = this.mapa.createLayer("ground");
        this.layerDetails = this.mapa.createLayer("details");
        this.layerWalls = this.mapa.createLayer("walls");

        this.mapa.setCollisionBetween(1, 1000, true, 'walls');
        
        this.criaTorch();
        this.criaChest();
        this.criaGoldBag();
        this.criahealthPotion();
        this.criafire();
        this.criaSwitch();
        this.player = this.mapa.createFromObject('itens', 961, 'warrior', 0, true, true, Jogador);
        this.player.cria();
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
    criaFire: function () {
        this.fire = this.mapa.createFromObject('itens', 961, 'tilesetSpriteSheet', 0, true, true);
        this.fire.animations.add('firing', [974, 975, 976]. 3, true);
    },
    criahealthPotion: function(){
        this.fire = this.mapa.createFromObject('itens', 961, 'warrior', 0, true, true);
    },
    openChest: function () {
        this.chest.frame = 573;
    }
};