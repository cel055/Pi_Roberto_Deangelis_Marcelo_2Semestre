var Calciumtrice = function () {
    this.game;
    this.somFase;

    this.easystar;

    this.jogador;
    this.inimigos;

    this.hud;
    this.vidaJogador;
    this.tirosJogador;
    this.somZumbi;
};

Calciumtrice.prototype = Object.create(Object.prototype);
Calciumtrice.prototype.constructor = Calciumtrice;

Calciumtrice.prototype.iniciaBanco = function (_fase) {
    if (!window.localStorage.getItem("fase")) {
        this.setFase(_fase);
    }
};

Calciumtrice.prototype.setFase = function (_fase) {
    window.localStorage.setItem("fase", _fase);
};

Calciumtrice.prototype.getFase = function () {
    return window.localStorage.getItem("fase");
};

Calciumtrice.prototype.iniciaFase = function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.somFase = this.game.add.audio('somFase');
    this.somFase.volume = 0.1;
    this.somFase.loopFull();
};

Calciumtrice.prototype.criaPathFinder = function (dadosLayerTilemap, listaTilesPermitidos) {
    this.easystar = new EasyStar.js();
    var matrix = this.montaMatrixPathFinder(dadosLayerTilemap);
    this.easystar.setGrid(matrix);
    this.easystar.setAcceptableTiles(listaTilesPermitidos);
};

Calciumtrice.prototype.montaMatrixPathFinder = function (propriedadesLayer) {
    var matrixPropriedades = [];
    var countPropriedadesColuna, j, countPropriedadesLinha, i;
    var countPropriedadesLinha = propriedadesLayer.length;
    for (i = 0; i < countPropriedadesLinha; i++) {
        matrixPropriedades[i] = [];
        countPropriedadesColuna = propriedadesLayer[i].length;
        for (j = 0; j < countPropriedadesColuna; j++) {
            matrixPropriedades[i][j] = propriedadesLayer[i][j].index;
        }
    }
    return matrixPropriedades;
};

Calciumtrice.prototype.criaInimigos = function (listaInimigos) {
    var inimigosDoMapa, inimigo;
    this.inimigos = this.game.add.group();
    var i, j, maxI, maxJ;
    for (i = 0, maxI = listaInimigos.length; i < maxI; i++) {
        inimigosDoMapa = this.mapaGlobal.findObjectsByType(listaInimigos[i].nome);
        for (j = 0, maxJ = inimigosDoMapa.length; j < maxJ; j++) {
            inimigo = new listaInimigos[i].Classe(this.game, inimigosDoMapa[j].x, inimigosDoMapa[j].y, listaInimigos[i].key, 0, this.easystar, this.layerChao);
            inimigo.cria();
            inimigo.outOfBoundsKill = true;
            inimigo.checkWorldBounds = true;
            this.inimigos.add(inimigo);
        }
    }
    this.inimigos.sort();
};

Calciumtrice.prototype.criaPortas = function (_tipo, _mapa) {
    var tiledDoors = _mapa.findObjectsByType(_tipo);
    this.doors = {};
    for (var i = 0; i < tiledDoors.length; i++) {
        var doorSprite = _mapa.spriteFromObject(tiledDoors[i], this.grupoPorta);
        this.doors[doorSprite.properties.casa] = new Door(this.game, doorSprite);
    }
    Door.init(this.game);
};

Calciumtrice.prototype.aplicaMascara = function (graficoDaMascara, listaElementos) {
    var size = listaElementos.length;
    for (var i = 0; i < size; i++) {
        if (listaElementos[i] instanceof Phaser.Group) {
            listaElementos[i].forEach(function (sprite) {
                sprite.mask = graficoDaMascara;
            }, this);
        } else {
            listaElementos[i].mask = graficoDaMascara;
        }
    }
};

Calciumtrice.prototype.criaHud = function () {
    this.hud = this.game.add.sprite(50, 400, 'hud');
    this.hud.scale.set(0.6);
    this.hud.fixedToCamera = true;

    this.vidaJogador = this.game.add.text(76, 502, '100/100', {font: "24px Arial", fill: "#fdb317", align: "center"});
    this.vidaJogador.fixedToCamera = true;

    this.tirosJogador = this.game.add.text(76, 442, '25', {font: "24px Arial", fill: "#fdb317", align: "center"});
    this.tirosJogador.fixedToCamera = true;
};

Calciumtrice.prototype.setAlvoDosInimigos = function (alvo, inimigos) {
    if (inimigos instanceof Phaser.Group) {
        inimigos.forEach(function (inimigo) {
            inimigo.setAlvoDoInimigo(alvo);
        }, this);
        return;
    }
    for (var i = 0; i < inimigos.length; i++) {
        inimigos[i].setAlvoDoInimigo(alvo);
    }
};

Calciumtrice.prototype.macaneta = function (player, doorSprite) {
    var door = this.doors[doorSprite.properties.casa];
    for (var i = 0; i < this.layersTelhados.length; i++) {
        if (this.layersTelhados[i].layer.name == doorSprite.properties.telhado) {
            door.overlapTrigger(player);
            this.layersTelhados[i].alpha = door.delta;
        }
    }
};

Calciumtrice.prototype.fimDeJogo = function () {
    this.somFase.pause();
    var telaFimDeJogo = this.game.add.sprite(0, 0, "faleceu");
    telaFimDeJogo.fixedToCamera = true;
    telaFimDeJogo.alpha = 0.01;
    this.game.add.tween(telaFimDeJogo).to({alpha: 0.5}, 2000, "Linear", true);
    this.game.time.events.add(Phaser.Timer.SECOND * 3, function () {
        telaFimDeJogo.destroy();
        this.somFase.destroy();
        this.state.start('faleceuState');
    }, this);
};