function Jogador(){
        this.jogadores = this.game.add.group();
       ,
      
var Calciumtrice = Calciumtrice || {};

Calciumtrice.Jogador = function(){};

Calciumtrice.Jogador.prototype = {

    create: function(){
        this.jogadores.enableBody = true;
        this.mapa.createFromObjects('itens', 961, 'warrior', 0, true, true, this.jogadores);
        this.jogadores.forEach(function(element){
            element.enableBody = true;
            element.anchor.setTo(0.5, 0.5);
            this.game.camera.follow(element);
            element.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 14,true);
            element.animations.add('walk', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 24,true);
            element.animations.add('atack', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 24,false);
            element.animations.add('dead', [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 24,true);
            this.criaShadow(element);
//            element.scale.set(2,2);
            this.player = element;
        }, this);
    }
    },
    update: function(){

    }
}