var Jogador = function (_game, _x, _y, _key, _frame) {
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    this.controle;
    this.game = _game;
    this.shadow;
};

Jogador.prototype = Object.create(Phaser.Sprite.prototype);
Jogador.prototype.constructor = Jogador;

Jogador.prototype.cria = function () {
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.anchor.setTo(0.5, 1);
    this.game.camera.follow(this);
    this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 14, true);
    this.animations.add('walk', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 24, true);
    this.animations.add('atack', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 24, false);
    this.animations.add('dead', [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 24, true);

    this.shadow = this.game.add.sprite(this.position.x, this.position.y, 'tilesetSpriteSheet', 960);
    this.game.physics.arcade.enable(this.shadow);
    this.shadow.alpha = 0.5;
    this.shadow.anchor.setTo(0.5, 1);
    this.controle = this.game.input.keyboard.createCursorKeys();
};

Jogador.prototype.update = function () {
    this.shadow.body.velocity.y = 0;
    this.shadow.body.velocity.x = 0;
    this.position.setTo(this.shadow.position.x, this.shadow.position.y);
    
    if (this.controle.left.isDown) {
        this.shadow.body.velocity.x -= 50;
        this.scale.x = -1;
        this.animations.play('walk');
    }
    else if (this.controle.right.isDown) {
        this.shadow.body.velocity.x += 50;
        this.scale.x = 1;
        this.animations.play('walk');
    }
    else if (this.controle.down.isDown) {
        this.shadow.body.velocity.y += 50;
        this.animations.play('walk');
    }
    else if (this.controle.up.isDown) {
        this.shadow.body.velocity.y -= 50;
        this.animations.play('walk');
    }
    else {
        this.animations.play('idle');
    }
};