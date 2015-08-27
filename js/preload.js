var Calciumtrice = Calciumtrice || {};

Calciumtrice.Preload = function(){};

Calciumtrice.Preload.prototype ={
    preload: function(){
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading');
        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.tilemap('fase_01', 'assets/tilemap/fase_01.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('fase_02', 'assets/tilemap/fase_02.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('fase_03', 'assets/tilemap/fase_03.json', null, Phaser.Tilemap.TILED_JSON);        
        
        this.load.tilemap('mapaGlobalJSON', 'assets/tilemap/mapacomCasa.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('casaJSON', 'assets/tilemap/casa.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.load.image('grassLandTileset', 'assets/tileset/grassland.png');
        this.load.spritesheet('heroi', 'assets/sprites/char.png', 55.5, 64.8);
        this.load.spritesheet('tiro', 'assets/sprites/bala.png', 14, 8);
        this.load.spritesheet('botaoExemplo', 'assets/sprites/button_sprite_sheet.png', 193, 71);
    },
    create: function(){
        this.state.start('menu');
    }
};