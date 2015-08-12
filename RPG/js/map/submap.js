/**
 * Created by knash on 15-03-14.
 */

// x, y are tile coords
RPG.Map.SubMap = function(module, tileX, tileY) {
    this.module = module;
    this.tileX = tileX || 0;
    this.tileY = tileY || 0;

    this.tileLayers = this.module.createLayers(
        'floor', 'indoors0', 'indoors1', 'outdoors0', 'outdoors1'
    );

    // We need to be able to position these.
    var layer;
    for (var key in this.tileLayers) {
        if (this.tileLayers.hasOwnProperty(key)) {
            layer = this.tileLayers[key];
            layer.fixedToCamera = false;
            layer.scrollFactorX = 0;
            layer.scrollFactorY = 0;
            layer.position.set(this.tileX*32, this.tileY*32);
        }
    }
};

RPG.Map.SubMap.prototype = {
    setPosition: function(x, y) {
        var layer;
        for (var key in this.tileLayers) {
            if (this.tileLayers.hasOwnProperty(key)) {
                layer = this.tileLayers[key];
                layer.position.set(x*32, y*32);
            }
        }
    },

    getAlpha: function(layer) {
        return this.tileLayers[layer].alpha;
    },

    setIndoorAlpha: function(alpha) {
        this.tileLayers['floor'].alpha = alpha;
        this.tileLayers['indoors0'].alpha = alpha;
        this.tileLayers['indoors1'].alpha = alpha;
    },

    setOutdoorAlpha: function(alpha) {
        this.tileLayers['outdoors0'].alpha = alpha;
        this.tileLayers['outdoors1'].alpha = alpha;
    }
};
