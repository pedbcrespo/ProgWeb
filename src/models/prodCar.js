// import { postCarrinho, deleteCarrinho } from '../server/api_sim'; 
import { postCarrinho } from '../server/api';

function rmv(setFuncao, lista){
    return (indice)=>{
        //pedir o parametro id_produto
        let nova_lista = lista;
        nova_lista.splice(indice, 1);
        setFuncao(nova_lista);//quando usar a api, essa funçao sera desnecessaria
        // deleteCarrinho(lista[indice].id)
    }
}

function add(setFunction, lista){
    return (dado)=>{
        const nova_lista = [...lista, dado];
        setFunction(nova_lista);
        // o problema pode estar aqui:
        postCarrinho(dado);
    }
}

export {
    rmv,
    add
}