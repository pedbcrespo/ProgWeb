import { useState } from 'react';
import { get_id_cliente } from '../server/api';

function geradorId(lista) {
    let id = Math.floor(Math.random()*10000) - Math.floor(Math.random()*1000) + Math.floor(Math.random()*1000);
    if(id < 0){
        id *= -1;
    }
    return id;
}

function novaSessao(){
    const novo_cliente = {
        id: geradorId(),
        email:'',
        cep:'',
        endereco:''
    };
    return novo_cliente;
}


export {
    geradorId,
    novaSessao,
}