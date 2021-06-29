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

function postCarrinho(dados){

}
/**Para carregar o db.json digite 
 * npx json-server --watch ./src/server/db.json --port 3001
 *
 * Quando for usar a api, usar Express e porta 5000 
 */

export {
    getProdutos,
    getProduto,
    getCarrinho,
    getCategorias,
    postCarrinho,
}