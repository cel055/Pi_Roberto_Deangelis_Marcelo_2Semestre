/* global Phaser */

var Jogador = function (_game, _x, _y, _key, _frame) {
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    var self = this;
    this.wallLayers;
    this.linhaVisao = new Phaser.Line();

    this.vida = 100;

    this.mira;
    this.numTiros = 25;
    this.tempoProximoTiro = 0;
    this.carregando = false;
    this.danoTiro = 25;
    this.hudTiro;
    this.hudVida;

    this.tiros;
    this.luz = this.game.add.graphics(0, 0);
    this.shadow;
    
    this.groupInimigos;

    this.norte = [17, 16, 15, 14, 13, 12, 11, 10, 9];
    this.sul = [62, 61, 60, 59, 58, 57, 56, 55, 54];
    this.leste = [35, 34, 33, 32, 31, 30, 29, 28, 27];
    this.oeste = [44, 43, 42, 41, 40, 39, 38, 37, 36];
    this.noroeste = [8, 7, 6, 5, 4, 3, 2, 1, 0];
    this.nordeste = [26, 25, 24, 23, 22, 21, 20, 19, 18];
    this.suldoeste = [53, 52, 51, 50, 49, 48, 47, 46, 45];
    this.suldeste = [71, 70, 69, 68, 67, 66, 65, 64, 63];
    
    
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.anchor.setTo(0.5, 0.8);
    this.game.camera.follow(this);
    this.criaSombra();
};

Jogador.prototype = Object.create(Phaser.Sprite.prototype);
Jogador.prototype.constructor = Jogador;

Jogador.prototype.velocidade = 50;

Jogador.prototype.velocidadeTiro = 1000;
Jogador.prototype.frequenciaTiro = 200;
Jogador.prototype.maxTiros = 50;
Jogador.prototype.tempoRecarregamentoArma = 1;

Jogador.prototype.aberturaLuz = Math.PI * 2;
Jogador.prototype.comprimentoLuz = 75;
Jogador.prototype.raiosLuz = 360;

Jogador.prototype.tecla_Norte;
Jogador.prototype.tecla_Sul;
Jogador.prototype.tecla_Leste;
Jogador.prototype.tecla_Oeste;
Jogador.prototype.tecla_Corrida;
Jogador.prototype.tecla_Recarrega;
Jogador.prototype.mouse;

Jogador.prototype.direcoes = ["N", "S", "L", "O", "NO", "NL", "SO", "SL"];

Jogador.prototype.cria = function (layerOfWall, _hudTiro, _hudVida) {
    this.wallLayers = layerOfWall;
    this.criaAnimacoes();

    if (!this.tecla_Norte || !this.tecla_Sul || !this.tecla_Leste || !this.tecla_Oeste || !this.mouse) {
        this.criaInputs();
    }

    this.criaTiros();
    this.mira = this.game.add.sprite(0, 0, 'mira');
    this.mira.anchor.setTo(0.5);
    this.hudTiro = _hudTiro;
    this.hudVida = _hudVida;
};

Jogador.prototype.criaTiros = function () {
    this.tiros = this.game.add.group();
    this.game.physics.arcade.enable(this.tiros);
    this.tiros.enableBody = true;
    this.tiros.createMultiple(30, "tiro", 0, false);
    this.tiros.forEach(function (sprite) {
        sprite.anchor.setTo(0, 0.5);
        sprite.outOfBoundsKill = true;
        sprite.checkWorldBounds = true;
        sprite.animations.add('inicioTiro');
        sprite.events.onAnimationComplete = function () {
            this.frame = 8;
        };
    }, this);
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
    Jogador.prototype.tecla_Recarrega = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    Jogador.prototype.mouse = this.game.input.mousePointer;
};

Jogador.prototype.criaSombra = function () {
    this.shadow = this.game.add.sprite(this.position.x, this.position.y, 'tilesetSpriteSheet', 960);
    this.game.physics.arcade.enable(this.shadow);
    this.shadow.alpha = 0;
    this.shadow.anchor.setTo(0.5, 1);
    this.shadow.body.immovable = true;
};

Jogador.prototype.setGroupInimigos = function (_groupInimigos){
    this.groupInimigos = _groupInimigos;
};

Jogador.prototype.update = function () {
    var _self = this;
    var mouseX = this.mouse.worldX;
    var mouseY = this.mouse.worldY;
    this.shadow.body.velocity.y = 0;
    this.shadow.body.velocity.x = 0;
    var radianos = Math.atan2(this.y - mouseY, this.x - mouseX);
    this.mira.position.setTo(mouseX, mouseY);
    this.desenhaLuz(radianos);
    var direcao = this.direcaoJogador(radianos);
    if (this.tecla_Recarrega.isDown && !this.carregando) {
        this.recarrega();
    }
    if (this.mouse.isDown) {
        this.atira();
    }
    if (this.tecla_Norte.isDown || this.tecla_Sul.isDown || this.tecla_Leste.isDown || this.tecla_Oeste.isDown) {
        this.jogadorAnda(direcao);
    } else {
        this.jogadorGira(direcao);
    }
    this.position.setTo(this.shadow.position.x, this.shadow.position.y);
    
    this.tiros.forEach(function (_bala){
        _self.game.physics.arcade.collide(_bala, _self.groupInimigos, function(_Bala, _inimigo){
            _self.mataBala(_Bala, _inimigo);
        });
        _self.game.physics.arcade.collide(_bala, _self.wallLayers, function(_Bala, parede){
            _self.mataBalaParede(_Bala, parede);
        });
    },this);
    
    this.game.physics.arcade.overlap(this.shadow, this.groupInimigos, function(_sombra, _inimigo){
        _self.recebeAtaque(_inimigo);
    });
    this.hudTiro.setText(this.numTiros);
    this.hudVida.setText(this.vida + "/100");
};

Jogador.prototype.recarrega = function () {
    this.carregando = true;
    this.game.time.events.add(Phaser.Timer.SECOND * this.tempoRecarregamentoArma, this.fimRecarrega, this);
};

Jogador.prototype.fimRecarrega = function () {
    this.numTiros = 25;
    this.carregando = false;
};

Jogador.prototype.atira = function () {
    if (this.numTiros <= 0) {
        this.recarrega();
        return;
    }
    if (this.carregando) {
        return;
    }
    if (this.game.time.now > this.tempoProximoTiro && this.tiros.countDead() > 0) {
//        this.game.add.audio("");
        this.numTiros--;
        this.tempoProximoTiro = this.game.time.now + this.frequenciaTiro;
        var tiro = this.tiros.getFirstExists(false);
        tiro.reset(this.position.x, this.position.y - this.height / 2);
        tiro.rotation = this.game.physics.arcade.moveToPointer(tiro, this.velocidadeTiro, this.mouse);
        tiro.animations.play("inicioTiro");
    }
};

Jogador.prototype.desenhaLuz = function (radianos) {
    var comprimentoGrande = 2 * this.comprimentoLuz;
    var comprimentoPequeno = this.comprimentoLuz;
    var distAtual, anguloRaio, ultimoX, ultimoY, listaTiles, menorDistancia;
    var xTile, yTile, xAtual, yAtual, distanciaAtual;
    
    this.luz.clear();
    this.luz.lineStyle(1, 0xFFFF00, 1);
    this.luz.beginFill(0xffff00);
    this.luz.moveTo(this.position.x, this.position.y);
    for (var j = 0; j < this.raiosLuz; j++) {
        if (j >= 135 && j <= 225) {
            distAtual = comprimentoGrande * 2;
        } else {
            distAtual = comprimentoPequeno;
        }
        anguloRaio = radianos - (this.aberturaLuz / 2) + (this.aberturaLuz / this.raiosLuz) * j;
        ultimoX = this.position.x - distAtual * Math.cos(anguloRaio);
        ultimoY = this.position.y - distAtual * Math.sin(anguloRaio);

        this.linhaVisao.start.set(this.position.x, this.position.y);
        this.linhaVisao.end.set(ultimoX, ultimoY);

        listaTiles = this.wallLayers.getRayCastTiles(this.linhaVisao, 32, true, true);
        menorDistancia = distAtual;
        for (var i = 0; i < listaTiles.length; i++) {
            xTile = listaTiles[i].x * listaTiles[i].width;
            yTile = listaTiles[i].y * listaTiles[i].height;
            xAtual = Math.abs(this.position.x - xTile);
            yAtual = Math.abs(this.position.y - yTile);
            distanciaAtual = Math.sqrt(xAtual * xAtual + yAtual * yAtual);
            if (menorDistancia > distanciaAtual) {
                menorDistancia = distanciaAtual;
                ultimoX = xTile + listaTiles[i].width / 2;
                ultimoY = yTile + listaTiles[i].height / 2;
            }
        }
        this.luz.lineTo(ultimoX, ultimoY);
    }
    this.luz.lineTo(this.position.x, this.position.y);
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
        return 0;
    }
    if (angulo > 67 && angulo < 112) {
        //baixo S
        return 1;
    }
    if (angulo > -22 && angulo < 22) {
        //direita L
        return 2;
    }
    if (angulo > 157 || angulo < -157) {
        //esquerda O
        return 3;
    }
    if (angulo > -157 && angulo < -112) {
        //cima esquerda NO
        return 4;
    }
    if (angulo > -67 && angulo < -22) {
        //cima direita NE
        return 5;
    }
    if (angulo > 112 && angulo < 157) {
        //baixo esquerda SO
        return 6;
    }
    //baixao direita SE
    return 7;
};

Jogador.prototype.jogadorGira = function (direcao) {
    switch (direcao) {
        case 0:
            this.frame = 17;
            break;
        case 1:
            this.frame = 62;
            break;
        case 2:
            this.frame = 35;
            break;
        case this.direcoes[3]:
            this.frame = 44;
            break;
        case 4:
            this.frame = 8;
            break;
        case 5:
            this.frame = 24;
            break;
        case 6:
            this.frame = 52;
            break;
        case 7:
            this.frame = 71;
            break;
    }
};

Jogador.prototype.jogadorAnda = function (direcao) {
    var animacao = this.direcoes[direcao];
    var invertido = false;
    var velocidadeAtual = this.velocidade;

    if (this.tecla_Corrida.isDown) {
        velocidadeAtual *= 2.5;
    }

    if (this.tecla_Norte.isDown) {
        this.shadow.body.velocity.y -= velocidadeAtual;
        if (this.direcoes[direcao].indexOf("S") != -1) {
            animacao = "rev_" + animacao;
            invertido = true;
        }
    } else if (this.tecla_Sul.isDown) {
        this.shadow.body.velocity.y += velocidadeAtual;
        if (this.direcoes[direcao].indexOf("N") != -1) {
            animacao = "rev_" + animacao;
            invertido = true;
        }
    }

    if (this.tecla_Oeste.isDown) {
        this.shadow.body.velocity.x -= velocidadeAtual;
        if (this.direcoes[direcao].indexOf("L") != -1 && !invertido) {
            animacao = "rev_" + animacao;
        }
    } else if (this.tecla_Leste.isDown) {
        this.shadow.body.velocity.x += velocidadeAtual;
        if (this.direcoes[direcao].indexOf("O") != -1 && !invertido) {
            animacao = "rev_" + animacao;
        }
    }
    this.animations.play(animacao);
};

Jogador.prototype.recebeAtaque = function (_inimigo) {
    if(_inimigo.ataque()){
        this.vida -= _inimigo.dano;
    }
    if (this.vida <= 0) {
        return false;
    }
    return true;
};

Jogador.prototype.mataBala = function (bala, _inimigo) {
    bala.kill();
    _inimigo.recebeDano(this.danoTiro);
    this.animacaoBala(bala);
};

Jogador.prototype.mataBalaParede = function (bala, parede){
    bala.kill();
    this.animacaoBala(bala);
};

Jogador.prototype.animacaoBala = function(_bala){
    this.toon = this.game.add.sprite(_bala.position.x, _bala.position.y, 'toon');
    this.toon.anchor.setTo(0.5);
    var animacao = this.toon.animations.add('toon', null, 200, false);
    animacao.angle = Math.random() * 360;
    this.toon.scale.set(0.5);
    animacao.play(200,false,true);
};
