/**
 * Created by knash on 15-03-15.
 */

 var Door = function(game, sprite) {
    this.game = game;
    this.sprite = sprite;
    this.id = sprite.properties.id;
    // The percent this door is open, [0, 1]
    this.delta = 0;
    this.estado = false;

    this.game.physics.arcade.enable(this.sprite);

    // Doors are 1.5 tiles high, so we need to move it down half a tile to align it.
//    this.sprite.position.y += 16;

    // Adjust the hit box to have a "slider" for activation
    this.sprite.body.setSize(32, 64, 0, 16);

};

Door.init = function(game) {
//    Door.sound_open = game.add.audio('doorOpen_1');
//    Door.sound_close = game.add.audio('doorClose_4');
};

Door.prototype = {
    isOpen: function() {
        return this.delta !== 0;
    },

    overlapTrigger: function(player) {
        var wasOpen = this.isOpen();

        // Calculate the position.
        //aqui ele pega os valores x y do player e da porta
        var cX = this.sprite.x + this.sprite.width / 2;
        var cY = this.sprite.y + 40;
        var pX = player.x + player.width / 2;
        var pY = player.y + (player.height * 3)/4;
        //aqui é um if ternario se o y do player for maior que o da porta (significa que ele esta dentro da casa)signum vira -1
        var signum = cY < pY ? -1 : 1;
        //retorna a raiz quadrada 
        var dist = Math.sqrt((cX - pX)*(cX - pX) + (cY - pY)*(cY - pY));

        var alpha = 0.5;
        if (signum < 0) {
            //aqui retorna o numerio maior
            alpha = Math.max(0, alpha - dist / 24)
        } else {
            //aqui retorna o numerio menor
            alpha = Math.min(1, alpha + dist / 24);
        }
        console.log(alpha);
        this.delta = alpha;
        this.sprite.renderable = !this.isOpen();

        var isOpen = this.isOpen();
//        if (wasOpen !== isOpen) {
//            if (wasOpen) {
//                Door.sound_close.play();
//            } else {
//                Door.sound_open.play();
//            }
//        }
    }
};


 
//        if(door.estado){
//            door.estado = false;
//            door.delta = 1;
//        }else{
//            door.delta = 0;            
//            door.estado = true;
//        }
