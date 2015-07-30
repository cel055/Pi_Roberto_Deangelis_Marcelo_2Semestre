Bullet = function(game){
    this.game = game;
}
Bullet.prototype = {
    preload: function(){               
        this.game.load.image('bullet', 'assets/purple_ball.png');
    },
    create: function(){
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
    },
    update: function(){
        if (game.input.activePointer.isDown){
            if (game.time.now > nextFire && bullets.countDead() > 0){
                    nextFire = game.time.now + fireRate;
                    var bullet = bullets.getFirstDead();
                    bullet.reset(sprite.x - 8, sprite.y - 8);
                    game.physics.arcade.moveToPointer(bullet, 300);
            }
        }
    },
}