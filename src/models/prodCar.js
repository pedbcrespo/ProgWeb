import { postCarrinho, deleteProdutoCarrinho } from '../server/api';

//So esta salvando no banco de dados, mas nao esta renderizando
//precisa mexer no context produto

function rmv(setFuncao, lista, id_cliente){
    return (indice, id_produto)=>{
        // let nova_lista = lista;
        // let id_produto = lista[indice]['id'];
        // nova_lista.splice(indice, 1);
        // setFuncao(nova_lista);
        deleteProdutoCarrinho(id_cliente, id_produto);
    }
}

function add(setFunction, lista, id_cliente){
    return (dado)=>{
        // const nova_lista = [...lista, dado];
        let id_produto = dado.id;
        // setFunction(nova_lista);
        postCarrinho({"idCliente":id_cliente, "idProduto":id_produto});
    }
}

export {
    rmv,
    add
}