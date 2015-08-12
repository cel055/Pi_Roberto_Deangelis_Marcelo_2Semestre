/**
 * Created by knash on 15-03-14.
 */

RPG.Map.Module = function(game, key) {
    this.game = game;
    this.tilemap = game.add.tilemap(key);
    // Add the tilesets
    for (var i = 0; i < this.tilemap.tilesets.length; i++) {
        this.tilemap.addTilesetImage(this.tilemap.tilesets[i].name);
    }
};

RPG.Map.Module.prototype = {
    // Pass through to the Phaser.TileMap createLayer function
    createLayer: function(args) {
        return this.tilemap.createLayer.apply(this.tilemap, arguments);
    },

    // Expects strings for the layer names
    // Returns a map containing the layers
    createLayers: function(args) {
        var result = {};
        var key;
        for (var i = 0; i < arguments.length; i++) {
            key = arguments[i];
            result[key] = this.tilemap.createLayer(key);
        }
        return result;
    },

    // Searches the object layer for a specific type
    findObjectsByType: function(type) {
        var self = this;
        var result = [];
        this.tilemap.objects['objects'].forEach(function(element) {
            if (element.type === type) {
                // Phaser uses top left, Tiled bottom left so we have to adjust the y position
                // also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                // so they might not be placed in the exact pixel position as in Tiled
                element.y -= self.tilemap.tileHeight;
                result.push(element);
            }
        });
        return result;
    },

    getCollisionSprites: function(layer, group, tileX, tileY) {
        tileX = tileX || 0;
        tileY = tileY || 0;

        var self = this;
        var result = [];
        var sprite;
        this.tilemap.objects[layer].forEach(function(element) {
            element.y -= self.tilemap.tileHeight;
            sprite = group.create(element.x + tileX*32, element.y + tileY*32);
            self.game.physics.arcade.enable(sprite);
            sprite.body.setSize(element.properties.width, element.properties.height);
            sprite.body.immovable = true;
            result.push(sprite);
        });
        return result;
    },

    spriteFromObject: function(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        // Copy all properties to the sprite
        sprite.properties = {};
        Object.keys(element.properties).forEach(function(key){
            sprite.properties[key] = element.properties[key];
        });

        return sprite;
    }
};