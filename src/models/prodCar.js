import { postCarrinho, deleteProdutoCarrinho, putCompras, postInfoCliente } from '../server/api';

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
        console.log(dados_cliente);
        postInfoCliente(dados_cliente);
        putCompras(idCliente);
        window.location.href = `${urlNome}/`
    }
}
function converteImagem(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export {
    rmv,
    add,
    enviar,
    converteImagem
}