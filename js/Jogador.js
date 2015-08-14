/* global Phaser */

var Jogador = function (_game, _x, _y, _key, _frame) {
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    this.vida = 100;
    this.luz;
    this.shadow;
    this.norte = [17, 16, 15, 14, 13, 12, 11, 10, 9];
    this.sul = [62, 61, 60, 59, 58, 57, 56, 55, 54];
    this.leste = [35, 34, 33, 32, 31, 30, 29, 28, 27];
    this.oeste = [44, 43, 42, 41, 40, 39, 38, 37, 36];
    this.noroeste = [8, 7, 6, 5, 4, 3, 2, 1, 0];
    this.nordeste = [26, 25, 24, 23, 22, 21, 20, 19, 18];
    this.suldoeste = [53, 52, 51, 50, 49, 48, 47, 46, 45];
    this.suldeste = [71, 70, 69, 68, 67, 66, 65, 64, 63];
};

Jogador.prototype = Object.create(Phaser.Sprite.prototype);
Jogador.prototype.constructor = Jogador;

Jogador.prototype.velocidade = 50;
Jogador.prototype.aberturaLuz = Math.PI / 4;
Jogador.prototype.comprimentoLuz = 100;
Jogador.prototype.raiosLuz = 20;

Jogador.prototype.tecla_Norte;
Jogador.prototype.tecla_Sul;
Jogador.prototype.tecla_Leste;
Jogador.prototype.tecla_Oeste;
Jogador.prototype.tecla_Corrida;
Jogador.prototype.mouse;

Jogador.prototype.direcoes = ["N", "S", "L", "O", "NO", "NL", "SO", "SL"];

Jogador.prototype.cria = function () {
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.anchor.setTo(0.5, 1);
    this.game.camera.follow(this);
    this.criaAnimacoes();

    if (!this.tecla_Norte || !this.tecla_Sul || !this.tecla_Leste || !this.tecla_Oeste || !this.mouse) {
        this.criaInputs();
    }

    this.luz = this.game.add.graphics(0, 0);
    this.criaSombra();
};

Jogador.prototype.criaAnimacoes = function () {
    this.animations.add('N', this.norte, 10, true);
    this.animations.add('S', this.sul, 10, true);
    this.animations.add('L', this.leste, 10, true);
    this.animations.add('O', this.oeste, 10, true);
    this.animations.add('NO', this.noroeste, 10, true);
    this.animations.add('NL', this.nordeste, 10, true);
    this.animations.add('SO', this.suldoeste, 10, true);
    this.animations.add('SL', this.suldeste, 10, true);

    this.animations.add('rev_N', this.norte.reverse(), 10, true);
    this.animations.add('rev_S', this.sul.reverse(), 10, true);
    this.animations.add('rev_L', this.leste.reverse(), 10, true);
    this.animations.add('rev_O', this.oeste.reverse(), 10, true);
    this.animations.add('rev_NO', this.noroeste.reverse(), 10, true);
    this.animations.add('rev_NL', this.nordeste.reverse(), 10, true);
    this.animations.add('rev_SO', this.suldoeste.reverse(), 10, true);
    this.animations.add('rev_SL', this.suldeste.reverse(), 10, true);
};

Jogador.prototype.criaInputs = function () {
    Jogador.prototype.tecla_Norte = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    Jogador.prototype.tecla_Sul = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    Jogador.prototype.tecla_Leste = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    Jogador.prototype.tecla_Oeste = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    Jogador.prototype.tecla_Corrida = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    Jogador.prototype.mouse = this.game.input.mousePointer;
};

Jogador.prototype.criaSombra = function () {
    this.shadow = this.game.add.sprite(this.position.x, this.position.y, 'tilesetSpriteSheet', 960);
    this.game.physics.arcade.enable(this.shadow);
    this.shadow.alpha = 0;
    this.shadow.anchor.setTo(0.5, 1);
};

Jogador.prototype.update = function () {
    this.shadow.body.velocity.y = 0;
    this.shadow.body.velocity.x = 0;
    var radianos = Math.atan2(this.y - this.mouse.worldY, this.x - this.mouse.worldX);
    this.desenhaLuz(radianos);
    var direcao = this.direcaoJogador(radianos);
    if (this.tecla_Norte.isUp && this.tecla_Sul.isUp && this.tecla_Leste.isUp && this.tecla_Oeste.isUp) {
        this.jogadorGira(direcao);
    } else {
        this.jogadorAnda(direcao);
    }
    this.position.setTo(this.shadow.position.x, this.shadow.position.y);
};

Jogador.prototype.atira = function (){
    
};

Jogador.prototype.desenhaLuz = function (radianos) {
    this.luz.clear();
    this.luz.lineStyle(1, 0xFFFF00, 1);
//    this.luz.beginFill(0xffff00);
    this.luz.moveTo(this.position.x, this.position.y - this.height / 2);
    for (var i = 0; i < this.raiosLuz; i++) {
        var anguloRaio = radianos - (this.aberturaLuz / 2) + (this.aberturaLuz / this.raiosLuz) * i;
        var ultimoX = this.position.x;
        var ultimoY = this.position.y;
        for (var j = 1; j <= this.comprimentoLuz; j++) {
            var atualX = Math.round(this.position.x - (2 * j) * Math.cos(anguloRaio));
            var atualY = Math.round((this.position.y - this.height / 2) - (2 * j) * Math.sin(anguloRaio));
//                if (wallsBitmap.getPixel32(landingX, landingY) == 0) {
            ultimoX = atualX;
            ultimoY = atualY;
//                }
//                else {
//                    this.luz.lineTo(lastX, lastY);
//                    break;
//                }
        }
        this.luz.lineTo(ultimoX, ultimoY);
    }
    this.luz.lineTo(this.position.x, this.position.y - this.height / 2);
    this.luz.endFill();
};

Jogador.prototype.direcaoJogador = function (radianos) {
    var angulo = radianos * (180 / Math.PI);
    if (angulo > 0) {
        angulo -= 180;
    } else {
        angulo += 180;
    }
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
    var animacao = direcao;
    var invertido = false;
    var velocidadeAtual = this.velocidade;

    if (this.tecla_Corrida.isDown) {
        velocidadeAtual *= 2.5;
    }

    if (this.tecla_Norte.isDown) {
        this.shadow.body.velocity.y -= velocidadeAtual;
        if (direcao.indexOf("S") != -1) {
            animacao = "rev_" + animacao;
            invertido = true;
        }
    } else if (this.tecla_Sul.isDown) {
        this.shadow.body.velocity.y += velocidadeAtual;
        if (direcao.indexOf("N") != -1) {
            animacao = "rev_" + animacao;
            invertido = true;
        }
    }

    if (this.tecla_Oeste.isDown) {
        this.shadow.body.velocity.x -= velocidadeAtual;
        if (direcao.indexOf("L") != -1 && !invertido) {
            animacao = "rev_" + animacao;
        }
    } else if (this.tecla_Leste.isDown) {
        this.shadow.body.velocity.x += velocidadeAtual;
        if (direcao.indexOf("O") != -1 && !invertido) {
            animacao = "rev_" + animacao;
        }
    }
    this.animations.play(animacao);
};

Jogador.prototype.recebeAtaque = function (ataque) {
    this.vida -= ataque;
    if (this.vida <= 0) {
        return false;
    }
    return true;
};