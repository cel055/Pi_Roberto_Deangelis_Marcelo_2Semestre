var Inimigo = function (_game, _x, _y, _key, _frame, _easyStar, _layer, _heroi, _som) {
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    this.easyStar = _easyStar;
    this.layer = _layer;
    this.heroi = _heroi;
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
	this.somZumbi = _som;
    this.tint = 0xFE2E2E;

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

Inimigo.prototype.cria = function () {
    this.game.physics.enable(this);
    this.enableBody = true;
    this.body.immovable = true;
    this.anchor.setTo(0.5, 1);

    this.criaSombra();
    this.criaAnimacoes();
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
		if(this.tocando){this.somZumbi.play(('zumbi' + (Math.ceil(Math.random()*24)))); this.tocando = false}
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
	
//    this.anda();
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
    this.pathFind();
};

Inimigo.prototype.ataque = function (){
	if(this.modoAtacando){
		this.modoAtacando = false;
		this.game.time.events.add(Phaser.Timer.SECOND * this.velocidadeAtaque, function(){this.modoAtacando = true;}, this);
		return true;
	}
	return false;
}