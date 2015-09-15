window.addEventListener('load', main);

var Calciumtrice = Calciumtrice || {};

function main(){
    Calciumtrice.game = new Phaser.Game(800, 600, Phaser.AUTO, 'divGame');
    Calciumtrice.game.state.add('boot',Calciumtrice.Boot);
    Calciumtrice.game.state.add('preload', Calciumtrice.Preload);
    Calciumtrice.game.state.add('game', Calciumtrice.Game);
    Calciumtrice.game.state.add('menu', Calciumtrice.Menu);
    Calciumtrice.game.state.add('mapaDinamico', Calciumtrice.Mapa_Dinamico);
    Calciumtrice.game.state.add('tutorial', Calciumtrice.Mapa_tutorial);
    Calciumtrice.game.state.add('faleceuState', Calciumtrice.Faleceu);
    Calciumtrice.game.state.add('fase_05', Calciumtrice.Fase_05);
    Calciumtrice.game.state.add('mapaComVariosZombies', Calciumtrice.MapaComVariosZombies);
    
    Calciumtrice.game.state.start('boot');
}