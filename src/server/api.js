import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000'
})

async function get_produtos(){
    return await api.get('/produtos').then(res=>res.data)
}

async function get_categoria(){
    return await api.get('/categorias').then(res=>res.data)
}


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

export {
    fetchProdutos,
    fetchCategorias,
}