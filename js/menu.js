var Calciumtrice = Calciumtrice || {};

Calciumtrice.Menu = function(){};

Calciumtrice.Menu.prototype = {

create: function(){
        this.mundoX = window.innerWidth/1000;
        this.mundoY = window.innerHeight/1000;
        this.button = this.add.sprite(this.game.width / 2, this.game.height / 2, "warrior");
        this.button.anchor.set(0.5);
        this.button.inputEnabled = true;
        this.button.input.useHandCursor = true;
        this.button.animations.add('walk', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 9,true);
        this.button.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9,true);
        this.button.animations.add('atack', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 9, true);
        this.button.scale.setTo(2,2);
        Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
    },
    update: function(){
        if(this.button.input.pointerTimeDown()){
            this.button.animations.play('atack');
            this.time.events.add(Phaser.Timer.SECOND*1.2, function(){
                this.state.start('fase_01');   
            }, this);
        }
        else if(this.button.input.pointerOver()){
            this.button.animations.play('walk');
        } 
        else{            
            this.button.animations.play('idle');    
        }
    }
}