var Inimigo = function (_game, _x, _y, _key, _frame, _easyStar, _layer) {
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    this.easyStar = _easyStar;
    this.layer = _layer;
    this.heroi;
    //alterações feitas pelo roberto e na linah 109 3 111
    this.x = _x;
    this.y = _y;
    //-----------------------------

    this.direcao;
    this.parado = false;
    this.velocidade = 180;
    this.vida = 100;
    this.dano = 10;
    this.velocidadeAtaque = 1;
    this.modoAtacando = true;

    this.tocando = true;

    this.shadow;
    this.distancia = 15;
}

Inimigo.prototype = Object.create(Phaser.Sprite.prototype);
Inimigo.prototype.constructor = Inimigo;

Inimigo.prototype.norte = [17, 16, 15, 14, 13, 12, 11, 10, 9];
Inimigo.prototype.sul = [62, 61, 60, 59, 58, 57, 56, 55, 54];
Inimigo.prototype.leste = [35, 34, 33, 32, 31, 30, 29, 28, 27];
Inimigo.prototype.oeste = [44, 43, 42, 41, 40, 39, 38, 37, 36];
Inimigo.prototype.noroeste = [8, 7, 6, 5, 4, 3, 2, 1, 0];
Inimigo.prototype.nordeste = [26, 25, 24, 23, 22, 21, 20, 19, 18];
Inimigo.prototype.suldoeste = [53, 52, 51, 50, 49, 48, 47, 46, 45];
Inimigo.prototype.suldeste = [71, 70, 69, 68, 67, 66, 65, 64, 63];

Inimigo.prototype.somZumbi;

Inimigo.prototype.cria = function () {
    this.game.physics.enable(this);
    this.enableBody = true;
    this.body.immovable = true;
    this.anchor.setTo(0.5, 1);

    this.criaSombra();
    this.criaAnimacoes();
    this.criaAudio();
};

Inimigo.prototype.criaAnimacoes = function () {
    this.animations.add('N', this.norte, 10, true);
    this.animations.add('S', this.sul, 10, true);
    this.animations.add('L', this.leste, 10, true);
    this.animations.add('O', this.oeste, 10, true);
    this.animations.add('NO', this.noroeste, 10, true);
    this.animations.add('NL', this.nordeste, 10, true);
    this.animations.add('SO', this.suldoeste, 10, true);
    this.animations.add('SL', this.suldeste, 10, true);
};

Inimigo.prototype.criaAudio = function () {
    if (!this.somZumbi) {
        Inimigo.prototype.somZumbi = this.game.add.audio('somZumbi');
        this.somZumbi.allowMultiple = true;
        this.somZumbi.addMarker('zumbi1', 0, 0.850);
        this.somZumbi.addMarker('zumbi2', 0.850, 1.560);
        this.somZumbi.addMarker('zumbi3', 1.560, 2.143);
        this.somZumbi.addMarker('zumbi4', 2.143, 2.871);
        this.somZumbi.addMarker('zumbi5', 2.871, 3.373);
        this.somZumbi.addMarker('zumbi6', 3.373, 3.912);
        this.somZumbi.addMarker('zumbi7', 3.912, 4.495);
        this.somZumbi.addMarker('zumbi8', 4.495, 5.332);
        this.somZumbi.addMarker('zumbi9', 5.332, 6.205);
        this.somZumbi.addMarker('zumbi10', 6.205, 6.892);
        this.somZumbi.addMarker('zumbi11', 6.892, 7.399);
        this.somZumbi.addMarker('zumbi12', 7.399, 8.186);
        this.somZumbi.addMarker('zumbi13', 8.186, 8.746);
        this.somZumbi.addMarker('zumbi14', 8.746, 9.411);
        this.somZumbi.addMarker('zumbi15', 9.411, 10.289);
        this.somZumbi.addMarker('zumbi16', 10.289, 11.727);
        this.somZumbi.addMarker('zumbi17', 11.727, 13.310);
        this.somZumbi.addMarker('zumbi18', 13.310, 14.413);
        this.somZumbi.addMarker('zumbi19', 14.413, 15.390);
        this.somZumbi.addMarker('zumbi20', 15.390, 16.354);
        this.somZumbi.addMarker('zumbi21', 16.354, 17.434);
        this.somZumbi.addMarker('zumbi22', 17.434, 18.099);
        this.somZumbi.addMarker('zumbi23', 18.099, 18.913);
        this.somZumbi.addMarker('zumbi24', 18.913, 19.244);
    }
};

Inimigo.prototype.setAlvoDoInimigo = function (alvo) {
    this.heroi = alvo;
};

Inimigo.prototype.pathFind = function () {
    var xInimigo = this.layer.getTileX(this.shadow.position.x),
            yInimigo = this.layer.getTileY(this.shadow.position.y),
            xHeroi = this.layer.getTileX(this.heroi.position.x),
            yHeroi = this.layer.getTileY(this.heroi.position.y),
            esteInimigo = this;


    if (Math.abs(xInimigo - xHeroi) > this.distancia || Math.abs(yInimigo - yHeroi) > this.distancia) {
        this.parado = true;
        this.tocando = true;
        return;
    } else {
        if (this.tocando) {
            this.somZumbi.play(('zumbi' + (Math.ceil(Math.random() * 24))));
            this.tocando = false
        }
        this.easyStar.findPath(xInimigo, yInimigo, xHeroi, yHeroi, function (path) {
            esteInimigo.pathFinded(path);
        });
        this.easyStar.calculate();
    }
};

Inimigo.prototype.pathFinded = function (path) {
    if (!path || !path[1]) {
        this.parado = true;
        return;
    }
    this.parado = false;
    var proximoPontoX = path[1].x;
    var proximoPontoY = path[1].y;
    var atualPontoX = path[0].x;
    var atualPontoY = path[0].y;


    if (proximoPontoX < atualPontoX && proximoPontoY < atualPontoY) {
        this.direcao = "NO";
        this.animations.play("NO");
        this.shadow.body.velocity.x = -this.velocidade;
        this.shadow.body.velocity.y = -this.velocidade;
    } else if (proximoPontoX == atualPontoX && proximoPontoY < atualPontoY) {
        this.direcao = "N";
        this.animations.play("N");
        this.shadow.body.velocity.y = -this.velocidade;
    } else if (proximoPontoX > atualPontoX && proximoPontoY < atualPontoY) {
        this.direcao = "NL";
        this.animations.play("NL");
        this.shadow.body.velocity.x = this.velocidade;
        this.shadow.body.velocity.y = -this.velocidade;
    } else if (proximoPontoX < atualPontoX && proximoPontoY == atualPontoY) {
        this.direcao = "O";
        this.animations.play("O");
        this.shadow.body.velocity.x = -this.velocidade;
    } else if (proximoPontoX > atualPontoX && proximoPontoY == atualPontoY) {
        this.direcao = "L";
        this.animations.play("L");
        this.shadow.body.velocity.x = this.velocidade;
    } else if (proximoPontoX > atualPontoX && proximoPontoY > atualPontoY) {
        this.direcao = "SL";
        this.animations.play("SL");
        this.shadow.body.velocity.x = this.velocidade;
        this.shadow.body.velocity.y = this.velocidade;
    } else if (proximoPontoX == atualPontoX && proximoPontoY > atualPontoY) {
        this.direcao = "S";
        this.animations.play("S");
        this.shadow.body.velocity.y = this.velocidade;
    } else if (proximoPontoX < atualPontoX && proximoPontoY > atualPontoY) {
        this.direcao = "SO";
        this.animations.play("SO");
        this.shadow.body.velocity.x = -this.velocidade;
        this.shadow.body.velocity.y = this.velocidade;
    }
    this.position.setTo(this.shadow.position.x, this.shadow.position.y);
};

Inimigo.prototype.criaSombra = function () {
    this.shadow = this.game.add.sprite(this.position.x, this.position.y, 'tilesetSpriteSheet', 960);
    this.game.physics.arcade.enable(this.shadow);
    this.shadow.alpha = 0;
    this.shadow.anchor.setTo(0.5, 1);

//    this.shadow.position.set(100, 100);

    this.shadow.position.set(this.x, this.y);
};

Inimigo.prototype.recebeDano = function () {
    var dano = 20;
    this.vida -= dano;
    if (this.vida <= 0) {
        this.kill();
    }
};

Inimigo.prototype.update = function () {
    this.shadow.body.velocity.x = 0;
    this.shadow.body.velocity.y = 0;
    if (this.alive) {
        this.pathFind();
    }
};

Inimigo.prototype.ataque = function () {
    if (this.modoAtacando) {
        this.modoAtacando = false;
        this.game.time.events.add(Phaser.Timer.SECOND * this.velocidadeAtaque, function () {
            this.modoAtacando = true;
        }, this);
        return true;
    }
    return false;
}