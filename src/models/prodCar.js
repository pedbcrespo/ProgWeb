// import { postCarrinho, deleteCarrinho } from '../server/api_sim'; 
// consumir dados da api

function rmv(setFuncao, lista){
    return (indice)=>{
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
        // postCarrinho(nova_lista);
    }
}

export {
    rmv,
    add
}