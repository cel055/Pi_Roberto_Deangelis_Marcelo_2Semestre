var TileMap = function (_game, _key, _tileWidth, _tileHeight, _width, _heigth) {
    Phaser.Tilemap.call(this, _game, _key, _tileWidth, _tileHeight, _width, _heigth);
};

TileMap.prototype = Object.create(Phaser.Tilemap.prototype);
TileMap.prototype.constructor = TileMap;

TileMap.prototype.createFromObject = function (name, gid, key, frame, exists, autoCull, CustomClass, adjustY) {
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
};

TileMap.prototype.spriteFromObject = function (element, group) {
    var sprite = group.create(element.x, element.y, element.type);
    sprite.properties = {};
    Object.keys(element.properties).forEach(function (key) {
        sprite.properties[key] = element.properties[key];
    });
    return sprite;
};

TileMap.prototype.findObjectsByType = function (type) {
    var result = [];
    this.objects['objetos'].forEach(function (element) {
        if (element.type === type) {
            // Phaser uses top left, Tiled bottom left so we have to adjust the y position
            // also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            // so they might not be placed in the exact pixel position as in Tiled
            element.y -= this.tileHeight;
            result.push(element);
        }
    }, this);
    return result;
};