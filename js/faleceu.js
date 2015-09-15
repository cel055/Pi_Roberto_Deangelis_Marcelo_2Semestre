var Calciumtrice = Calciumtrice || {};

Calciumtrice.Faleceu = function () {};

Calciumtrice.Faleceu.prototype = {
    create: function () {
        var telaFimDeJogo = this.game.add.sprite(0, 0, "faleceu");
        this.somFaleceu = this.game.add.audio('somFaleceu');
        this.somFaleceu.volume = 0.4;
        this.somFaleceu.play();
        this.somFaleceu.loopFull();        
        
        this.btTentarNovamente = this.add.button(200, 500, 'botaoTentarNovamente', this.TentarNovamente, this, 1, 0, 1);
        
        this.mira = this.add.sprite(0, 0, 'mira');
        this.mira.anchor.setTo(0.5);
    },
    update: function () { 
        this.mira.position.setTo(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY);
    },
    TentarNovamente: function(){
        this.game.state.start(getFase());
        this.somFaleceu.stop();
    }
}