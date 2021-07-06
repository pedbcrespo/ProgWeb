// import { postCarrinho, deleteCarrinho } from '../server/api_sim'; 
import { postCarrinho, deleteProdutoCarrinho } from '../server/api';

function rmv(setFuncao, lista, id_cliente){
    return (indice)=>{
        let nova_lista = lista;
        let id_produto = lista[indice]['id'];
        nova_lista.splice(indice, 1);
        setFuncao(nova_lista);//quando usar a api, essa funçao sera desnecessaria
        deleteProdutoCarrinho(id_cliente, id_produto);
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