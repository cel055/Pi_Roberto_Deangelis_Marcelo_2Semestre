/**
 * Created by knash on 15-03-12.
 */

// Setup our namespaces and resource lists.
RPG = {};
RPG.State = {};
RPG.Map = {};
RPG.Map.Object = {};

RPG.Map.MAPS = [
    // Overworld maps
    'home_village_f0',

    // Modules used in maps
    'house0_f0'
];

RPG.State.Startup = function(game) {};
RPG.State.Startup.prototype = {
    preload: function() {
        // Load our "loading" images
        this.load.image('loading_text', 'res/img/loading_text.png');
        this.load.image('loading_bar_bg', 'res/img/loading_bar_bg.png');
        this.load.image('loading_bar', 'res/img/loading_bar.png');
        this.load.image('loading_bar_fg', 'res/img/loading_bar_fg.png');

        // Load the json maps, so we can load the images in the next steps.
        var map;
        for (var i = 0; i < RPG.Map.MAPS.length; i++) {
            map = RPG.Map.MAPS[i];
            this.load.tilemap(map, 'res/maps/' + map + '.json', null, Phaser.Tilemap.TILED_JSON);
        }
    },

    create: function() {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.state.start('preloader');
    }
};