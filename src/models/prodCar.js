import { 
    postCarrinho, 
    deleteProdutoCarrinho, 
    putCompras, 
    postInfoCliente, 
    postProduto, 
    postCategoria,
    putImagemProduto
} from '../server/api';
//Esse modulo fica as funçoes relativas a manipulação dos produtos na aplicação

//So esta salvando no banco de dados, mas nao esta renderizando
//precisa mexer no context carrinho

function rmv(setFuncao, lista, id_cliente, indice) {
    return (id_produto) => {
        const copia_lista = Array.from(lista);
        copia_lista.splice(indice, 1);
        setFuncao(copia_lista);
        deleteProdutoCarrinho(id_cliente, id_produto, indice);
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
    return (num_cartao, dados_cliente) => {
        console.log(num_cartao);
        postInfoCliente(dados_cliente);
        putCompras(idCliente);
        window.location.href = `${urlNome}/`
    }
}

function add_estoque(setFuncao, lista){
    return produto => {
        /**produto deve ser um objeto com os seguintes atributos:
         * nome, categoriaProduto, preco e quantidade
         */
        const novo_produto = {
            nome: produto.nome, 
            categoria:produto.categoriaProduto,
            preco: produto.preco
        };
        const novo_produto_post = {
            nome: produto.nome,
            categoriaProduto: produto.categoriaProduto,
            preco: produto.preco,
            quantidade: produto.quantidade
        };
        const nova_lista = [...lista, novo_produto];
        setFuncao(nova_lista);
        let id_produto = postProduto(novo_produto_post);
        // putImagemProduto(id_produto, produto.arquivoImagem);
        console.log(id_produto);
    }
}

function add_categoria(setFuncao, lista){
    return categoria => {
        const nova_lista = [...lista, categoria];
        setFuncao(nova_lista);
        postCategoria(categoria);
    }
}

export {
    rmv,
    add,
    enviar,
    add_categoria,
    add_estoque
}