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

function acessoAdm(validacao, pagina1, pagina2){
    return validacao ? pagina1 : pagina2;
}


export {
    validarUsuario,
    validarSenha,
    validarCep,
    validarCartao,
    acessoAdm
}