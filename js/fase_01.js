var Fase_01 = function () {
    Calciumtrice.call(this);
};
Fase_01.prototype = Object.create(Calciumtrice.prototype);

Fase_01.prototype.create = function () {
    this.setFase('fase_01');
    this.iniciaFase();

    this.mapaGlobal = new TileMap(this.game, 'mapa01');

    this.mapaGlobal.addTilesetImage('tileset_tiled', 'grassLandTileset');

    this.layerChao = this.mapaGlobal.createLayer('chao');
    this.layerChaoVisivel = this.mapaGlobal.createLayer('chao');
    this.layerChaoVisivel.alpha = 0.5;
    this.layerParede = this.mapaGlobal.createLayer('paredes');

    this.layerChao.resizeWorld();

    this.mapaGlobal.setCollisionBetween(1, 1000, true, 'paredes');

    this.criaPathFinder(this.mapaGlobal.layer.data, [1]);

    this.saida = this.mapaGlobal.createFromObject('objetos', 5, 'porta');
    this.game.physics.arcade.enable(this.saida);
    this.saida.enableBody = true;

    var listaInimigos = [
        {
            nome: 'spawnInimigoDificil',
            key: 'hellKnight',
            Classe: HellKnight
        }
    ];
    this.criaInimigos(listaInimigos);

    this.jogador = this.mapaGlobal.createFromObject('objetos', 9, 'heroi', 0, true, true, Jogador);
    this.jogador.cria(this.layerParede, this.tirosJogador, this.vidaJogador);
    this.jogador.setGroupInimigos(this.inimigos);

    this.criaHud();
    this.setAlvoDosInimigos(this.jogador.shadow, this.inimigos);
    this.aplicaMascara(this.jogador.luz, [this.layerChao, this.inimigos]);
    this.jogador.setHud(this.tirosJogador, this.vidaJogador);
};

Fase_01.prototype.passaFase = function () {
    this.game.state.start('fase_02');
};

Fase_01.prototype.update = function () {
    if (this.jogador.vida < 1) {
        this.fimDeJogo();
    }

    this.game.physics.arcade.collide(this.jogador.shadow, this.layerParede);
    this.game.physics.arcade.collide(this.jogador.shadow, this.saida, this.passaFase, null, this);
    this.game.physics.arcade.collide(this.inimigos.shadow, this.layerParede);
    this.game.physics.arcade.collide(this.jogador.shadow, this.inimigos.shadow);

    this.inimigos.sort('y', Phaser.Group.SORT_ASCENDING);
};

Fase_01.prototype.render = function () {
    Calciumtrice.game.debug.text(Calciumtrice.game.time.fps || '--', 2, 14, "#00ff00");
};