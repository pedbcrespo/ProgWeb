import { postCarrinho, deleteProdutoCarrinho, putEstoque, putCompras, postInfoCliente } from '../server/api';

//Esse modulo fica as funçoes relativas a manipulação dos produtos na aplicação

//So esta salvando no banco de dados, mas nao esta renderizando
//precisa mexer no context carrinho

function rmv(setFuncao, lista, id_cliente, indice) {
    return (id_produto) => {
        const copia_lista = Array.from(lista);
        copia_lista.splice(indice, 1);
        setFuncao(copia_lista);
        deleteProdutoCarrinho(id_cliente, id_produto);
    }
}

function add(setFuncao, lista, id_cliente) {
    return (dado) => {
        const nova_lista = [...lista, dado];
        let id_produto = dado.id;
        setFuncao(nova_lista);
        postCarrinho({ "idCliente": id_cliente, "idProduto": id_produto });
    }
}

function enviar(carrinho, urlNome, idCliente) {
    return (num_cartao, {id, email, endereco, cep})=>{
        //atualiza os dados do cliente, finaliza a compra e salva no banco de dados
        console.log(num_cartao, {id, email, endereco, cep})
        postInfoCliente({id, email, endereco, cep});
        // putCompras(idCliente);

        // atualizarEstoque(carrinho);
        // window.location.href=`${urlNome}/`
    }
}


function atualizarEstoque(carrinho){
    for(let i in carrinho){
        putEstoque(carrinho[i]['id'])
    }
}

export {
    rmv,
    add,
    enviar,
}