var Inimigo = function(_game, _x, _y, _key, _frame){
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    this.direcao;
    this.parado = false;
    this.velocidade = 90;  
    
    this.tint = 0xFE2E2E;
    
    this.shadow;
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

Inimigo.prototype.cria = function(){
    this.game.physics.enable(this);
    this.enableBody = true;
    this.body.immovable = true;   
    this.anchor.setTo(0.5, 1); 
    
    this.criaSombra();
    this.criaAnimacoes();
};

Inimigo.prototype.criaAnimacoes = function(){
    this.animations.add('N', this.norte, 10, true);
    this.animations.add('S', this.sul, 10, true);
    this.animations.add('L', this.leste, 10, true);
    this.animations.add('O', this.oeste, 10, true);
    this.animations.add('NO', this.noroeste, 10, true);
    this.animations.add('NL', this.nordeste, 10, true);
    this.animations.add('SO', this.suldoeste, 10, true);
    this.animations.add('SL', this.suldeste, 10, true);   
}

Inimigo.prototype.pathFind = function(easystar, layer, heroi){
    var xInimigo = layer.getTileX(this.shadow.x), 
        yInimigo = layer.getTileY(this.shadow.y), 
        xHeroi = layer.getTileX(heroi.x), 
        yHeroi = layer.getTileY(heroi.y),
        esteInimigo = this;
    
    easystar.findPath(xInimigo, yInimigo, xHeroi, yHeroi, function(path){
        esteInimigo.pathFinded(path);
    });
    
    easystar.calculate();
};

Inimigo.prototype.pathFinded = function(path){
    if(!path){
        this.parado = true;
        return;
    }
    this.parado = false;
    proximoPontoX = path[1].x;
    proximoPontoY = path[1].y;
    atualPontoX = path[0].x;
    atualPontoY = path[0].y;

    if (proximoPontoX < atualPontoX && proximoPontoY < atualPontoY){
        this.direcao = "NO";
        this.animations.play("NO");
    }else if (proximoPontoX == atualPontoX && proximoPontoY < atualPontoY){
        this.direcao = "N";
        this.animations.play("N");
    }else if (proximoPontoX > atualPontoX && proximoPontoY < atualPontoY){
        this.direcao = "NL";
        this.animations.play("NL");
    }else if (proximoPontoX < atualPontoX && proximoPontoY == atualPontoY){
        this.direcao = "O";
        this.animations.play("O");
    }else if (proximoPontoX > atualPontoX && proximoPontoY == atualPontoY){
        this.direcao = "L";
        this.animations.play("L");
    }else if (proximoPontoX > atualPontoX && proximoPontoY > atualPontoY){
        this.direcao = "SL";
        this.animations.play("SL");
    }else if (proximoPontoX == atualPontoX && proximoPontoY > atualPontoY){
        this.direcao = "S";
        this.animations.play("S");
    }else if (proximoPontoX < atualPontoX && proximoPontoY > atualPontoY){
        this.direcao = "SO";
        this.animations.play("SO");
    }
}

Inimigo.prototype.criaSombra = function () {
    this.shadow = this.game.add.sprite(this.position.x, this.position.y, 'tilesetSpriteSheet', 960);
    this.game.physics.arcade.enable(this.shadow);
    this.shadow.alpha = 0;
    this.shadow.anchor.setTo(0.5, 1);
    this.shadow.position.set(100, 100);
};

Inimigo.prototype.update = function(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    if(this.parado){
        return;
    }
    if (this.direcao == "N") {
        this.shadow.body.velocity.y = -this.velocidade;
    }
    else if (this.direcao == "S")
    {
        this.shadow.body.velocity.y = this.velocidade;
    }
    else if (this.direcao == "L") {
        this.shadow.body.velocity.x = this.velocidade;
    }
    else if (this.direcao == "O")
    {
        this.shadow.body.velocity.x = -this.velocidade;
    }
    else if (this.direcao == "SL")
    {
        this.shadow.body.velocity.x = this.velocidade;
        this.shadow.body.velocity.y = this.velocidade;
    }
    else if (this.direcao == "NO")
    {
        this.shadow.body.velocity.x = -this.velocidade;
        this.shadow.body.velocity.y = -this.velocidade;   	
    }
    else if (this.direcao == "SO")
    {
        this.shadow.body.velocity.x = -this.velocidade;
        this.shadow.body.velocity.y = this.velocidade;    	
    }

    else if (this.direcao == "NL")
    {
        this.shadow.body.velocity.x = this.velocidade;
        this.shadow.body.velocity.y = -this.velocidade;
    }
    
    this.position.setTo(this.shadow.position.x, this.shadow.position.y);
}