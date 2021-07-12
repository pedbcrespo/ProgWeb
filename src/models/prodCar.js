import { postCarrinho, deleteProdutoCarrinho, getCarrinho } from '../server/api';

//So esta salvando no banco de dados, mas nao esta renderizando
//precisa mexer no context carrinho


function rmv(setFuncao, lista, id_cliente){
    return (id_produto)=>{
        let indice = 0;
        for(let i in lista){
            if(lista[i]['id'] === id_produto){
                indice = i;
                break;
            }
        }
        lista.splice(indice, 1);
        setFuncao(lista);
        deleteProdutoCarrinho(id_cliente, id_produto);
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