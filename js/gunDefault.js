GunDefault = function(game, pente, cadencia, player){
    this.game = game;
    this.pente = pente;
    this.cadencia = cadencia;
    this.player = player;
}
GunDefault.prototype = {
    create: function(){
        this.bullets = this.add.group();
        this.bullets.enableBody = true;        
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.bullets.createMultiple(this.pente, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
    },
    update: function(){
        if (game.input.activePointer.isDown){
            this.fire();
        }
    },
    fire: function(){
        if(this.game.time.now > this.cadencia){
            this.cadencia = this.game.time.now;
            
            var bullet = this.bullets[this.bullets.length];
            bullet.body.position.x = player.body.position.x
        }
    }
}