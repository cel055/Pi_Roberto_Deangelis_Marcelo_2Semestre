window.addEventListener('load', main);

function main(){
    Calciumtrice.game = new Phaser.Game(800, 600, Phaser.AUTO, 'divGame');
    Calciumtrice.game.state.add('boot',Calciumtrice.Boot);
    Calciumtrice.game.state.add('preload', Calciumtrice.Preload);
    Calciumtrice.game.state.add('game', Calciumtrice.Game);
    Calciumtrice.game.state.add('menu', Calciumtrice.Menu);
    Calciumtrice.game.state.add('faleceuState', Calciumtrice.Faleceu);
    Calciumtrice.game.state.add('zero', Calciumtrice.Zero);
    Calciumtrice.game.state.add('fase_01', Fase_01);
    Calciumtrice.game.state.add('fase_02', Fase_02);
    Calciumtrice.game.state.add('fase_03', Fase_03);
    Calciumtrice.game.state.add('fase_04', Fase_04);
    
    Calciumtrice.game.state.start('boot');
}