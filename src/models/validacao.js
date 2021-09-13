function validarUsuario(usuario) {
    if( usuario === "admin"){
        return {valido:true, texto:""}
    }
    return {valido:false, texto:"Usuario invalido"}
}

function validarSenha(senha){
    if(senha === "admin"){
        return {valido:true, texto:""}
    }
    return {valido:false, texto:"Senha invalida"}
}

function validarCep(cep){
    if(cep.length  !== 8){
        return {valido:false, texto:"CEP invalido"}
    }
    return {valido:true, texto:""}
}

function validarCartao(cartao){
    if(cartao.length !== 16){
        return {valido:false, texto:"Cartão invalido"}
    }
    return {valido: true, texto:""}
}

function validarEmail(email){
    if(email.indexOf('@') === -1 || email.length < 4){
        return {valido:false, texto:"email incorreto"}
    }
    return {valido:true, texto:""}
}

function acessoAdm(validacao, pagina1, pagina2){
    return validacao ? pagina1 : pagina2;
}

function preValidaUsuario(usuario){
    if(usuario.length <= 4 && usuario.length > 0){
        return {valido:false, texto:"Minimo de 4 caracteres"}
    }
    return {valido:true, texto:""}
}

function preValidaSenha(senha){
    if(senha.length <= 4 && senha.length > 0){
        return {valido:false, texto:"Senha invalida"}
    }
    return {valido: true, texto:""}
}

function validarProduto(produto){
    return produto.length >= 4 ? {valido:true, texto:""} : {valido:false, texto:"Minimo de 4 caracteres"};
}

function validarPreco(preco){
    return preco >  0? {valido:true, texto:""} : {valido:false, texto:"Valor positivo e maior que 0"};
}

function validarQuantidade(estoque){
    return estoque >= 0 ? {valido:true, texto:""} : {valido:false, texto:"Quantidade tem que ser positiva"};
}

function validarArquivoImagem(arquivo){
    let tipo = arquivo['name'].split('.')[1];

    if(arquivo !== null && ['jpg','png','jpeg', 'jfif'].indexOf(tipo) !== -1){
        return {valido: true, texto: ""}
    }
    return {valido: false, texto: "atribuição invalida"}
}

function tam_campo(limite, valor, setValor){
    if(valor.length > limite){
        let novo_valor = valor.slice(0,limite);
        setValor(novo_valor);
    }
}

export {
    preValidaUsuario,
    preValidaSenha,
    validarUsuario,
    validarSenha,
    validarCep,
    validarCartao,
    validarEmail,
    validarProduto,
    validarPreco,
    validarQuantidade,
    validarArquivoImagem,

    acessoAdm,
    tam_campo
}