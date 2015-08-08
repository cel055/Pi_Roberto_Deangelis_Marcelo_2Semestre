var Calciumtrice = Calciumtrice || {};

Calciumtrice.Preload = function(){};

Calciumtrice.Preload.prototype ={
    preload: function(){
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading');
        this.load.setPreloadSprite(this.preloadBar);
        this.load.tilemap('mapaJson', 'assets/tilemap/Calciumtrice-eggs0.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset', 'assets/tileset/dungeon_tileset_calciumtrice.png');
        this.load.spritesheet('tilesetSpriteSheet', 'assets/tileset/dungeon_tileset_calciumtrice.png', 16, 16);
        this.load.spritesheet('warrior', 'assets/sprites/warrior_calciumtrice.png', 32, 32);
        this.load.spritesheet('heroi', 'assets/sprites/char.png', 55.5, 64.8);
    },
    create: function(){
        this.state.start('menu');
    }
};