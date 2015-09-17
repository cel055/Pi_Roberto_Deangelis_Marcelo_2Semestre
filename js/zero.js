var Calciumtrice = Calciumtrice || {};

Calciumtrice.Zero = function () {};

Calciumtrice.Zero.prototype = {
    create: function () {      
        
        this.btTentarNovamente = this.add.button(200, 500, 'botaoTentarNovamente', this.TentarNovamente, this, 1, 0, 1);
        
        this.mira = this.add.sprite(0, 0, 'mira');
        this.mira.anchor.setTo(0.5);
    },
    update: function () { 
        this.mira.position.setTo(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY);
        
    },
    TentarNovamente: function(){
        this.somZero.stop();
		this.game.state.start('menu');
    }
}