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
export {
    preValidaUsuario,
    preValidaSenha,
    validarUsuario,
    validarSenha,
    validarCep,
    validarCartao,
    validarEmail,
    acessoAdm
}