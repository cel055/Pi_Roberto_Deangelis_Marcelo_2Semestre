var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render});

var map;
var layer;
var cursors;
var sprite;
var timer;    

var easystar = new EasyStar.js();

function preload(){
    game.load.tilemap('desert','asset/desert.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tmw_desert_spacing.png');
    game.load.image('car', 'assets/car90.png' );
}

function create(){    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    map = game.add.tilemap('desert');
    
    map.addTilesetImage('Desert', 'tiles');
    
    layer = map.createLayer('Ground');
    
    layer.resizeWorld();

    sprite = game.add.sprite(160, 32, 'car');
    sprite.anchor.setTo(0, 0);
    
    personagem = game.add.sprite(160, 64, 'car');
    personagem.anchor.setTo(0, 0);

    game.physics.enable(sprite);

    game.camera.follow(personagem);
    
    cursors = game.input.keyboard.createCursorKeys();
    
    easystar.setGrid(convert((map.layer).data));
    
    easystar.setAcceptableTiles([30]); 
    
    easystar.enableDiagonals();
    
    //gera(sprite.x, sprite.y, 24, 13);
    
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
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
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR, 50)){
        gera(sprite.x, sprite.y, personagem.x, personagem.y);
    }
}

function move(_x, _y){
    
}

function anda(_path, _pos){
    
    if(_path){
        if(_path.length > _pos){
            var x = _path[_pos].x * 32;
            var y = _path[_pos].y * 32;
            game.add.tween(sprite).to( { y: y }, 300, Phaser.Easing.Linear.None, true);
            game.add.tween(sprite).to( { x: x }, 300, Phaser.Easing.Linear.None, true);
            setTimeout(function(){anda(_path, (_pos + 1))},300);
        }
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
    console.log(elemento);
    return elemento;
}

function gera(_xStart,_yStart,_Xend, _Yend){
    
    easystar.findPath(layer.getTileX(_xStart), layer.getTileX(_yStart), layer.getTileX(_Xend), layer.getTileX(_Yend), function( path ) {
        anda(path, 1);
    });

    easystar.calculate();
}

function render() {
    cursorsx = game.input.mousePointer.x;
    cursorsy = game.input.mousePointer.y;
    game.debug.text('Click to fill tiles', 32, 32, 'rgb(0,0,0)');
    game.debug.text('Tile X: ' + layer.getTileX(sprite.x), 32, 48, 'rgb(0,0,0)');
    game.debug.text('Tile Y: ' + layer.getTileY(sprite.y), 32, 64, 'rgb(0,0,0)');
    game.debug.text('Personagem X: ' + layer.getTileX(personagem.x), 32, 80, 'rgb(0,0,0)');
    game.debug.text('Personagem Y: ' + layer.getTileY(personagem.y), 32, 96, 'rgb(0,0,0)');
}