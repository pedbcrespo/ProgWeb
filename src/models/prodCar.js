import { postCarrinho, deleteProdutoCarrinho, putCompras, postInfoCliente, postProduto, postCategoria } from '../server/api';
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
    return (num_cartao, dados_cliente) => {
        //atualiza os dados do cliente, finaliza a compra e salva no banco de dados
        //dados_cliente = {email, endereco, cep, cliente_id}
        console.log(num_cartao);
        postInfoCliente(dados_cliente);
        putCompras(idCliente);
        window.location.href = `${urlNome}/`
    }
}
// function converteImagem(url, filename, mimeType){
//     mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
//     return (fetch(url)
//         .then(function(res){return res.arrayBuffer();})
//         .then(function(buf){return new File([buf], filename, {type:mimeType});})
//     );
// }

function converteImagem(url){
    var imagem = new Image();
    imagem.src = url;
    document.body.appendChild(imagem);
    return imagem;
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
        const nova_lista = [...lista, novo_produto];
        setFuncao(nova_lista);
        postProduto(produto);
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
    converteImagem,
    add_categoria,
    add_estoque
}