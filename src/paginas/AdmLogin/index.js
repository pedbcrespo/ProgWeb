import React, { useState } from 'react';
import { TextField, Button} from '@material-ui/core';

export default function AdmLogin({ valida }) {
    /**Criar context para dados do Adm;
     * Usar materialUI;
     * Reassistir curso da Alura sobre form;
     */
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    function verificar(event) {
        event.preventDefault();
        let val = usuario === "admin" && senha === "admin";
        console.log(usuario, senha);
        valida(val);
    }


    return (
        <form onSubmit={verificar}>
            <TextField
                id="outlined-basic"
                label="Usuario"
                variant="outlined"
                onChange={(event) => {
                    setUsuario(event.target.value);
                }} />
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