var Fase_02 = function () {
    Calciumtrice.call(this);
    this.layerChaoVisivel;
};

Fase_02.prototype = Object.create(Calciumtrice.prototype);

Fase_02.prototype.create = function () {
    this.setFase('fase_02');
    this.iniciaFase();

    this.mapaGlobal = this.criaLayersDaFase();

//    this.criaLayersTelhados();

    this.criaPathFinder(this.mapaGlobal.layer.data, [259, 260, 307, 308]);

    this.grupoPorta = this.game.add.group();
    this.criaPortas('porta', this.mapaGlobal);

//    this.layersTelhados = this.criaLayersTelhados();
    this.saida = this.mapaGlobal.createFromObject('objetos', 3, 'porta');
    this.game.physics.arcade.enable(this.saida);
    this.saida.enableBody = true;

    var listaClassesInimigos = this.criaListaInimigosComClasses();
    this.criaInimigos(listaClassesInimigos);

    this.jogador = this.mapaGlobal.createFromObject('objetos', 774, 'heroi', 0, true, true, Jogador);
    this.jogador.cria(this.layerParede, this.tirosJogador, this.vidaJogador);
    this.jogador.setGroupInimigos(this.inimigos);

    this.criaHud();
    this.setAlvoDosInimigos(this.jogador.shadow, this.inimigos);
    this.aplicaMascara(this.jogador.luz, [this.layerChaoVisivel, this.inimigos]);
    this.jogador.setHud(this.tirosJogador, this.vidaJogador);
};

Fase_02.prototype.criaLayersDaFase = function () {
    var mapaLocal = new TileMap(this.game, 'fase02');

    mapaLocal.addTilesetImage('tileSetFinalFantasy32X32', 'finalFantasyTileset');

    var layerChao = mapaLocal.createLayer('chao');
    layerChao.resizeWorld();
    layerChao.alpha = 0.5;
    this.layerChaoVisivel = mapaLocal.createLayer('chao');

    this.layerParede = mapaLocal.createLayer('paredes');

    mapaLocal.setCollisionBetween(1, 1000, true, 'paredes');
    return mapaLocal;
};

Fase_02.prototype.criaListaInimigosComClasses = function () {
    var listaInimigos = [
        {
            nome: 'spawnInimigoFacil',
            key: 'heroi',
            Classe: Fraco
        },
        {
            nome: 'spawnInimigoMedio',
            key: 'commando',
            Classe: Commando
        },
        {
            nome: 'spawnInimigoDificil',
            key: 'hellKnight',
            Classe: HellKnight
        }
    ];
    return listaInimigos;
};

Fase_02.prototype.criaLayersTelhados = function () {
    var layersTelhados = [
        this.mapaGlobal.createLayer('telhadoCasa01'),
        this.mapaGlobal.createLayer('telhadoCasa02'),
        this.mapaGlobal.createLayer('telhadoCasa03'),
        this.mapaGlobal.createLayer('telhadoCasa04'),
        this.mapaGlobal.createLayer('telhadoCasa05')
    ];
    return layersTelhados;
};

Fase_02.prototype.passaFase = function () {
    this.game.state.start('fase_03');
};

Fase_02.prototype.update = function () {
    if (this.jogador.vida < 1) {
        this.fimDeJogo();
    }

    this.game.physics.arcade.collide(this.jogador.shadow, this.layerParede);
    this.game.physics.arcade.collide(this.jogador.shadow, this.saida, this.passaFase, null, this);

    this.game.physics.arcade.collide(this.inimigos.shadow, this.layerParede);
    this.game.physics.arcade.collide(this.jogador.shadow, this.inimigos.shadow);

//    this.game.physics.arcade.overlap(this.jogador.shadow, this.grupoPorta, this.macaneta, null, this);

    this.inimigos.sort('y', Phaser.Group.SORT_ASCENDING);
};

Fase_02.prototype.render = function () {
    Calciumtrice.game.debug.text(Calciumtrice.game.time.fps || '--', 2, 14, "#00ff00");
};