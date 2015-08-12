/**
 * Created by knash on 15-03-12.
 */

RPG.main = function() {
    var game = new Phaser.Game('100%', '100%', Phaser.AUTO);

    game.state.add('startup', RPG.State.Startup);
    game.state.add('preloader', RPG.State.Preloader);
    game.state.add('game', RPG.State.Game);
    game.state.start('startup');
};

window.onload = function() {
    RPG.main();
};
