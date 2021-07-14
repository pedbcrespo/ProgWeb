import { postCliente } from '../server/api';

function geradorId(lista) {
    let id = Math.floor(Math.random()*10000) - Math.floor(Math.random()*1000) + Math.floor(Math.random()*1000);
        
    if(id < 0){
        id *= -1;
    }
    return id;
}

function inicializaSessao(setFunctionValidacao, idCliente, validacao){
    if(!validacao){
        setFunctionValidacao(true);
        postCliente({id:idCliente});
    }
}

export {
    geradorId,
    inicializaSessao,
}