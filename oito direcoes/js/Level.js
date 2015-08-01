Level = function(game) {
	this.game = game;
	this.map = null;
	this.tile = null;
};

Level.prototype = {
	preload: function() {
		//this.game.load.tilemap('mainLand', 'mainLand.json', null, Phaser.Tilemap.TILED_JSON);
		//this.game.load.image('tileset', 'grassland.png');
	},
	create: function() {
		//map = game.add.tilemap('mainLand');
		//map.addTilesetImage('tileset');
		//map.setCollisionBetween(1, 12);
		//layer = map.createLayer('Camada de Tiles 1');
		//layer.resizeWorld();

	},
	update: function() {

	}

};
