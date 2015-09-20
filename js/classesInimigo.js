var Fraco = function (_game, _x, _y, _key, _frame, _easyStar, _layer, _heroi) {
    Inimigo.call(this, _game, _x, _y, _key, _frame, _easyStar, _layer, _heroi);
    this.vida = 50;
    this.velocidade = 200;
    this.dano = 10;
    this.tint = 0x00FF00;
    this.distancia = 9;
    this.velocidadeAtaque = 1;
};

Fraco.prototype = Object.create(Inimigo.prototype);
Fraco.prototype.constructor = Fraco;

var Medio = function (_game, _x, _y, _key, _frame, _easyStar, _layer) {
    Inimigo.call(this, _game, _x, _y, _key, _frame, _easyStar, _layer);
    this.vida = 75;
    this.velocidade = 125;
    this.dano = 15;
    this.tint = 0x0000FF;
    this.distancia = 7;
    this.velocidadeAtaque = 2;
};

Medio.prototype = Object.create(Inimigo.prototype);
Medio.prototype.constructor = Medio;

var Forte = function (_game, _x, _y, _key, _frame, _easyStar, _layer) {
    Inimigo.call(this, _game, _x, _y, _key, _frame, _easyStar, _layer);
    this.vida = 200;
    this.velocidade = 50;
    this.dano = 50;
    this.tint = 0xFF0000;
    this.distancia = 8;
    this.velocidadeAtaque = 3;
};

Forte.prototype = Object.create(Inimigo.prototype);
Forte.prototype.constructor = Medio;


var HellKnight = function (_game, _x, _y, _key, _frame, _easyStar, _layer) {
    Inimigo.call(this, _game, _x, _y, _key, _frame, _easyStar, _layer);
    this.vida = 200;
    this.velocidade = 50;
    this.dano = 50;
    this.distancia = 8;
    this.velocidadeAtaque = 3;

    this.norte = [12, 44, 12, 4];
    this.sul = [8, 40, 8,  0];
    this.leste = [14, 46, 14, 6];
    this.oeste = [10, 42, 10, 2];
    this.noroeste = [11, 43, 11, 3];
    this.nordeste = [13, 45, 13, 5];
    this.suldoeste = [9, 41, 9, 1];
    this.suldeste = [15, 47, 15, 7];
};

HellKnight.prototype = Object.create(Inimigo.prototype);
HellKnight.prototype.constructor = HellKnight;

var Commando = function (_game, _x, _y, _key, _frame, _easyStar, _layer) {
    Inimigo.call(this, _game, _x, _y, _key, _frame, _easyStar, _layer);
    this.vida = 75;
    this.velocidade = 125;
    this.dano = 15;
    this.distancia = 7;
    this.velocidadeAtaque = 2;

    this.norte = [12, 20, 12, 4];
    this.sul = [8, 16, 8,  0];
    this.leste = [14, 22, 14, 6];
    this.oeste = [10, 18, 10, 2];
    this.noroeste = [11, 19, 11, 3];
    this.nordeste = [13, 21, 13, 5];
    this.suldoeste = [9, 17, 9, 1];
    this.suldeste = [15, 23, 15, 7];
};

Commando.prototype = Object.create(Inimigo.prototype);
Commando.prototype.constructor = HellKnight;