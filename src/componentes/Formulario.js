import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
export default function Formulario({ enviar }) {

    const [numCartao, setNumCartao] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');

    function prepararEnviar(event) {
        event.preventDefault();//lembrar de apagar dps
        enviar({ endereco, cep, numCartao });
    }

    // function verificaCep(textCep) {
    //     return textCep.length !== 8;
    // }

    // function verificaNumCartao(cartao) {
    //     return cartao.length !== 16;
    // }

    return (
        <form noValidate autoComplete="off" onSubmit={prepararEnviar}>
            <TextField
                id="standard-basic"
                label="Cartão"
                onChange={(event) => {
                    setNumCartao(event.target.value);
                }} />
            <TextField
                id="standard-basic"
                label="Endereço"
                onChange={(event) => {
                    setEndereco(event.target.value)
                }} />
            <TextField
                id="standard-basic"
                label="Cep"
                onChange={(event) => {
                    setCep(event.target.value)
                }} />
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" type="submit">
                Finalizar Compra
            </Button>
        </form>
    );
}