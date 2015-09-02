var Calciumtrice = Calciumtrice || {};

Calciumtrice.Menu = function () {
};

Calciumtrice.Menu.prototype = {
    create: function () {
        this.btNovoJogo = this.add.button(this.game.world.centerX, this.game.world.centerY, 'botaoExemplo', this.novoJogo, this, 2, 1, 0);
        this.btNovoJogo.anchor.set(0.5);
        this.mira = this.add.sprite(0, 0, 'mira');
        this.mira.anchor.setTo(0.5);
    },
    update: function () {
        this.mira.position.setTo(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY);
    },
    novoJogo: function () {
        this.game.state.start('fase_01');
    }
}