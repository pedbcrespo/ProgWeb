import { useState } from 'react';
import { postCliente } from '../server/api';

function geradorId(lista) {
    let id = Math.floor(Math.random()*10000) - Math.floor(Math.random()*1000) + Math.floor(Math.random()*1000);
    if(id < 0){
        id *= -1;
    }
    return id;
}

function novaSessao(setFunction){
    const novo_cliente = {
        id: geradorId(),
        email:'',
        cep:'',
        endereco:''
    };
    setFunction(false);
    return novo_cliente;
}

function inicializaSessao(setFunction, cliente, validacao){
    if(!validacao){
        setFunction(true);
        postCliente(cliente);
    }
}

export {
    geradorId,
    novaSessao,
    inicializaSessao,
}