var Calciumtrice = Calciumtrice || {};

Calciumtrice.Fase_05 = function () {};

Calciumtrice.Fase_05.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.easystar = new EasyStar.js();
        
        this.mapaGlobal = new Module(this.game, 'mapaSimples');
        
        this.mapaGlobal.addTilesetImage('tileset_tiled', 'grassLandTileset');
        
        this.layerChao = this.mapaGlobal.createLayer('chao');
        this.layerChaoVisivel = this.mapaGlobal.createLayer('chao');
        this.layerChaoVisivel.alpha = 0.5;
        this.layerParede = this.mapaGlobal.createLayer('paredes');
        
//        this.tileLayers = this.mapaGlobal.createLayers('telhadoCasa01', 'telhadoCasa02', 'telhadoCasa03', 'telhadoCasa04');
//        this.layerTelhadoCasa01 = this.mapaGlobal.createLayer('telhadoCasa01');
//        this.layerTelhadoCasa02 = this.mapaGlobal.createLayer('telhadoCasa02');
//        this.layerTelhadoCasa03 = this.mapaGlobal.createLayer('telhadoCasa03');
//        this.layerTelhadoCasa04 = this.mapaGlobal.createLayer('telhadoCasa04');
        
        this.layersTelhados = {};
        this.layersTelhados['telhadoCasa01'] = this.mapaGlobal.createLayer('telhadoCasa01');
        this.layersTelhados['telhadoCasa02'] = this.mapaGlobal.createLayer('telhadoCasa02');
        this.layersTelhados['telhadoCasa03'] = this.mapaGlobal.createLayer('telhadoCasa03');
        this.layersTelhados['telhadoCasa04'] = this.mapaGlobal.createLayer('telhadoCasa04');
        this.layerChao.resizeWorld();
        
        this.mapaGlobal.setCollisionBetween(1, 1000, true, 'paredes');
        
        this.mapaAtual = this.convert((this.mapaGlobal.layer).data);
        
        this.easystar.setGrid(this.mapaAtual);
        
        this.easystar.setAcceptableTiles([7]); 
        
        this.vidaJogador = this.game.add.text(100, 450, '100/100', { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.vidaJogador.fixedToCamera = true;
        
        this.tirosJogador = this.game.add.text(100, 500, '25/25', { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.tirosJogador.fixedToCamera = true;
        
        this.doorGroup = this.game.add.group();
        var tiledDoors = this.mapaGlobal.findObjectsByType('porta');
        this.doors = {};
        for(var i = 0 ; i < tiledDoors.length; i++){
            var doorSprite = this.mapaGlobal.spriteFromObject(tiledDoors[i], this.doorGroup);
            Door.init(this.game);
            this.doors[doorSprite.properties.casa] = new Door(this.game, doorSprite); 
        };
        
        this.jogador = this.mapaGlobal.createFromObject('objetos', 9, 'heroi', 0, true, true, Jogador);
        
        this.inimigos = this.game.add.group();
        this.inimigosLocal = this.mapaGlobal.findObjectsByType('spawnInimigo');
        for(var i= 0, inimigoLenght = this.inimigosLocal.length; i < inimigoLenght; i++){
            var inimigoI = this.inimigosLocal[i];
            var x = inimigoI.x;
            var y = inimigoI.y;
            var inimigo = new Inimigo(this.game, x, y, 'heroi', 0, this.easystar, this.layerChao, this.jogador.shadow);
            inimigo.cria();
            inimigo.mask = this.jogador.luz;
            this.inimigos.add(inimigo);
        };
        
        this.layerChao.mask = this.jogador.luz;
        
        this.inimigos.sort();
        
        this.jogador.cria(this.layerParede, this.tirosJogador, this.vidaJogador);
        this.jogador.setGroupInimigos(this.inimigos);
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
        var door = this.doors[doorSprite.properties.casa];

        // This will update the doors "delta", telling us how far over the player is.
//        door.overlapTrigger(player);
        
//        var alpha = door.delta;
//        var alpha = door.delta;
        var _layer;
        for(var layer in this.layersTelhados){
            if(this.layersTelhados[layer].layer.name == doorSprite.properties.telhado){
//                _layer = this.mapaGlobal.layers[i];
//                _layer.alpha = -1;
                console.log('porta');
                door.overlapTrigger(player);
//                this.mapaGlobal.layers[i].alpha = door.delta;
                this.layersTelhados[layer].alpha = door.delta;
            }
        }
//        this.subMaps[doorSprite.properties.parent].setIndoorAlpha(alpha);
//        this.subMaps[doorSprite.properties.parent].setOutdoorAlpha(alpha);
//        var _layer = this.mapaGlobal.layers[doorSprite.properties.telhado];
        
//        _layer.alpha = alpha;
        
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