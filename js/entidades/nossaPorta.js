var Porta = function (_game, _x, _y, _key, _frame, _layer) {
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    this.game = _game;
    this.layer = _layer;
    this.estaAberto = false;
    this.direcao = this.properties.direcao ? this.properties.direcao.toUpperCase() : "S";
    this.sound_open = this.game.add.audio('somPortaA');
    this.sound_close = this.game.add.audio('somPortaF');
};

Porta.prototype.overlapPorta = function (_personagem) {

    if (this.estaAberto) {
        this.estaAberto = false;
        this.layer.alpha = 0;
    }else{
        this.estaAberto = true;
        this.layer.alpha = 1;
    }
};

Porta.prototype = Object.create(Phaser.Sprite.prototype);
Porta.prototype.constructor = Porta;
