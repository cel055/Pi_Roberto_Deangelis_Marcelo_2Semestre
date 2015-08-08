/* global Phaser */

var Jogador = function (_game, _x, _y, _key, _frame) {
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    this.controle;
    this.game = _game;
    this.shadow;
};

Jogador.prototype = Object.create(Phaser.Sprite.prototype);
Jogador.prototype.constructor = Jogador;

Jogador.prototype.velocidade = 50;

Jogador.prototype.tecla_Norte;
Jogador.prototype.tecla_Sul;
Jogador.prototype.tecla_Leste;
Jogador.prototype.tecla_Oeste;

Jogador.prototype.norte = [17, 16, 15, 14, 13, 12, 11, 10, 9];
Jogador.prototype.sul = [62, 61, 60, 59, 58, 57, 56, 55, 54];
Jogador.prototype.leste = [35, 34, 33, 32, 31, 30, 29, 28, 27];
Jogador.prototype.oeste = [44, 43, 42, 41, 40, 39, 38, 37, 36];
Jogador.prototype.noroeste = [8, 7, 6, 5, 4, 3, 2, 1, 0];
Jogador.prototype.nordeste = [26, 25, 24, 23, 22, 21, 20, 19, 18];
Jogador.prototype.suldoeste = [53, 52, 51, 50, 49, 48, 47, 46, 45];
Jogador.prototype.suldeste = [71, 70, 69, 68, 67, 66, 65, 64, 63];
Jogador.prototype.direcoes = ["N", "S", "L", "O", "NO", "NE", "SO", "SE"];

Jogador.prototype.cria = function () {
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.anchor.setTo(0.5, 1);
    this.game.camera.follow(this);
    this.criaAnimacoes();

    if (!this.tecla_Norte || !this.tecla_Sul || !this.tecla_Leste || !this.tecla_Oeste) {
        this.criaBotoes();
    }

    this.criaSombra();
};

Jogador.prototype.criaAnimacoes = function () {
    this.animations.add('N', this.norte, 10, true);
    this.animations.add('S', this.sul, 10, true);
    this.animations.add('L', this.leste, 10, true);
    this.animations.add('O', this.oeste, 10, true);
    this.animations.add('NO', this.noroeste, 10, true);
    this.animations.add('NE', this.nordeste, 10, true);
    this.animations.add('SO', this.suldoeste, 10, true);
    this.animations.add('SE', this.suldeste, 10, true);

    this.animations.add('rev_N', this.norte.reverse(), 10, true);
    this.animations.add('rev_S', this.sul.reverse(), 10, true);
    this.animations.add('rev_L', this.leste.reverse(), 10, true);
    this.animations.add('rev_O', this.oeste.reverse(), 10, true);
    this.animations.add('rev_NO', this.noroeste.reverse(), 10, true);
    this.animations.add('rev_NE', this.nordeste.reverse(), 10, true);
    this.animations.add('rev_SO', this.suldoeste.reverse(), 10, true);
    this.animations.add('rev_SE', this.suldeste.reverse(), 10, true);
};

Jogador.prototype.criaBotoes = function () {
    Jogador.prototype.tecla_Norte = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    Jogador.prototype.tecla_Sul = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    Jogador.prototype.tecla_Leste = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    Jogador.prototype.tecla_Oeste = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
};

Jogador.prototype.criaSombra = function () {
    this.shadow = this.game.add.sprite(this.position.x, this.position.y, 'tilesetSpriteSheet', 960);
    this.game.physics.arcade.enable(this.shadow);
    this.shadow.alpha = 0.5;
    this.shadow.anchor.setTo(0.5, 1);
};

Jogador.prototype.update = function () {
    this.shadow.body.velocity.y = 0;
    this.shadow.body.velocity.x = 0;

    var direcao = this.direcaoJogador();

    if (this.tecla_Norte.isUp && this.tecla_Sul.isUp && this.tecla_Leste.isUp && this.tecla_Oeste.isUp) {
        this.jogadorGira(direcao);
    } else {
        this.jogadorAnda(direcao);
    }
    this.position.setTo(this.shadow.position.x, this.shadow.position.y);
};

Jogador.prototype.direcaoJogador = function () {
    var mouse = this.game.input.mousePointer;
    var angulo = Math.atan2(mouse.y - this.y, mouse.x - this.x) * (180 / Math.PI);
    if (angulo > -112 && angulo < -67) {
        //cima N
        return this.direcoes[0];
    }
    if (angulo > 67 && angulo < 112) {
        //baixo S
        return this.direcoes[1];
    }
    if (angulo > -22 && angulo < 22) {
        //direita L
        return this.direcoes[2];
    }
    if (angulo > 157 || angulo < -157) {
        //esquerda O
        return this.direcoes[3];
    }
    if (angulo > -157 && angulo < -112) {
        //cima esquerda NO
        return this.direcoes[4];
    }
    if (angulo > -67 && angulo < -22) {
        //cima direita NE
        return this.direcoes[5];
    }
    if (angulo > 112 && angulo < 157) {
        //baixo esquerda SO
        return this.direcoes[6];
    }
    //baixao direita SE
    return this.direcoes[7];
};

Jogador.prototype.jogadorGira = function (direcao) {
    switch (direcao) {
        case this.direcoes[0]:
            this.frame = 17;
            break;
        case this.direcoes[1]:
            this.frame = 62;
            break;
        case this.direcoes[2]:
            this.frame = 35;
            break;
        case this.direcoes[3]:
            this.frame = 44;
            break;
        case this.direcoes[4]:
            this.frame = 8;
            break;
        case this.direcoes[5]:
            this.frame = 24;
            break;
        case this.direcoes[6]:
            this.frame = 52;
            break;
        case this.direcoes[7]:
            this.frame = 71;
            break;
    }
};

Jogador.prototype.jogadorAnda = function (direcao) {
    if (this.tecla_Norte.isDown) {
        this.shadow.body.velocity.y -= this.velocidade;
        if (direcao == this.direcoes[0]) { // N Up
            this.animations.play('N');
        } else if (direcao == this.direcoes[1]) { // S Down
            this.animations.play('rev_S');
        } else if (direcao == this.direcoes[3]) { // W Left
            this.animations.play('O');
        } else if (direcao == this.direcoes[2]) { // E Right
            this.animations.play('L');
        } else if (direcao == this.direcoes[4]) { // NW Up Left
            this.animations.play('NO');
        } else if (direcao == this.direcoes[5]) { // NE Up Right
            this.animations.play('NE');
        } else if (direcao == this.direcoes[6]) { // SW Down Left
            this.animations.play('SO');
        } else if (direcao == this.direcoes[7]) { // SE Down Right
            this.animations.play('SE');
        }

    } else if (this.tecla_Sul.isDown) {
        this.shadow.body.velocity.y += this.velocidade;
        if (direcao == this.direcoes[1]) { // N
            this.animations.play('rev_N');
        } else if (direcao == this.direcoes[3]) { // S
            this.animations.play('S');
        } else if (direcao == this.direcoes[0]) { // W
            this.animations.play('O');
        } else if (direcao == this.direcoes[2]) { // E
            this.animations.play('L');
        } else if (direcao == this.direcoes[4]) { // NW Up Left
            this.animations.play('rev_NO');
        } else if (direcao == this.direcoes[5]) { // NE Up Right
            this.animations.play('rev_NE');
        } else if (direcao == this.direcoes[6]) { // SW Down Left
            this.animations.play('SO');
        } else if (direcao == this.direcoes[7]) { // SE Down Right
            this.animations.play('SE');
        }

    }

    if (this.tecla_Oeste.isDown) {
        this.shadow.body.velocity.x -= this.velocidade;
        if (direcao == this.direcoes[0]) { // W
            this.animations.play('O');
        } else if (direcao == this.direcoes[2]) { // E
            this.animations.play('rev_L');
        } else if (direcao == this.direcoes[1]) { // N
            this.animations.play('N');
        } else if (direcao == this.direcoes[3]) { // S
            this.animations.play('S');
        } else if (direcao == this.direcoes[4]) { // NW Up Left
            this.animations.play('NO');
        } else if (direcao == this.direcoes[5]) { // NE Up Right
            this.animations.play('rev_NE');
        } else if (direcao == this.direcoes[6]) { // SW Down Left
            this.animations.play('SO');
        } else if (direcao == this.direcoes[7]) { // SE Down Right
            this.animations.play('SE');
        }

    } else if (this.tecla_Leste.isDown) {
        this.shadow.body.velocity.x += this.velocidade;
        if (direcao == this.direcoes[0]) { // W
            this.animations.play('rev_O');
        } else if (direcao == this.direcoes[2]) { // E
            this.animations.play('L');
        } else if (direcao == this.direcoes[1]) { // N
            this.animations.play('N');
        } else if (direcao == this.direcoes[3]) { // S
            this.animations.play('S');
        } else if (direcao == this.direcoes[4]) { // NW Up Left
            this.animations.play('rev_NO');
        } else if (direcao == this.direcoes[5]) { // NE Up Right
            this.animations.play('NE');
        } else if (direcao == this.direcoes[6]) { // SW Down Left
            this.animations.play('rev_SO');
        } else if (direcao == this.direcoes[7]) { // SE Down Right
            this.animations.play('SE');
        }

    }
};