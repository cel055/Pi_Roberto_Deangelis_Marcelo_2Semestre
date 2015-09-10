var Fraco = function  (_game, _x, _y, _key, _frame, _easyStar, _layer, _heroi, _toon) {
	Inimigo.call(this, _game, _x, _y, _key, _frame);
	this.vida = ;
	this.velocidade = ;
	this.dano = ;
	this.tint = ;
	this.distancia = ;
}

Fraco.prototype = Object.create(Inimigo.prototype);
Fraco.prototype.constructor = Fraco;