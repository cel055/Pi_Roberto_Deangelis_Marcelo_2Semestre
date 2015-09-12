/**
 * Created by knash on 15-03-15.
 */

 var Door = function(game, sprite) {
     
    Phaser.Sprite.call(this, game);
     
    this.game = game;
    this.sprite = sprite;
    this.id = sprite.properties.id;
    // The percent this door is open, [0, 1]
    this.delta = 0;

    this.game.physics.arcade.enable(this.sprite);
     this.sprite.anchor.setTo(0.0, 0.5);
};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

Door.init = function(game) {
    Door.sound_open = game.add.audio('somPortaA');
    Door.sound_close = game.add.audio('somPortaF');
};

Door.prototype.isOpen = function() {
        return this.delta !== 0;
    };

Door.prototype.overlapTrigger = function(player) {
        var wasOpen = this.isOpen();

        var cX = this.sprite.x + this.sprite.width / 2;
        var cY = this.sprite.y + 40;
        var pX = player.x;
        var pY = player.y;
        var signum = cY < pY ? -1 : 1;

    //        var alpha = 0.5;
        if (signum < 0) {
            //aqui retorna o numerio maior
            alpha = 1;
            this.sprite.renderable = true;
        } else {
            //aqui retorna o numerio menor
            alpha = 0;
            this.sprite.renderable = false;
        }
        this.delta = alpha;

        var isOpen = this.isOpen();
            if (wasOpen !== isOpen) {
                if (wasOpen) {
                    Door.sound_close.play();
                } else {
                    Door.sound_open.play();
                }
            }
};
