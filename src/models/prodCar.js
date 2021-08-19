import {
    postCarrinho,
    deleteProdutoCarrinho,
    putCompras,
    postInfoCliente,
    postProduto,
    postCategoria,
    postImagemProduto,
    deleteProduto,
    getCategorias,
    getProdutos,
    putProduto
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


function add_estoque(setFuncao, lista) {
    return produto => {
        const {nome, categoria, preco, quantidade, arquivoImagem} = produto;

        const formData = new FormData();
        formData.append("imagem", arquivoImagem['base64']);
        formData.append("nome", nome);
        formData.append("categoria", categoria);
        formData.append("preco", preco);
        formData.append("quantidade", quantidade);
        postProduto(formData);
        getProdutos(setFuncao);

    }
}



function add_categoria(setLista, lista) {
    return categoria => {
        postCategoria(categoria);
        getCategorias(setLista);
        console.log(lista);
    } 
}

function rmv_produto_estoque(setFuncaoLista, lista, id_produto) {
    const copia_lista = Array.from(lista);
    let indice;
    for (let i in lista) {
        if (lista[i].id === id_produto) {
            indice = i;
            break;
        }
    }
    copia_lista.splice((indice), 1);
    setFuncaoLista(copia_lista);
    deleteProduto(id_produto);
}

function atualiza_produto(setFuncao, lista, id_produto) {
    return (objeto_produto) => {

        const copia_lista = Array.from(lista);
        // // for (let i in copia_lista) {
        // //     if (copia_lista[i].id === id_produto) {
        // //         copia_lista[i].nome = objeto_produto.nome;
        // //         copia_lista[i].preco = objeto_produto.preco;
        // //         break;
        // //     }
        // // }
        putProduto(setFuncao, id_produto, objeto_produto);
    }
}

export {
    rmv,
    rmv_produto_estoque,
    atualiza_produto,
    add,
    enviar,
    add_categoria,
    add_estoque
}