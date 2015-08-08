window.addEventListener('load', main);

var Calciumtrice = Calciumtrice || {};

function main(){
    Calciumtrice.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'divGame');
    Calciumtrice.game.state.add('boot',Calciumtrice.Boot);
    Calciumtrice.game.state.add('preload', Calciumtrice.Preload);
    Calciumtrice.game.state.add('game', Calciumtrice.Game);
    Calciumtrice.game.state.add('menu', Calciumtrice.Menu);
    Calciumtrice.game.state.add('stageTeste', Calciumtrice.StageTeste);
    
    Calciumtrice.game.state.start('boot');
}