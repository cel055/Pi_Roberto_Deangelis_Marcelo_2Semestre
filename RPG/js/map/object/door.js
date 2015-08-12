/**
 * Created by knash on 15-03-15.
 */

RPG.Map.Object.Door = function(game, sprite) {
    this.game = game;
    this.sprite = sprite;
    this.id = sprite.properties.id;
    // The percent this door is open, [0, 1]
    this.delta = 0;

    this.game.physics.arcade.enable(this.sprite);

    // Doors are 1.5 tiles high, so we need to move it down half a tile to align it.
    this.sprite.position.y += 16;

    // Adjust the hit box to have a "slider" for activation
    this.sprite.body.setSize(32, 48, 0, 16);

};

RPG.Map.Object.Door.init = function(game) {
    RPG.Map.Object.Door.sound_open = game.add.audio('doorOpen_1');
    RPG.Map.Object.Door.sound_close = game.add.audio('doorClose_4');
};

RPG.Map.Object.Door.prototype = {
    isOpen: function() {
        return this.delta !== 0;
    },

    overlapTrigger: function(player) {
        var wasOpen = this.isOpen();

        // Calculate the position.
        var cX = this.sprite.x + this.sprite.width / 2;
        var cY = this.sprite.y + 40;
        var pX = player.x + player.width / 2;
        var pY = player.y + (player.height * 3)/4;

        var signum = cY < pY ? -1 : 1;
        var dist = Math.sqrt((cX - pX)*(cX - pX) + (cY - pY)*(cY - pY));

        var alpha = 0.5;
        if (signum < 0) {
            alpha = Math.max(0, alpha - dist / 24)
        } else {
            alpha = Math.min(1, alpha + dist / 24);
        }

        this.delta = alpha;
        this.sprite.renderable = !this.isOpen();

        var isOpen = this.isOpen();
        if (wasOpen !== isOpen) {
            if (wasOpen) {
                RPG.Map.Object.Door.sound_close.play();
            } else {
                RPG.Map.Object.Door.sound_open.play();
            }
        }
    }
};
