import axios from 'axios'

const urlBackEnd = 'https://prog-web-back-end.herokuapp.com';

const api = axios.create({
// tera de ser alterado no heroku
// antigo: http://localhost:5000
    baseURL: urlBackEnd,
})
//===================GET======================//
//Busca todos os produtos
function getProdutos(setFunction) {
    fetch(`${urlBackEnd}/produtos`)
        .then(res => res.json())
        .then((data) => {
            setFunction(data);
        })
}

//Busca um produto em especifico
//a rota foi excluida
function getProduto(ident, setFunction) {
    fetch(`${urlBackEnd}/produtos/${ident}`)
        .then(res => res.json())
        .then(data => {
            setFunction(data)
        })
}

function getImagemProduto(setFunction, id_produto) {
    fetch(`${urlBackEnd}/imagem/${id_produto}`)
        .then(res => res.json())
        .then(data => setFunction(data.imagem))
}

//Busca todas as categorias
function getCategorias(setFunction) {
    fetch(`${urlBackEnd}/categorias`)
        .then(res => res.json())
        .then(data => {
            setFunction(data)
        })
}

//mostra todas as compras registradas
function getTodasCompras(setFunction) {

    fetch(`${urlBackEnd}/carrinhos`)
        .then(res => res.json())
        .then((data) => {
            setFunction(data)
        })
}

//Busca o carrinho de um determinado cliente
function getCarrinho(setFunction, id_cliente) {

    fetch(`${urlBackEnd}/carrinho/${id_cliente}`)
        .then(res => res.json())
        .then(setFunction)
}

function getEndereco(setFunction, cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(res => res.json())
        .then(res => {
            let endereco = `${res['logradouro']},${res['bairro']},${res['localidade']},${res['uf']}`
            setFunction(endereco)
        })
}

function getInfoCliente(setFunction, id_cliente) {
    fetch(`${urlBackEnd}/dados_cliente/${id_cliente}`)
        .then(res => res.json())
        .then(setFunction)
}

function getTodoEstoque(setFunction) {
    fetch(`${urlBackEnd}/estoque`)
        .then(res => res.json())
        .then(setFunction)
}

function getTodasInfoCliente(setFunction) {
    fetch(`${urlBackEnd}/info_cliente`)
        .then(res => res.json())
        .then(setFunction)
}

function getClientes(setFunction) {
    fetch(`${urlBackEnd}/clientes`)
        .then(res => res.json())
        .then(setFunction)
}

function finalizarCompra(id_cliente){
    fetch(`${urlBackEnd}/finalizar_compra/${id_cliente}`)
    .then(res=>res.data)
}
//===================POST========================//
//Envia dados de um novo carrinho
async function postCarrinho(dado) {
    return await api.post('/carrinhos', dado)
    .then(res=>res.data)
}

//Envia dados de um novo cliente, só o id
async function postCliente(dado) {
    return await api.post('/clientes', dado).then(res => res.data)
}

//Envia os dados mais detalhados do cliente, como o email e o endereço
async function postInfoCliente(dados_cliente) {
    return await api.post('/info_cliente', dados_cliente).then(res => {
        console.log(res.data)
    })
}

async function postProduto(dado) {
    return await api.post('/produtos', dado, {
        headers:{
            'Content-Type': `multipart/form-data; boundary=${dado._boundary}`
        }
    })
        .then(res => res.data)
        .then(console.log)
}

async function postCategoria(dado) {
    // dado tem que ser um OBJETO
    return await api.post("/categorias", dado)
        .then(res => { console.log(res.data) })
}

//===================PUT========================//
async function putProduto(setFunction, id_produto, obj_alteracoes){
    return await api.put(`/produto/${id_produto}`, obj_alteracoes)
    .then(res=>res.data)
    .then(setFunction)
}

//Altera dados do cliente
async function putCliente(id_cliente, dado) {
    return await api.put(`/cliente/${id_cliente}`, dado)
    .then({ "mensagem": "atualizado" });
}

async function putCompras(id_cliente) {
    //nesse caso, tanto faz o que vou enviar, nao vou usar porque a unica coisa que vai mudar é o status de finalizado
    //que no caso, ou fica false ou true, entao só há uma unica possibilidade de mudança.
    //portanto, tanto faz o dado que ta sendo enviado.
    return await api.put(`/carrinho/${id_cliente}`, { "finalizado": true }).then(console.log("compra finalizada"))
}

async function putEstoque(id_produto) {
    return await api.put(`/estoque/${id_produto}`, { "quantidade": 0 }).then({ "mensagem": "atualizado" })
}
//===================DELETE=====================//
//Deleta um produto de um determinado carrinho
async function deleteProdutoCarrinho(id_cliente, id_produto, indice) {
    return await api.delete(`/carrinho_del/${id_cliente}/${id_produto}/${indice}`).then({ "mensagem": "removido" })
}

async function deleteCliente(id_cliente) {
    return await api.delete(`/cliente/${id_cliente}`).then({ "mensagem": "excluido" })
}

async function deleteProduto(id_produto) {
    return await api.delete(`/produto/${id_produto}`).then({ mensagem: "excluido" })
}
//===================fetchFunctions==============//

export {
    getProdutos,
    getProduto,
    getImagemProduto,
    getTodasCompras,
    getCategorias,
    getCarrinho,
    getEndereco,
    getInfoCliente,
    getTodasInfoCliente,
    getTodoEstoque,
    getClientes,

    postCarrinho,
    postCliente,
    postInfoCliente,
    postProduto,
    postCategoria,

    putProduto,
    putCliente,
    putCompras,
    putEstoque,

    deleteProdutoCarrinho,
    deleteCliente,
    deleteProduto,

    finalizarCompra
}