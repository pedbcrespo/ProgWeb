import React, { useState } from 'react';
import { TextField, Button} from '@material-ui/core';
import { validarUsuario, validarSenha } from '../../models/validacao';

export default function AdmLogin({ valida }) {
    /**Criar context para dados do Adm;
     * Usar materialUI;
     * Reassistir curso da Alura sobre form;
     */
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [valUsuario, setValUsuario] = useState({valido:false, texto:""});
    const [valSenha, setValSenha] = useState({valido:false, texto:""});

    function verificar(event){
        event.preventDefault();
        
    }

    return (
        <form onSubmit={verificar}>
            <TextField
                id="outlined-basic"
                label="Usuario"
                variant="outlined"
                onChange={(event) => {
                    setUsuario(event.target.value);
                }} 
                onBlur={""}
                />

            <TextField
                id="outlined-basic"
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