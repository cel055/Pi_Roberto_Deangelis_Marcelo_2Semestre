window.addEventListener('load', main);

var Calciumtrice = Calciumtrice || {};

function main(){
    Calciumtrice.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'divGame');
    Calciumtrice.game.state.add('boot',Calciumtrice.Boot);
    Calciumtrice.game.state.add('preload', Calciumtrice.Preload);
    Calciumtrice.game.state.add('game', Calciumtrice.Game);
    Calciumtrice.game.state.add('menu', Calciumtrice.Menu);
    Calciumtrice.game.state.add('mapaDinamico', Calciumtrice.Mapa_Dinamico);
    Calciumtrice.game.state.add('tutorial', Calciumtrice.Mapa_tutorial);
    Calciumtrice.game.state.add('fase_01', Calciumtrice.Fase_01);
    Calciumtrice.game.state.add('fase_02', Calciumtrice.Fase_02);
    Calciumtrice.game.state.add('fase_03', Calciumtrice.Fase_03);
    Calciumtrice.game.state.add('fase_05', Calciumtrice.Fase_05);
    Calciumtrice.game.state.add('mapaComVariosZombies', Calciumtrice.MapaComVariosZombies);
    
    Calciumtrice.game.state.start('boot');
}