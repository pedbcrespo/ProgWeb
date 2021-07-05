import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000'
})
//===================GET======================//
async function get_produtos(){
    return await api.get('/produtos').then(res=>res.data)
}

async function get_categoria(){
    return await api.get('/categorias').then(res=>res.data)
}

async function get_carrinho(){
    return await api.get('/carrinhos').then(res=>res.data)
}

async function get_produtos_carrinho(id_cliente){
    return await api.get(`/carrinho/${id_cliente}`).then(res=>res.data)
}

async function get_id_cliente(setFunction){
    return await api.get('/id_clientes')
    .then(res=>res.data)
    .then(setFunction)
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
function fetchProdutos(setFunction){
    get_produtos().then(res=>{
        setFunction(res)
    })
}

function fetchCategorias(setFunction){
    get_categoria().then(res=>{
        setFunction(res)
    })
}

function fetchCarrinho(setFunction){
    get_carrinho().then(setFunction)
}

function fetchProdutosCarrinho(setFunction, id_cliente){
    get_produtos_carrinho(id_cliente).then(setFunction)
}


export {
    fetchProdutos,
    fetchCategorias,
    fetchCarrinho,
    fetchProdutosCarrinho,
    get_id_cliente,
    postCarrinho,
    postCliente,
    putCliente,
    deleteProdutoCarrinho,
}