var Calciumtrice = Calciumtrice || {};

Calciumtrice.Preload = function(){};

Calciumtrice.Preload.prototype ={
    preload: function(){
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading');
        this.preloadBar.anchor.setTo(0,5);
        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.tilemap('fase_01', 'assets/tilemap/fase_01.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('fase_02', 'assets/tilemap/fase_02.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('fase_03', 'assets/tilemap/fase_03.json', null, Phaser.Tilemap.TILED_JSON);        
        
        this.load.tilemap('mapaGlobalJSON', 'assets/tilemap/mapacomCasa.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('casaJSON', 'assets/tilemap/casa.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('pathTeste', 'assets/tilemap/mapaFinderTeste.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('testeMapZumbiPath', 'assets/tilemap/mapaComVariosZombies.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('mapaSimples', 'assets/tilemap/mapa01.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.load.image('grassLandTileset', 'assets/tileset/grassland.png');
        this.load.image('porta', 'assets/sprites/porta.png');
        this.load.image('fundoMenu', 'assets/sprites/fundo.png');
        this.load.spritesheet('heroi', 'assets/sprites/char.png', 55.5, 64.8);
        this.load.spritesheet('tilesetSpriteSheet', 'assets/sprites/dungeon_tileset_calciumtrice.png', 16, 16);
        this.load.spritesheet('tiro', 'assets/sprites/bala.png', 14, 8);
        this.load.spritesheet('botaoMenu', 'assets/sprites/botao.png', 454, 58);
        this.load.spritesheet('toon', 'assets/sprites/toon.png', 96, 96);
        
        this.load.audio('somMenu', 'assets/som/somMenu.ogg');
        this.load.audio('somZumbi', 'assets/som/sonsZumbi.ogg');
        
        this.load.image('mira', 'assets/sprites/aim.png');
        
        this.game.time.advancedTiming = true;
        
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
    create: function(){
        this.state.start('menu');
    }
};