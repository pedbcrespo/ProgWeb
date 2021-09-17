import {
    postCarrinho,
    postInfoCliente,
    postProduto,
    postCategoria,
    deleteProduto,
    getCategorias,
    getProdutos,
    putProduto,
    postCliente,
    finalizarCompra
} from '../server/api';

// Alterar no models e no banco de dados para tirar a coluna finalizado da tabela
// carrinho.

function rmv(setFuncao, lista, id_cliente, indice) {
    return (id_produto) => {
        const copia_lista = Array.from(lista);
        copia_lista.splice(indice, 1);
        setFuncao(copia_lista);
    }
}

function add(setFuncao, lista, id_cliente) {
    return (dado) => {
        const nova_lista = [...lista, dado];
        // let id_produto = dado.id;
        setFuncao(nova_lista);
    }
}

function enviar_carrinho(carrinho, id_cliente) {
    let lista_id_produtos = carrinho.map((prod) => { return prod.id })
    const dados_compras = {
        idCliente: id_cliente,
        lista: lista_id_produtos
    }
    postCarrinho(dados_compras);
}

function finalizar_compras(carrinho, urlNome, idCliente) {
    return (num_cartao, dados_cliente) => {
        postCliente({ "id": idCliente });

        enviar_carrinho(carrinho, idCliente);

        postInfoCliente(dados_cliente);
        finalizarCompra(idCliente);
        window.location.href = `${urlNome}/`
    }
}


function add_estoque(setFuncao, lista) {
    return produto => {
        const { nome, categoria, preco, quantidade, arquivoImagem } = produto;

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
        putProduto(setFuncao, id_produto, objeto_produto);
    }
}

function busca_prod_lista(lista, nome_produto){
    for(i in lista){
        if(lista[i].nome === nome_produto){
            return [lista[i]];
        }
    }

    return [];
}

export {
    rmv,
    rmv_produto_estoque,
    atualiza_produto,
    add,
    finalizar_compras,
    add_categoria,
    add_estoque,
    busca_prod_lista
}