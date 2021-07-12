import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    
})
//===================GET======================//
//Busca todos os produtos
function getProdutos(setFunction) {
    fetch('http://localhost:5000/produtos')
        .then(res => res.json())
        .then((data) => {
            setFunction(data);
        })
}
//Busca um produto em especifico
function getProduto(ident, setFunction) {
    fetch(`http://localhost:5000/produto/${ident}`)
        .then(res => res.json)
        .then(data => {
            setFunction(data)
        })
}
//Busca todas as categorias
function getCategorias(setFunction) {
    fetch(`http://localhost:5000/categorias`)
        .then(res => res.json())
        .then(data => {
            setFunction(data)
        })
}
//mostra todas as compras registradas
function getTodasCompras(setFunction) {
    fetch('http://localhost:5000/todas_compras')
        .then(res => res.json())
        .then((data) => {
            setFunction(data)
        })
}
//Busca o carrinho de um determinado cliente
function getCarrinho(setFunction, id_cliente){
    fetch(`http://localhost:5000/carrinho/${id_cliente}`)
    .then(res=>res.json())
    .then(setFunction)
}

function getEndereco(setFunction, cep){
    fetch(`https://viacep.com.br/ws/${cep}/json`)
    .then(res=>res.json())
    .then(res=>{
        let endereco = `${res['logradouro']},${res['bairro']},${res['localidade']},${res['uf']}`
        setFunction(endereco)
    })
}

//===================POST========================//
//Envia dados de um novo carrinho
async function postCarrinho(dado){
    return await api.post('/carrinhos', dado).then({'mensagem': "enviado"})
}
//Envia dados de um novo cliente
async function postCliente(dado){
    return await api.post('/clientes', dado).then(res=>{
        console.log(`${dado} => enviado`)
    })
}


//===================PUT========================//
//Altera dados do cliente
async function putCliente(id_cliente, dado){
    return await api.put(`/cliente/${id_cliente}`, dado).then({"mensagem":"atualizado"})
}


//===================DELETE=====================//
//Deleta um produto de um determinado carrinho
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
    getEndereco,

    postCarrinho,
    postCliente,

    putCliente,

    deleteProdutoCarrinho,
}