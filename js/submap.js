/**
 * Created by knash on 15-03-14.
 */

// x, y are tile coords
SubMap = function(module, tileX, tileY) {
    this.module = module;
    this.tileX = tileX || 0;
    this.tileY = tileY || 0;

    this.tileLayers = this.module.createLayers('chao', 'paredes', 'ladoDeFora');

    // We need to be able to position these.
    var layer;
    for (var key in this.tileLayers) {
        if (this.tileLayers.hasOwnProperty(key)) {
            layer = this.tileLayers[key];
            layer.fixedToCamera = false;
            //Speed at which this layer scrolls horizontally, relative to the camera 
            //(e.g. scrollFactorX of 0.5 scrolls half as quickly as the 'normal' camera-locked layers do).
            layer.scrollFactorX = 0;
            layer.scrollFactorY = 0;
            layer.position.set(this.tileX*32, this.tileY*32);
        }
    }
};

SubMap.prototype = {
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
        this.tileLayers['chao'].alpha = alpha;
        this.tileLayers['paredes'].alpha = alpha;
    },

    setOutdoorAlpha: function(alpha) {
        this.tileLayers['ladoDeFora'].alpha = alpha;
    }
};
