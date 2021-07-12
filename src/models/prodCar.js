import { postCarrinho, deleteProdutoCarrinho } from '../server/api';

//So esta salvando no banco de dados, mas nao esta renderizando
//precisa mexer no context carrinho


function rmv(setFuncao, lista, id_cliente, indice){
    return (id_produto)=>{
        const copia_lista = Array.from(lista);
        copia_lista.splice(indice, 1);
        setFuncao(copia_lista);
        deleteProdutoCarrinho(id_cliente, id_produto);
    }
}

function add(setFuncao, lista, id_cliente){
    return (dado)=>{
        const nova_lista = [...lista, dado];
        let id_produto = dado.id;
        postCarrinho({"idCliente":id_cliente, "idProduto":id_produto});
        setFuncao(nova_lista);
    }
}

export {
    rmv,
    add
}