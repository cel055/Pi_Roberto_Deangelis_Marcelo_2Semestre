function iniciaBanco(_fase1){
    if(!window.localStorage.getItem("fase")){
        setFase(_fase1);
    }
}


function setFase(_fase){
    window.localStorage.setItem("fase", _fase);
}

function getFase(){
    return window.localStorage.getItem("fase");
}
