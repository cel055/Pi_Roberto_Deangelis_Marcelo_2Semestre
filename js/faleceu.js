var Calciumtrice = Calciumtrice || {};

Calciumtrice.Faleceu = function () {};

Calciumtrice.Faleceu.prototype = {
    create: function () {
        var telaFimDeJogo = this.game.add.sprite(0, 0, "faleceu");
        this.somFaleceu = this.game.add.audio('somFaleceu');
        this.somFaleceu.volume = 0.4;
        this.somFaleceu.play();
        this.somFaleceu.loopFull();        
        
        this.btTentarNovamente = this.add.button(700, 300, 'botaoTentarNovamente', this.TentarNovamente, this, 1, 0, 1);
        this.btTentarNovamente.anchor.set(0.5, 0.5);
//        this.add.button(this.game.world.centerX, this.game.world.centerY, 'botaoFaleceu', this.TentarNovamente, this, 1, 0, 1);
        
    },
    update: function () { 
    },
    TentarNovamente: function(){
        this.game.state.start(getFase());
    }
}