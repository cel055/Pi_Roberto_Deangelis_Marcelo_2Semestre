var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render});

var map;
var layer;
var cursors;
var sprite;
var timer; 
var podeanda = true;
var inimigos;
var mapaAtual;

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
        
    mapaAtual = convert((map.layer).data);
    
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);    
    
    easystar.setGrid(mapaAtual);
    
    easystar.setAcceptableTiles([30]); 
    
    easystar.enableDiagonals(); 
    
//    criaInimigo(0, 0);
//    criaInimigo(0, 32);
    criaInimigo(0, 64);
    criaInimigo(0, 96);

	easystar.calculate();
    
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
    
    game.physics.arcade.collide(personagem, inimigos);
    game.physics.arcade.collide(personagem, layer);
    
    for(var i = 0; i < inimigos.children.length; i++){
        if(inimigos.children[i].podeanda){
            //inimigos.children[i]
            gera(inimigos.children[i],inimigos.children[i].x, inimigos.children[i].y, personagem.x, personagem.y);
        }   
    }
}

function move(_inimigo, _path){
    
    var _pos = 1;

    game.physics.arcade.moveToXY(_inimigo, _path[_pos].x * 32, _path[_pos].y * 32, 100);

//    // Movimenta o Sprite;        
//    if(layer.getTileX(_inimigo.body.x) != _path[_pos].x){
////        _inimigo.body.x = _path[_pos].x * 32;
//        _inimigo.tween = game.add.tween(_inimigo).to({ x: _path[_pos].x * 32 , y: _path[_pos].y * 32 }, 200, Phaser.Easing.Linear.None, true);
//    }else{
//        if(layer.getTileY(_inimigo.body.y) != _path[_pos].y){
////            _inimigo.body.y = _path[_pos].y * 32
//        _inimigo.tween = game.add.tween(_inimigo).to({ x: _path[_pos].x * 32 , y: _path[_pos].y * 32 }, 200, Phaser.Easing.Linear.None, true);
//        }
//    }
    
//    easystar.stopAvoidingAdditionalPoint( _path[0].y, _path[0].x );
//    easystar.avoidAdditionalPoint( _path[_pos].x, _path[_pos].y );
    
//    _inimigo.tween = game.add.tween(_inimigo).to({ x: _path[_pos].x * 32 , y: _path[_pos].y * 32 }, 200, Phaser.Easing.Linear.None, true);
    
//    _inimigo.podeanda = true;
    setTimeout(function(){_inimigo.podeanda = true},200);
}

function criaInimigo(_x, _y){
    var inimigo;

    inimigo = game.add.sprite(_x, _y, 'car');
    inimigo.anchor.setTo(0, 0);
    
    inimigo.podeanda = true;
    inimigo.tween;

    game.physics.enable(inimigo);
    inimigo.enableBody = true;
	inimigo.body.collideWorldBounds = true;
	inimigo.body.immovable = false;
    
    inimigos.add(inimigo);
    
    //mapaAtual[(_y/16)][(_x/16)] = inimigos.length - 1;
    
//    easystar.avoidAdditionalPoint((_y/32),(_x/32));
    
    console.log(easystar);
    
}

function anda(_path, _inimigo){
    
    console.log(_path);
    
    if(_path){
        _inimigo.podeanda = false;
        move(_inimigo, _path);
    }
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

function gera(_inimigo,_xStart,_yStart,_Xend, _Yend){
    if(layer.getTileX(_xStart) == layer.getTileX(_Xend) && layer.getTileX(_yStart) == layer.getTileX(_Yend)){
        return;
    }
    
    easystar.stopAvoidingAdditionalPoint((layer.getTileX(_xStart)),(layer.getTileX(_yStart)));
    
    easystar.findPath(layer.getTileX(_xStart), layer.getTileX(_yStart), layer.getTileX(_Xend), layer.getTileX(_Yend), function( path ) {
        anda(path,_inimigo);
    });

    easystar.calculate();
    
}

function render() {
//    cursorsx = game.input.mousePointer.x;
//    cursorsy = game.input.mousePointer.y;
//    game.debug.text('Click to fill tiles', 32, 32, 'rgb(0,0,0)');
//    game.debug.text('Personagem X: ' + layer.getTileX(personagem.x), 32, 80, 'rgb(0,0,0)');
//    game.debug.text('Personagem Y: ' + layer.getTileY(personagem.y), 32, 96, 'rgb(0,0,0)');
    
}