function getProdutos(setFunction) {
    fetch('http://localhost:5000/produtos')
        .then(res => res.json())
        .then((data) => {
            setFunction(data);
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
    .then(res=>res.json())
    .then(setFunction)
}

export {
    getProdutos,
    getCategorias,
    getCarrinho,

}