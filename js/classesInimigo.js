var Fraco = function  (_game, _x, _y, _key, _frame, _easyStar, _layer, _heroi, _som) {
	Inimigo.call(this, _game, _x, _y, _key, _frame, _easyStar, _layer, _heroi, _som);
	this.vida = 50;
	this.velocidade = 150;
	this.dano = 10;
	this.tint = 0x00FF00;
	this.distancia = 15;
    this.velocidadeAtaque = 1;
};

Fraco.prototype = Object.create(Inimigo.prototype);
Fraco.prototype.constructor = Fraco;

var Medio = function (_game, _x, _y, _key, _frame, _easyStar, _layer, _heroi, _som) {
	Inimigo.call(this, _game, _x, _y, _key, _frame, _easyStar, _layer, _heroi, _som);
	this.vida = 75;
	this.velocidade = 100;
	this.dano = 15;
	this.tint = 0x0000FF;
	this.distancia = 13;
    this.velocidadeAtaque = 2;
};

Medio.prototype = Object.create(Inimigo.prototype);
Medio.prototype.constructor = Medio;

var Forte = function (_game, _x, _y, _key, _frame, _easyStar, _layer, _heroi, _som) {
	Inimigo.call(this, _game, _x, _y, _key, _frame, _easyStar, _layer, _heroi, _som);
	this.vida = 200;
	this.velocidade = 50;
	this.dano = 50;
	this.tint = 0xFF0000;
	this.distancia = 50;
    this.velocidadeAtaque = 3;
};

Forte.prototype = Object.create(Inimigo.prototype);
Forte.prototype.constructor = Medio;