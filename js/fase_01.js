var Calciumtrice = Calciumtrice || {};

Calciumtrice.Fase_01 = function () {};

Calciumtrice.Fase_01.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.easystar = new EasyStar.js();
        
        this.mapa = new TileMap(this.game, "fase_01");
        
        this.mapa.addTilesetImage("tileset_tiled", "grassLandTileset");

        this.layerGround = this.mapa.createLayer("ground");
        this.layerDetails = this.mapa.createLayer("details");
        this.layerWalls = this.mapa.createLayer("walls");
        
        this.layerGround.resizeWorld();
        
        this.mapa.setCollisionBetween(1, 1000, true, 'walls');
        
        this.mapaAtual = convert((this.mapa.layer).data);
        
        this.easystar.setGrid(this.mapaAtual);
        
        this.easystar.setAcceptableTiles([1]); 
        
        this.easystar.enableDiagonals(); 
        
        
        this.player = this.mapa.createFromObject('itens', 15, 'heroi', 0, true, true, Jogador);
        this.player.cria(this.layerWalls, this.layerGround);
        this.camera.follow(this.player);
        
        
        this.inimigo = this.mapa.createFromObject('itens', 16, 'heroi', 0, true, true, Inimigo);
        this.inimigo.cria();
        this.inimigo.mask = this.player.luz;
        
//        this.porta = this.mapa.createFromObject('itens', 16, 'heroi', 0, true, true);
//        this.porta.enableBody = true;
//        this.game.physics.arcade.enable(this.porta);
        
        this.game.world.bringToTop(this.layerDetails);
    },
    update: function () {
        this.game.physics.arcade.collide(this.player.shadow, this.layerWalls);
        this.game.physics.arcade.collide(this.inimigo.shadow, this.layerWalls);
        this.game.physics.arcade.collide(this.player.shadow, this.inimigo.shadow);
        this.game.physics.arcade.overlap(this.player.shadow, this.porta, this.proximaFase);
        this.inimigo.pathFind(this.easystar, this.layerGround, this.player.shadow);
        
    },
    proximaFase: function(){
        Calciumtrice.game.state.start('fase_02');
    }
};

function convert(_obj){
    var elemento = [];
    for(var i = 0; i < _obj.length; i++){
        
        elemento[i] = [];
        for(var j = 0; j < _obj[i].length; j++){
            elemento[i][j] = (_obj[i][j]).index;
        }
    }
    return elemento;
}