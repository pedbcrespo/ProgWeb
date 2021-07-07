import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000'
})
//===================GET======================//
function getProdutos(setFunction) {
    fetch('http://localhost:5000/produtos')
        .then(res => res.json())
        .then((data) => {
            setFunction(data);
        })
}

function getProduto(ident, setFunction) {
    fetch(`http://localhost:5000/produto/${ident}`)
        .then(res => res.json)
        .then(data => {
            setFunction(data)
        })
}

function getCategorias(setFunction) {
    fetch(`http://localhost:5000/categorias`)
        .then(res => res.json())
        .then(data => {
            setFunction(data)
        })
}

function getTodasCompras(setFunction) {
    fetch('http://localhost:5000/todas_compras')
        .then(res => res.json())
        .then((data) => {
            setFunction(data)
        })
}

function getCarrinho(setFunction, id_cliente){
    fetch(`http://localhost:5000/carrinho/${id_cliente}`)
}

//===================POST========================//
async function postCarrinho(dado){
    return await api.post('/carrinhos', dado).then({'mensagem': "enviado"})
}

async function postCliente(dado){
    //dado precisa ter nome, endereco e cep
    return await api.post('/clientes'. dado).then({"mensagem":"enviado com sucesso"})
}

//===================PUT========================//
async function putCliente(id_cliente, dado){
    return await api.put(`/cliente/${id_cliente}`, dado).then({"mensagem":"atualizado"})
}


//===================DELETE=====================//
async function deleteProdutoCarrinho(id_cliente, id_produto){
    return await api.delete(`/carrinho_del/${id_cliente}/${id_produto}`).then({"mensagem":"removido"})
}

//===================fetchFunctions==============//

export {
    getProdutos,
    getProduto,
    getTodasCompras,
    getCategorias,
    getCarrinho,
    
    postCarrinho,
    postCliente,

    putCliente,

    deleteProdutoCarrinho,
}