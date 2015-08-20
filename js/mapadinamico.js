var Calciumtrice = Calciumtrice || {};

Calciumtrice.Mapa_Dinamico = function () {};

Calciumtrice.Mapa_Dinamico.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.mapaGlobal = new Module(this.game, 'mapaGlobalJSON');
        this.modules = {};
        this.modules['casa-00'] = new Module(this.game, 'casaJSON');
        
//        this.mapaGlobal.addTilesetImage('tileset_tiled', 'grassLandTileset');
        this.layerChao = this.mapaGlobal.createLayer('chao');
        this.layerChao.resizeWorld();
        
        
        this.player = this.mapaGlobal.createFromObject('objetos', 17, 'heroi', 0, true, true, Jogador);
        this.player.cria();
        
        // Place the subMaps
        this.subMaps = {};
		//Roberto - aqui pega tudos os objtetos do tipo submap e adiciona no objeto subMaps
        var subMapLocations = this.mapaGlobal.findObjectsByType('submap');
        var location, tileX, tileY;
        for (var i = 0; i < subMapLocations.length; i++) {
            location = subMapLocations[i];
            tileX = location.x / 32;
            tileY = location.y / 32;
			//linha 12 modules
            this.subMaps[location.name] = new SubMap(this.modules[location.properties.sub_map], tileX, tileY);
        }
        this.subMaps['casa00'].setIndoorAlpha(0);
    },
    update: function () {
       
        
    }
};