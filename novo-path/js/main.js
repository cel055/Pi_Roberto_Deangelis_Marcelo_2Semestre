var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update});

var map;
var layer;
var cursors;
var sprite;
var timer; 
var inimigos;
var mapaAtual;
var cowboy;
var enemySpeed = 90;

var easystar = new EasyStar.js();

function preload(){
    game.load.image('tiles', 'assets/tmw_desert_spacing.png');
    game.load.image('car', 'assets/car90.png' );
    game.load.tilemap('simple','assets/simple.json', null, Phaser.Tilemap.TILED_JSON);
}

function create(){    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    map = game.add.tilemap('simple');
    
    map.addTilesetImage('Simple', 'tiles');
    
    layer = map.createLayer('Ground');
    
    layer.resizeWorld();
    
    personagem = game.add.sprite(160, 64, 'car');
    game.physics.enable(personagem);
    personagem.body.collideWorldBounds = true;
	personagem.body.immovable = true;
    personagem.anchor.setTo(0, 0);
    
    inimigos = game.add.group();

    game.camera.follow(personagem);
    
    cursors = game.input.keyboard.createCursorKeys();
    //PAra a fase
    mapaAtual = convert((map.layer).data);
    
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);  
    //PAra a fase
    easystar.setGrid(mapaAtual);
    //PAra a fase
    easystar.setAcceptableTiles([30]); 
    //PAra a fase
    easystar.enableDiagonals(); 
    
//    criaInimigo(0, 0);
//    criaInimigo(0, 32);
//    criaInimigo(0, 64);
//    criaInimigo(0, 96);

    cowboy = game.add.sprite(0, 64, 'car');
    cowboy.anchor.setTo(0, 0);
    cowboy.direcao = "W";

    game.physics.enable(cowboy);
    cowboy.enableBody = true;
	cowboy.body.collideWorldBounds = true;
    //PAra a fase
	easystar.calculate();	
	
//    game.physics.arcade.collide(personagem, inimigos);
    game.physics.arcade.collide(personagem, layer);
	
	setInterval(function(){
			
		var currentPlayerX = layer.getTileX(personagem.x);
		var currentPlayerY = layer.getTileX(personagem.y);
			
			easystar.findPath(layer.getTileX(cowboy.x), layer.getTileX(cowboy.y), currentPlayerX, currentPlayerY, function( path ) {

				if (path) {
					currentNextPointX = path[1].x;
					currentNextPointY = path[1].y;
				}

				if (currentNextPointX < currentPlayerX && currentNextPointY < currentPlayerY){
					// left up
					cowboy.direcao = "NW";

				}else if (currentNextPointX == currentPlayerX && currentNextPointY < currentPlayerY){
					// up
					cowboy.direcao = "N";

				}else if (currentNextPointX > currentPlayerX && currentNextPointY < currentPlayerY){
					// right up
					cowboy.direcao = "NE";

				}else if (currentNextPointX < currentPlayerX && currentNextPointY ==currentPlayerY){
					// left
					cowboy.direcao = "W";

				}else if (currentNextPointX > currentPlayerX && currentNextPointY ==currentPlayerY){
					// right
					cowboy.direcao = "E";

				}else if (currentNextPointX > currentPlayerX && currentNextPointY > currentPlayerY){
					// right down
					cowboy.direcao = "SE";

				}else if (currentNextPointX == currentPlayerX && currentNextPointY > currentPlayerY){
					// down
					cowboy.direcao = "S";

				}else if (currentNextPointX < currentPlayerX && currentNextPointY > currentPlayerY){
					// left down
					cowboy.direcao = "SW";

				}else{
					cowboy.direcao = "STOP";
				}
			});

		easystar.calculate();
	}, 400);
    
}

function update(){         
    if (cursors.left.isDown){
        personagem.x -= 5;
    }
    
    if (cursors.right.isDown){
        personagem.x += 5;  
    }
    
    if (cursors.down.isDown){
        personagem.y += 5;
    }
    
    if (cursors.up.isDown){
        personagem.y -= 5;
    }	
	
	var enemySpeed = 90;
	       
	if (cowboy.direcao == "N") {
		cowboy.body.velocity.x = -enemySpeed;
		cowboy.body.velocity.y = -enemySpeed;
	}
	else if (cowboy.direcao == "S")
	{
		cowboy.body.velocity.x = enemySpeed;
		cowboy.body.velocity.y = enemySpeed;
	}
	else if (cowboy.direcao == "E") {
		cowboy.body.velocity.x = enemySpeed;
		cowboy.body.velocity.y = -enemySpeed;
	}
	else if (cowboy.direcao == "W")
	{
		cowboy.body.velocity.x = -enemySpeed;
		cowboy.body.velocity.y = enemySpeed;
	}
	else if (cowboy.direcao == "SE")
	{
		cowboy.body.velocity.x = enemySpeed;
		cowboy.body.velocity.y = 0;
	}
	else if (cowboy.direcao == "NW")
	{
		cowboy.body.velocity.x = -enemySpeed;
		cowboy.body.velocity.y = 0;   	
	}
	else if (cowboy.direcao == "SW")
	{
		cowboy.body.velocity.x = 0;
		cowboy.body.velocity.y = enemySpeed;    	
	}

	else if (cowboy.direcao == "NE")
	{
		cowboy.body.velocity.x = 0;
		cowboy.body.velocity.y = -enemySpeed;
	}
	else if (cowboy.direcao == "STOP")
	{
		cowboy.body.velocity.x = 0;
		cowboy.body.velocity.y = 0;
	}
	else // JUST IN CASE IF cowboy.direcao wouldnt exist we stop the cowboy movement
	{
		cowboy.body.velocity.x = 0;
		cowboy.body.velocity.y = 0;
	}
}

function criaInimigo(_x, _y){
    var inimigo;

    inimigo = game.add.sprite(_x, _y, 'car');
    inimigo.anchor.setTo(0, 0);
    inimigo.direcao = "W";

    game.physics.enable(inimigo);
    inimigo.enableBody = true;
	inimigo.body.collideWorldBounds = true;
    
    inimigos.add(inimigo);
}


function convert(_obj){
    var elemento = [];
    for(var i = 0; i < _obj.length; i++){
        
        elemento[i] = [];
        for(var j = 0; j < _obj[i].length; j++){
            elemento[i][j] = (_obj[i][j]).index;
        }
    }
    return elemento;
}

function iniciaPath(){
	
}