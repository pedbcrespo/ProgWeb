/**Conectar com a api feita em python 
 * 
 * Usar o Express
*/

function getProdutos(setFunction){
    fetch('http://localhost:3001/produto')
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
    fetch(`http://localhost:3001/categoria`)
    .then(res=>res.json())
    .then(data=>{
        setFunction(data)
    })
}

function getCarrinho(setFunction){
    fetch('http://localhost:3001/carrinho')
    .then(res=>res.json())
    .then((data)=>{
        setFunction(data)
    })
}

function getProdutoCategoria(setFunction, categoria){
    fetch('http://localhost:3001/carrinho')
    .then(res=>res.json())
    .then((data)=>{
        let data_filtrada = data.filter((prod)=>{
            return prod.categoria === categoria
        })

        setFunction(data_filtrada)
    })
}

export {
    getProdutos,
    getProduto,
    getCarrinho,
    getCategorias,
    getProdutoCategoria,
}