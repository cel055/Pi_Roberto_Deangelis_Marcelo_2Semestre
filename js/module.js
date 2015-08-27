/**
 * Created by knash on 15-03-14.
 */

var Module = function(game, key) {
    Phaser.Tilemap.call(this, game, key);
    this.game = game;
    this.tilemap = game.add.tilemap(key);
    this.tilemap.addTilesetImage('tileset_tiled', 'grassLandTileset');
};

Module.prototype = Object.create(Phaser.Tilemap.prototype);
Module.prototype.constructor = Module;

Module.prototype.createLayer = function(args) {
        return this.tilemap.createLayer.apply(this.tilemap, arguments);
    };
Module.prototype.createLayers = function(args) {
        var result = {};
        var key;
        for (var i = 0; i < arguments.length; i++) {
            key = arguments[i];
            result[key] = this.tilemap.createLayer(key);
        }
        return result;
    };

Module.prototype.findObjectsByType = function(type) {
        var self = this;
        var result = [];
        this.tilemap.objects['objetos'].forEach(function(element) {
            if (element.type === type) {
                // Phaser uses top left, Tiled bottom left so we have to adjust the y position
                // also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                // so they might not be placed in the exact pixel position as in Tiled
                element.y -= self.tilemap.tileHeight;
                result.push(element);
            }
        });
        return result;
    };

    Module.prototype.getCollisionSprites = function(layer, group, tileX, tileY) {
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
    };

    Module.prototype.spriteFromObject = function(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        // Copy all properties to the sprite
        sprite.properties = {};
        Object.keys(element.properties).forEach(function(key){
            sprite.properties[key] = element.properties[key];
        });

        return sprite;
    };
    
    Module.prototype.createFromObject = function (name, gid, key, frame, exists, autoCull, CustomClass, adjustY) {
    var group = this.game.world;
    if (typeof exists === 'undefined') {
        exists = true;
    }
    if (typeof autoCull === 'undefined') {
        autoCull = false;
    }
    if (typeof CustomClass === 'undefined') {
        CustomClass = Phaser.Sprite;
    }
    if (typeof adjustY === 'undefined') {
        adjustY = true;
    }

    if (!this.objects[name])
    {
        console.warn('Tilemap.createFromObject: Invalid object name given: ' + name);
        return;
    }

    var sprite;

    for (var i = 0, len = this.objects[name].length; i < len; i++)
    {
        if (this.objects[name][i].gid === gid)
        {
            sprite = new CustomClass(this.game, this.objects[name][i].x, this.objects[name][i].y, key, frame);

            sprite.name = this.objects[name][i].name;
            sprite.visible = this.objects[name][i].visible;
            sprite.autoCull = autoCull;
            sprite.exists = exists;

            if (this.objects[name][i].rotation)
            {
                sprite.angle = this.objects[name][i].rotation;
            }

            if (adjustY)
            {
                sprite.y -= sprite.height;
            }

            group.add(sprite);
            return sprite;
        }
    }
}