var Calciumtrice = Calciumtrice || {};

Calciumtrice.Boot = function(){};

Calciumtrice.Boot.prototype = {
    preload: function(){
        this.load.image('loading', 'assets/sprites/loading.png');
    },
    create: function(){
//        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        this.scale.setMinMax(240, 170, 2880, 1920);
//        this.scale.pageAlignHorizontally = true;
//        this.scale.pageAlignVertically = true;
//        //screen size will be set automatically
//        this.scale.setScreenSize(true);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.state.start('preload');
    }
};