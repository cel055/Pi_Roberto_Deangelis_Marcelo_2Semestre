var Fase_03 = function () {
    Calciumtrice.call(this);
};

Fase_03.prototype = Object.create(Calciumtrice.prototype);

Fase_03.prototype.create = function () {
    this.setFase('fase_03');
    this.iniciaFase();

    this.mapaGlobal = new TileMap(this.game, 'mapa03');

    this.mapaGlobal.addTilesetImage('tileset_tiled', 'grassLandTileset');

    this.layerChao = this.mapaGlobal.createLayer('chao');
    this.layerChaoVisivel = this.mapaGlobal.createLayer('chao');
    this.layerChaoVisivel.alpha = 0.5;
    this.layerParede = this.mapaGlobal.createLayer('paredes');
    
    this.telhados();

    this.layerChao.resizeWorld();

    this.mapaGlobal.setCollisionBetween(1, 1000, true, 'paredes');

    this.criaPathFinder(this.mapaGlobal.layer.data, [7, 4]);

    this.grupoPorta = this.game.add.group();
    this.criaPortas('porta', this.mapaGlobal);

    this.saida = this.mapaGlobal.createFromObject('objetos', 5, 'porta');
    this.game.physics.arcade.enable(this.saida);
    this.saida.enableBody = true;

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
    this.criaInimigos(listaInimigos);

    this.jogador = this.mapaGlobal.createFromObject('objetos', 9, 'heroi', 0, true, true, Jogador);
    this.jogador.cria(this.layerParede, this.tirosJogador, this.vidaJogador);
    this.jogador.setGroupInimigos(this.inimigos);

    this.criaHud();
    this.setAlvoDosInimigos(this.jogador.shadow, this.inimigos);
    this.aplicaMascara(this.jogador.luz, [this.layerChao, this.inimigos]);
    this.jogador.setHud(this.tirosJogador, this.vidaJogador);
};

Fase_03.prototype.telhados = function () {
    this.layersTelhados = [
        this.mapaGlobal.createLayer('telhadoCasa01'),
        this.mapaGlobal.createLayer('telhadoCasa02'),
        this.mapaGlobal.createLayer('telhadoCasa03'),
        this.mapaGlobal.createLayer('telhadoCasa04'),
        this.mapaGlobal.createLayer('telhadoCasa05'),
        this.mapaGlobal.createLayer('telhadoCasa06'),
        this.mapaGlobal.createLayer('telhadoCasa07'),
        this.mapaGlobal.createLayer('telhadoCasa08'),
        this.mapaGlobal.createLayer('telhadoCasa09'),
        this.mapaGlobal.createLayer('telhadoCasa10'),
        this.mapaGlobal.createLayer('telhadoCasa11'),
        this.mapaGlobal.createLayer('telhadoCasa12'),
        this.mapaGlobal.createLayer('telhadoCasa13'),
        this.mapaGlobal.createLayer('telhadoCasa14'),
        this.mapaGlobal.createLayer('telhadoCasa15'),
        this.mapaGlobal.createLayer('telhadoCasa16'),
        this.mapaGlobal.createLayer('telhadoCasa17'),
        this.mapaGlobal.createLayer('telhadoCasa18'),
        this.mapaGlobal.createLayer('telhadoCasa19'),
        this.mapaGlobal.createLayer('telhadoCasa20')
    ];
};

Fase_03.prototype.passaFase = function () {
    this.game.state.start('fase_04');
};

Fase_03.prototype.update = function () {
    if (this.jogador.vida < 1) {
        this.fimDeJogo();
    }

    this.game.physics.arcade.collide(this.jogador.shadow, this.layerParede);
    this.game.physics.arcade.collide(this.jogador.shadow, this.saida, this.passaFase, null, this);

    this.game.physics.arcade.collide(this.inimigos.shadow, this.layerParede);
    this.game.physics.arcade.collide(this.jogador.shadow, this.inimigos.shadow);

    this.game.physics.arcade.overlap(this.jogador.shadow, this.grupoPorta, this.macaneta, null, this);

    this.inimigos.sort('y', Phaser.Group.SORT_ASCENDING);
};

Fase_03.prototype.render = function () {
    Calciumtrice.game.debug.text(Calciumtrice.game.time.fps || '--', 2, 14, "#00ff00");
};