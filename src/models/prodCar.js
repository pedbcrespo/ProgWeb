import { postCarrinho, deleteProdutoCarrinho, getCarrinho } from '../server/api';

//So esta salvando no banco de dados, mas nao esta renderizando
//precisa mexer no context carrinho


function rmv(setFuncao, lista, id_cliente){
    return (indice, id_produto)=>{
        let nova_lista = lista.filter((elem)=>{return elem.indice !== indice});
        deleteProdutoCarrinho(id_cliente, id_produto);
        setFuncao(nova_lista);
        // getCarrinho(setFuncao, id_cliente);
    }
}

function add(setFuncao, lista, id_cliente){
    return (dado)=>{
        const nova_lista = [...lista, dado];
        let id_produto = dado.id;
        postCarrinho({"idCliente":id_cliente, "idProduto":id_produto});
        setFuncao(nova_lista);
        // getCarrinho(setFuncao, id_cliente);
    }
}

export {
    rmv,
    add
}