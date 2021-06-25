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

function getCarrinho(setFunction){
    fetch('http://localhost:3001/carrinho')
    .then(res=>res.json())
    .then((data)=>{
        setFunction(data)
    })
}

function postCarrinho(ident){

}
/**Para carregar o db.json digite 
 * npx json-server --watch ./src/server/db.json --port 3001*/

export {
    getProdutos,
    getProduto,
    getCarrinho,
    postCarrinho,
}