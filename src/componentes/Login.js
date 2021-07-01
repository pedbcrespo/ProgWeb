import React, { useState }from 'react';
// import { Redirect } from 'react-router';
import { TextField, Button} from '@material-ui/core';
import { preValidaUsuario, preValidaSenha, validarUsuario, validarSenha } from '../models/validacao';
import { useAdmin } from '../context/admin';

export default function Login(){
    
    const {acesso, setAcesso} = useAdmin();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    // usar para mostrar erros de cadastro
    const [valUsuario, setValUsuario] = useState({valido:true, texto:""});
    const [valSenha, setValSenha] = useState({valido:true, texto:""});
    
    function verificar(event){
        event.preventDefault();
        setValUsuario(validarUsuario(usuario));
        setValSenha(validarSenha(senha));
        setAcesso(valUsuario['valido'] && valSenha['valido']);
        console.log(acesso)
    };

    return (
        <form>
            <TextField
                id="campUsuario"
                label="Usuario"
                variant="outlined"
                onChange={(event) => {
                    setUsuario(event.target.value);
                }}
                fullWidth
                error={!valUsuario['valido']}
                onBlur={(event)=>{
                    setValUsuario(preValidaUsuario(usuario))
                }} 
                />

            <TextField
                id="campSenha"
                label="Senha"
                type="password"
                variant="outlined"
                onChange={(event) => {
                    setSenha(event.target.value);
                }} 
                fullWidth
                error={!valSenha['valido']}
                onBlur={(event)=>{
                    setValSenha(preValidaSenha(senha))
                }}/>
            <Button variant="contained" color="primary" type="submit" onClick={verificar}>
                Entrar
            </Button>
        </form>
    );
}