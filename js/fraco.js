var Fraco = function  (_game, _x, _y, _key, _frame, _easyStar, _layer, _heroi, _toon) {
	Inimigo.call(this, _game, _x, _y, _key, _frame);
	this.vida = 0;
	this.velocidade = 0;
	this.dano = 0;
	this.tint = 0;
	this.distancia = 0;
}

Fraco.prototype = Object.create(Inimigo.prototype);
Fraco.prototype.constructor = Fraco;