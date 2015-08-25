var Inimigo = function(_game, _x, _y, _key, _frame){
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    this.direcao = "O";
    this.parado = true;
    this.velocidade = 90;
}

Inimigo.prototype = Object.create(Phaser.Sprite.prototype);
Inimigo.prototype.constructor = Inimigo;

Inimigo.prototype = {
    cria: function(){
        this.game.physics.enable(this);
        this.enableBody = true;
    },
    pathFind: function(easystar, layer, heroi){
        var xInimigo = layer.getTileX(this.x), yInimigo = layer.getTileX(this.y), xHeroi = layer.getTileX(heroi.x), yHeroi = layer.getTileX(heroi.y);
        easystar.findPath(xInimigo, yInimigo, xHeroi, yHeroi, function(path){
            this.pathFinded(path, xHeroi, yHeroi);
        });
    },
    pathFinded: function(path, xHeroi, yHeroi){
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
    },
    update: function(){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        if(this.parado){
            return;
        }
        if (this.direcao == "N") {
            this.body.velocity.y = -this.velocidade;
        }
        else if (this.direcao == "S")
        {
            this.body.velocity.y = this.velocidade;
        }
        else if (this.direcao == "L") {
            this.body.velocity.x = this.velocidade;
        }
        else if (this.direcao == "O")
        {
            this.body.velocity.x = -this.velocidade;
        }
        else if (this.direcao == "SL")
        {
            this.body.velocity.x = this.velocidade;
            this.body.velocity.y = this.velocidade;
        }
        else if (this.direcao == "NO")
        {
            this.body.velocity.x = -this.velocidade;
            this.body.velocity.y = -this.velocidade;   	
        }
        else if (this.direcao == "SO")
        {
            this.body.velocity.x = -this.velocidade;
            this.body.velocity.y = this.velocidade;    	
        }

        else if (this.direcao == "NL")
        {
            this.body.velocity.x = this.velocidade;
            this.body.velocity.y = -this.velocidade;
        }
    }
};