import React, { useState } from 'react';
import { TextField, Button} from '@material-ui/core';
import { validarUsuario, validarSenha } from '../../models/validacao';

export default function AdmLogin({ valida }) {
    /**Criar context para dados do Adm;
     * Usar materialUI;
     * Reassistir curso da Alura sobre form;
     * Problema no form, tem que clicar 2 vezes para entrar!!!
     */
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    // usar para mostrar erros de cadastro
    const [valUsuario, setValUsuario] = useState({valido:false, texto:""});
    const [valSenha, setValSenha] = useState({valido:false, texto:""});

    function verificar(event){
        event.preventDefault();
        setValUsuario(validarUsuario(usuario));
        setValSenha(validarSenha(senha));

        valida(valUsuario['valido'] && valSenha['valido'])

    }

    return (
        <form onSubmit={verificar}>
            <TextField
                id="campUsuario"
                label="Usuario"
                variant="outlined"
                onChange={(event) => {
                    setUsuario(event.target.value);
                }} 
                />

            <TextField
                id="campSenha"
                label="Senha"
                type="password"
                variant="outlined"
                onChange={(event) => {
                    setSenha(event.target.value);
                }} />
            <Button variant="contained" color="primary" type="submit">
                Entrar
            </Button>
        </form>
    );
}