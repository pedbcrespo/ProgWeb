/**Conectar com a api feita em python 
 * 
 * Usar o Express
*/

function getProdutos(setFunction){
    fetch('http://localhost:3001/produtos')
    .then(res=>res.json())
    .then((data)=>{
        setFunction(data);
    })
}

function getProduto(ident, setFunction){
    fetch(`http://localhost:3001/produto/${ident}`)
    .then(res=>res.json)
    .then(data=>{
        setFunction(data)
    })
}

function getCategorias(setFunction){
    fetch(`http://localhost:3001/categorias`)
    .then(res=>res.json())
    .then(data=>{
        setFunction(data)
    })
}

function getCarrinho(setFunction){
    fetch('http://localhost:3001/carrinhos')
    .then(res=>res.json())
    .then((data)=>{
        setFunction(data)
    })
}

function postCarrinho(dados){

}

export {
    getProdutos,
    getProduto,
    getCarrinho,
    getCategorias,
    postCarrinho,
}