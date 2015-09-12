var Calciumtrice = Calciumtrice || {};

Calciumtrice.Fase_05 = function () {};

Calciumtrice.Fase_05.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);		
		
        this.somFase = this.game.add.audio('somFase');
        this.somFase.volume = 0.1;
        this.somFase.loopFull();
        
        this.easystar = new EasyStar.js();
        
        this.mapaGlobal = new Module(this.game, 'mapaSimples');
        
        this.mapaGlobal.addTilesetImage('tileset_tiled', 'grassLandTileset');
        
        this.layerChao = this.mapaGlobal.createLayer('chao');
        this.layerChaoVisivel = this.mapaGlobal.createLayer('chao');
        this.layerChaoVisivel.alpha = 0.5;
        this.layerParede = this.mapaGlobal.createLayer('paredes');
        
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
        
        this.hud = this.game.add.sprite(50, 400, 'hud');
        this.hud.scale.set(0.6);
        this.hud.fixedToCamera = true;
        
        this.vidaJogador = this.game.add.text(76, 502, '100/100', { font: "24px Arial", fill: "#fdb317", align: "center" });
        this.vidaJogador.fixedToCamera = true;
        
        this.tirosJogador = this.game.add.text(76, 442, '25', { font: "24px Arial", fill: "#fdb317", align: "center" });
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
        this.criaAudio();
        
        this.inimigos = this.game.add.group();
        this.inimigosFacilLocal = this.mapaGlobal.findObjectsByType('spawnInimigoFacil');
        for(var i= 0;i <  this.inimigosFacilLocal.length; i++){
            var inimigoI = this.inimigosFacilLocal[i];
            var x = inimigoI.x;
            var y = inimigoI.y;
            var inimigo = new Fraco(this.game, x, y, 'heroi', 0, this.easystar, this.layerChao, this.jogador.shadow, this.somZumbi);
            inimigo.cria();
            inimigo.mask = this.jogador.luz;
            this.inimigos.add(inimigo);
        };
        
        this.inimigosMedioLocal = this.mapaGlobal.findObjectsByType('spawnInimigoMedio');
        for(var i= 0; i < this.inimigosMedioLocal.length; i++){
            var inimigoI = this.inimigosMedioLocal[i];
            var x = inimigoI.x;
            var y = inimigoI.y;
            var inimigo = new Medio(this.game, x, y, 'heroi', 0, this.easystar, this.layerChao, this.jogador.shadow, this.somZumbi);
            inimigo.cria();
            inimigo.mask = this.jogador.luz;
            this.inimigos.add(inimigo);
        };
        
        this.inimigosDificilLocal = this.mapaGlobal.findObjectsByType('spawnInimigoDificil');
        for(var i= 0; i < this.inimigosDificilLocal.length; i++){
            var inimigoI = this.inimigosDificilLocal[i];
            var x = inimigoI.x;
            var y = inimigoI.y;
            var inimigo = new Forte(this.game, x, y, 'heroi', 0, this.easystar, this.layerChao, this.jogador.shadow, this.somZumbi);
            inimigo.cria();
            inimigo.mask = this.jogador.luz;
            this.inimigos.add(inimigo);
        };
        
        this.layerChao.mask = this.jogador.luz;
        
        this.inimigos.sort();
        
        this.jogador.cria(this.layerParede, this.tirosJogador, this.vidaJogador);
        this.jogador.setGroupInimigos(this.inimigos);
    },
    criaAudio: function(){
      this.somZumbi = this.game.add.audio('somZumbi');
        this.somZumbi.allowMultiple = true;
        this.somZumbi.addMarker('zumbi1', 0, 0.850);
        this.somZumbi.addMarker('zumbi2', 0.850, 1.560);
        this.somZumbi.addMarker('zumbi3', 1.560, 2.143);
        this.somZumbi.addMarker('zumbi4', 2.143, 2.871);
        this.somZumbi.addMarker('zumbi5', 2.871, 3.373);
        this.somZumbi.addMarker('zumbi6', 3.373, 3.912);
        this.somZumbi.addMarker('zumbi7', 3.912, 4.495);
        this.somZumbi.addMarker('zumbi8', 4.495, 5.332);
        this.somZumbi.addMarker('zumbi9', 5.332, 6.205);
        this.somZumbi.addMarker('zumbi10', 6.205, 6.892);
        this.somZumbi.addMarker('zumbi11', 6.892, 7.399);
        this.somZumbi.addMarker('zumbi12', 7.399, 8.186);
        this.somZumbi.addMarker('zumbi13', 8.186, 8.746);
        this.somZumbi.addMarker('zumbi14', 8.746, 9.411);
        this.somZumbi.addMarker('zumbi15', 9.411, 10.289);
        this.somZumbi.addMarker('zumbi16', 10.289, 11.727);
        this.somZumbi.addMarker('zumbi17', 11.727, 13.310);
        this.somZumbi.addMarker('zumbi18', 13.310, 14.413);
        this.somZumbi.addMarker('zumbi19', 14.413, 15.390);
        this.somZumbi.addMarker('zumbi20', 15.390, 16.354);
        this.somZumbi.addMarker('zumbi21', 16.354, 17.434);
        this.somZumbi.addMarker('zumbi22', 17.434, 18.099);
        this.somZumbi.addMarker('zumbi23', 18.099, 18.913);
        this.somZumbi.addMarker('zumbi24', 18.913, 19.244);  
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
    fimDeJogo: function(){
        
    },
    update: function () {   
        var jogadoVivo = (this.jogador.vida == 0)? this.fimDeJogo(): null;
        
        this.game.physics.arcade.collide(this.jogador.shadow, this.layerParede);   
        
        this.game.physics.arcade.collide(this.inimigos.shadow, this.layerParede);        
        this.game.physics.arcade.collide(this.jogador.shadow, this.inimigos.shadow);
        
        this.game.physics.arcade.overlap(this.jogador.shadow, this.doorGroup, this.doorHandler, null, this);
        
//        this.inimigos.forEach(function(inimigo){
//            inimigo.pathFind(this.easystar, this.layerChao, this.jogador.shadow);
//        }, this);
        
        this.inimigos.sort('y', Phaser.Group.SORT_ASCENDING);
    },
    render: function(){
        Calciumtrice.game.debug.text(Calciumtrice.game.time.fps || '--', 2, 14, "#00ff00"); 
    }
}