var db;
var pronto;

function criaInstancia(){
    db = window.openDatabase("jogo", "1.0", "Jogo", 1000000);
}

function erroSQL(_erro){
    pronto = true;
    console.log("\nERRO SQL\nCod: " + _erro.code + "\nMess: " + _erro.message + "\n");
}

function sucessoSql(trans, rs){
    pronto = true;
    console.log("\nSUCESSO DB\n");
}

function criaBanco(){
    pronto = false;
    db.transaction(criaTabelaJogo);
}

function criaTabelaJogo(trans){
    trans.executeSql("CREATE TABLE IF NOT EXIST jogo(id INTEGER PRIMARY KEY, fase TEXT)", [], sucessoCriaTabela, erroSQL);
}

function sucessoCriaTabela(trans, rs){
    trans.executeSql("SELECT count(*) AS count FROM jogo" , [], numJogosSalvos, erroSQL);
}

function numJogosSalvos(trans, rs){
    if(rs.rows.item(0).count == 0){
        trans.exeucteSql("INSERT INTO jogo(fase) VALUES ('fase1')", sucessoSql, erroSQL);
    }
}

function updateFase(nomeFase){
    pronto = false;
    db.transaction(function(trans){
        trans.executeSql("UPDATE fase SET fase = ?", [nomeFase], sucessoSql, erroSQL);
    });
}

function carregaFase(callback){
    pronto = false;
    db.transaction(function(trans){
        trans.executeSql("SELECT * FROM fase", [], function(trans, rs){
            pronto = true;
            callback(trans, rs);
        }, erroSQL);
    });
}
