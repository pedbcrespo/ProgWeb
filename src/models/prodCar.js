import { postCarrinho } from '../server/api_sim'; 

function rmv(setFuncao, lista){
    return (indice)=>{
        let nova_lista = lista;
        nova_lista.splice(indice, 1);
        setFuncao(nova_lista);
        postCarrinho(nova_lista);
    }
}

function add(setFunction, lista){
    return (dado)=>{
        const nova_lista = [...lista, dado];
        setFunction(nova_lista);
        postCarrinho(nova_lista);
    }
}

export {
    rmv,
    add
}