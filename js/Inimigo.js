var Inimigo = function(_game, _x, _y, _key, _frame){
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    this.direcao;
    this.parado = false;
    this.velocidade = 90;
    
    
    this.shadow;
}

Inimigo.prototype = Object.create(Phaser.Sprite.prototype);
Inimigo.prototype.constructor = Inimigo;

Inimigo.prototype.cria = function(){
    this.game.physics.enable(this);
    this.enableBody = true;
    this.body.immovable = true;   
    this.anchor.setTo(0.5, 1); 
    
    this.criaSombra();
};

Inimigo.prototype.pathFind = function(easystar, layer, heroi){
    var xInimigo = layer.getTileX(this.shadow.x), 
        yInimigo = layer.getTileY(this.shadow.y), 
        xHeroi = layer.getTileX(heroi.x), 
        yHeroi = layer.getTileY(heroi.y),
        esteInimigo = this;
    
    easystar.findPath(xInimigo, yInimigo, xHeroi, yHeroi, function(path){
        esteInimigo.pathFinded(path, xHeroi, yHeroi);
    });
    
    easystar.calculate();
};

Inimigo.prototype.pathFinded = function(path, xHeroi, yHeroi){
    if(!path){
        this.parado = true;
        return;
    }
    this.parado = false;
    currentNextPointX = path[1].x;
    currentNextPointY = path[1].y;

    if (currentNextPointX < xHeroi && currentNextPointY < yHeroi){
        this.direcao = "SL";
    }else if (currentNextPointX == xHeroi && currentNextPointY < yHeroi){
        this.direcao = "S";
    }else if (currentNextPointX > xHeroi && currentNextPointY < yHeroi){
        this.direcao = "SO";
    }else if (currentNextPointX < xHeroi && currentNextPointY == yHeroi){
        this.direcao = "L";
    }else if (currentNextPointX > xHeroi && currentNextPointY == yHeroi){
        this.direcao = "O";
    }else if (currentNextPointX > xHeroi && currentNextPointY > yHeroi){
        this.direcao = "NO";
    }else if (currentNextPointX == xHeroi && currentNextPointY > yHeroi){
        this.direcao = "N";
    }else if (currentNextPointX < xHeroi && currentNextPointY > yHeroi){
        this.direcao = "NL";
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