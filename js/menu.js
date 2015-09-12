var Calciumtrice = Calciumtrice || {};

Calciumtrice.Menu = function () {
};

Calciumtrice.Menu.prototype = {
    create: function () {
        this.somMenu = this.game.add.audio('somMenu', undefined, undefined, 0.2);
        this.somMenu.play();
        this.game.add.sprite(0, 0, 'fundoMenu');
        this.btNovoJogo = this.add.button(this.game.world.centerX, this.game.world.centerY + 100, 'botaoMenu', this.novoJogo, this, 1, 0, 1);
        this.btNovoJogo.anchor.set(0.5);
        
        this.btContinuaJogo = this.add.button(this.game.world.centerX, this.game.world.centerY + 180, 'botaoMenu', this.continuaJogo, this, 3, 2, 3);
        this.btContinuaJogo.anchor.set(0.5);
        
        this.mira = this.add.sprite(0, 0, 'mira');
        this.mira.anchor.setTo(0.5);
    },
    update: function () {
        this.mira.position.setTo(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY);
    },
    novoJogo: function(){
        this.somMenu.stop();
        this.game.state.start('fase_05');
    },
    continuaJogo: function(){
        this.somMenu.stop();
        
    },
}