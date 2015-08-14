var Calciumtrice = Calciumtrice || {};

Calciumtrice.Preload = function(){};

Calciumtrice.Preload.prototype ={
    preload: function(){
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading');
        this.load.setPreloadSprite(this.preloadBar);
        this.load.tilemap('mapaJson', 'assets/tilemap/Calciumtrice-eggs0.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('fase_01', 'assets/tilemap/fase_01.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('fase_02', 'assets/tilemap/fase_02.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('fase_03', 'assets/tilemap/fase_03.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset', 'assets/tileset/dungeon_tileset_calciumtrice.png');
        this.load.image('grassLandTileset', 'assets/tileset/grassland.png');
        this.load.spritesheet('tilesetSpriteSheet', 'assets/tileset/dungeon_tileset_calciumtrice.png', 16, 16);
        this.load.spritesheet('warrior', 'assets/sprites/warrior_calciumtrice.png', 32, 32);
        this.load.spritesheet('heroi', 'assets/sprites/char.png', 55.5, 64.8);
    },
    create: function(){
        this.state.start('menu');
    }
};