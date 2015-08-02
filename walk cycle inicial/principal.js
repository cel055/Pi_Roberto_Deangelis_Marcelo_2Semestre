var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create});

var sprite;

function preload() {

    //  37x45 is the size of each frame
    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load
    game.load.spritesheet('ms', 'walk_cycle.png', 64, 110);

}

function create() {

    sprite1 = game.add.sprite(40, 100, 'ms');
    sprite2 = game.add.sprite(120, 100, 'ms');

    sprite1.animations.add('walk', [ 3, 4, 5, 6, 7, 8]);

    sprite1.animations.play('walk', 8, true);
    
    sprite2.animations.add('back', [8, 7, 6, 5, 4, 3]);

    sprite2.animations.play('back', 8, true);

}