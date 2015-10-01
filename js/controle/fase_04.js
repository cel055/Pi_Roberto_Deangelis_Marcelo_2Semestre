var Fase_04 = function () {
    Calciumtrice.call(this);
};

Fase_04.prototype = Object.create(Calciumtrice.prototype);

Fase_04.prototype.create = function () {
    this.setFase('fase_04');
    this.iniciaFase();

    this.mapaGlobal = new TileMap(this.game, 'mapa04');

    this.mapaGlobal.addTilesetImage('tileset_tiled', 'grassLandTileset');

    this.layerChao = this.mapaGlobal.createLayer('chao');
    this.layerChaoVisivel = this.mapaGlobal.createLayer('chao');
    this.layerChaoVisivel.alpha = 0.5;
    this.layerParede = this.mapaGlobal.createLayer('paredes');

    this.mapaGlobal.setCollisionBetween(1, 1000, true, 'paredes');

    var listaTilesPath = [];
    for(var i = 1; i < 1001; i++){
        listaTilesPath.push(i);
    }

    this.criaPathFinder(this.mapaGlobal.layer.data, listaTilesPath);

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

Fase_04.prototype.update = function () {
    if (this.jogador.vida < 1) {
        this.fimDeJogo();
    }

    this.inimigos.forEach(function (inimigo) {
        if (inimigo.vida < 1) {
            Calciumtrice.game.state.start('zero');
        }
    }, this);
    this.game.physics.arcade.collide(this.jogador.shadow, this.layerParede);

    this.game.physics.arcade.collide(this.inimigos.shadow, this.layerParede);
    this.game.physics.arcade.collide(this.jogador.shadow, this.inimigos.shadow);

    this.game.physics.arcade.overlap(this.jogador.shadow, this.grupoPorta, this.macaneta, null, this);

    this.inimigos.sort('y', Phaser.Group.SORT_ASCENDING);
};

Fase_04.prototype.render = function () {
    Calciumtrice.game.debug.text(Calciumtrice.game.time.fps || '--', 2, 14, "#00ff00");
};