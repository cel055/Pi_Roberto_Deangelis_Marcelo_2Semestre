var Calciumtrice = Calciumtrice || {};

Calciumtrice.Fase_02 = function () {};

Calciumtrice.Fase_02.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.mapa = new TileMap(this.game, "fase_02");
        
        this.mapa.addTilesetImage("tileset_tiled", "grassLandTileset");

        this.layerGround = this.mapa.createLayer("ground");
        this.layerDetails = this.mapa.createLayer("details");
        this.layerWalls = this.mapa.createLayer("walls");
        
        this.layerGround.resizeWorld();
        
        this.mapa.setCollisionBetween(1, 1000, true, 'walls');
        
        this.player = this.mapa.createFromObject('itens', 15, 'heroi', 0, true, true, Jogador);
        this.player.cria(this.layerWalls);
        this.camera.follow(this.player);
        
        this.porta = this.mapa.createFromObject('itens', 16, 'heroi', 0, true, true);
        this.porta.enableBody = true;
        this.game.physics.arcade.enable(this.porta);
        
        this.game.world.bringToTop(this.layerDetails);
    },
    update: function () {
        this.game.physics.arcade.collide(this.player.shadow, this.layerWalls);
        this.game.physics.arcade.overlap(this.player.shadow, this.porta, this.proximaFase);
        
    },
    proximaFase: function(){
        Calciumtrice.game.state.start('fase_03');
        
    }
};