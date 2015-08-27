var Calciumtrice = Calciumtrice || {};

Calciumtrice.Menu = function(){};

Calciumtrice.Menu.prototype = {

create: function(){
        this.btNovoJogo = this.add.button(this.game.world.centerX, this.game.world.centerY, 'botaoExemplo', this.novoJogo, this, 2, 1, 0);
        this.btNovoJogo.anchor.set(0.5);
    },
    update: function(){
        
    },
    novoJogo: function(){
        this.game.state.start('mapaDinamico');   
    }
}