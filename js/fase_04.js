var Calciumtrice = Calciumtrice || {};

Calciumtrice.MapaComVariosZombies = function () {};

Calciumtrice.MapaComVariosZombies.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.easystar = new EasyStar.js();
        
        this.mapaGlobal = new Module(this.game, 'testeMapZumbiPath');
        
        this.mapaGlobal.addTilesetImage('tileset_tiled', 'grassLandTileset');
        
        this.layerChao = this.mapaGlobal.createLayer('chao');
        this.layerChaoVisivel = this.mapaGlobal.createLayer('chao');
        this.layerChaoVisivel.alpha = 0.5;
        this.layerParede = this.mapaGlobal.createLayer('paredes');
        this.layerChao.resizeWorld();
        
        this.mapaGlobal.setCollisionBetween(1, 1000, true, 'paredes');
        
        this.modules = {};
        this.modules['casa-00'] = new Module(this.game, 'casaJSON');
        
        this.mapaAtual = this.convert((this.mapaGlobal.layer).data);
        
        this.easystar.setGrid(this.mapaAtual);
        
        this.easystar.setAcceptableTiles([7]); 
        
        this.jogador = this.mapaGlobal.createFromObject('objetos', 9, 'heroi', 0, true, true, Jogador);
        this.jogador.cria(this.layerParede);
        
        this.inimigos = this.game.add.group();
        this.inimigosLocal = this.mapaGlobal.findObjectsByType('spawnInimigo');
        for(var i= 0, inimigoLenght = this.inimigosLocal.length; i < inimigoLenght; i++){
            var inimigoI = this.inimigosLocal[i];
            var x = inimigoI.x;
            var y = inimigoI.y;
            var inimigo = new Inimigo(this.game, x, y, 'heroi', 0, this.easystar, this.layerChao, this.jogador.shadow);
            inimigo.cria();
//            inimigo.mask = this.jogador.luz;
            this.inimigos.add(inimigo);
        };
        
        this.layerChao.mask = this.jogador.luz;
        
        this.inimigos.sort();
        
        // Place the subMaps
        this.subMaps = {};
        var subMapLocations = this.mapaGlobal.findObjectsByType('submap');
        var location, tileX, tileY;
        for (var i = 0; i < subMapLocations.length; i++) {
            location = subMapLocations[i];
            tileX = location.x / 32;
            tileY = location.y / 32;
            this.subMaps[location.name] = new SubMap(this.modules[location.properties.sub_map], tileX, tileY);
        }
        this.subMaps['casa'].setIndoorAlpha(0);
        
        this.doorGroup = this.game.add.group();
        var tiledDoors = this.mapaGlobal.findObjectsByType('porta');
        this.doors = {};
        var doorSprite = this.mapaGlobal.spriteFromObject(tiledDoors[0], this.doorGroup);
        Door.init(this.game);
        this.doors[doorSprite.properties.id] = new Door(this.game, doorSprite);
        
        this.vidaJogador = this.game.add.text(100, 450, this.jogador.vida + '/100', { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.vidaJogador.fixedToCamera = true;
        
        this.tirosJogador = this.game.add.text(100, 500, this.jogador.numTiros + '/25', { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.tirosJogador.fixedToCamera = true;
    },
    convert: function(_obj){
        var elemento = [];
        for(var i = 0; i < _obj.length; i++){
            elemento[i] = [];
            for(var j = 0; j < _obj[i].length; j++){
                elemento[i][j] = _obj[i][j].index;
            }
        }
    return elemento;
    },
    doorHandler: function(player, doorSprite) {
        var door = this.doors[doorSprite.properties.id];

        // This will update the doors "delta", telling us how far over the player is.
        door.overlapTrigger(player);
        
//        var alpha = door.delta;
        var alpha = door.delta;
//        this.subMaps[doorSprite.properties.parent].setIndoorAlpha(alpha);
        this.subMaps[doorSprite.properties.parent].setOutdoorAlpha(alpha);
//        this.isOutdoors = !door.isOpen();
        
        
        
    },
    update: function () {   
        this.game.physics.arcade.collide(this.jogador.shadow, this.layerParede);        
        this.game.physics.arcade.collide(this.inimigos, this.layerParede);        
        this.game.physics.arcade.collide(this.inimigos.shadow, this.layerParede);
        this.game.physics.arcade.collide(this.jogador.shadow, this.inimigos.shadow);
        
        this.game.physics.arcade.overlap(this.jogador.shadow, this.doorGroup, this.doorHandler, null, this);
        
//        this.inimigos.forEach(function(inimigo){
//            inimigo.pathFind(this.easystar, this.layerChao, this.jogador.shadow);
//        }, this);
        
        this.inimigos.sort('y', Phaser.Group.SORT_ASCENDING);
    }
}