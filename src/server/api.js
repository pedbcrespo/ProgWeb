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

function getImagemProduto(setFunction, id_produto){
    fetch(`http://localhost:5000/imagem_produto/${id_produto}/`)
    .then(res => res.json)
    .then(data => {
        console.log(data)
        // let imagem_convertida = window.atob(data["imagem"])
        // setFunction(imagem_convertida)
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
    // fetch('http://localhost:5000/todas_compras')
    fetch('http://localhost:5000/carrinhos')
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

//Envia dados de um novo cliente, só o id
async function postCliente(dado){
    return await api.post('/clientes', dado).then(res=>{
        console.log(res.data)
    })
}

//Envia os dados mais detalhados do cliente, como o email e o endereço
async function postInfoCliente(dados_cliente){
    return await api.post('/info_cliente', dados_cliente).then(res=>{
        console.log(res.data)
    })
}

//===================PUT========================//
//Altera dados do cliente
async function putCliente(id_cliente, dado){
    return await api.put(`/cliente/${id_cliente}`, dado).then({"mensagem":"atualizado"})
}

async function putCompras(id_cliente){
    //nesse caso, tanto faz o que vou enviar, nao vou usar porque a unica coisa que vai mudar é o status de finalizado
    //que no caso, ou fica false ou true, entao só há uma unica possibilidade de mudança.
    //portanto, tanto faz o dado que ta sendo enviado.
    return await api.put(`/carrinho/${id_cliente}`, {"finalizado":true}).then(console.log("compra finalizada"))
}

async function putEstoque(id_produto){
    return await api.put(`/estoque/${id_produto}`, {"quantidade":0}).then({"mensagem":"atualizado"})
}
//===================DELETE=====================//
//Deleta um produto de um determinado carrinho
async function deleteProdutoCarrinho(id_cliente, id_produto){
    return await api.delete(`/carrinho_del/${id_cliente}/${id_produto}`).then({"mensagem":"removido"})
}

async function deleteCliente(id_cliente){
    return await api.delete(`/cliente/${id_cliente}`).then({"mensagem":"excluido"})
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

    postCarrinho,
    postCliente,
    postInfoCliente,

    putCliente,
    putCompras,
    putEstoque,

    deleteProdutoCarrinho,
    deleteCliente,
}