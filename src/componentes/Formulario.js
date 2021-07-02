import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
// import { validarCartao, validarCep } from '../models/validacao';
export default function Formulario({ enviar }) {

    const [numCartao, setNumCartao] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    
    function prepararEnviar(event) {
        event.preventDefault();//lembrar de apagar dps
        enviar({ endereco, cep, numCartao });
    }

    return (
        <form noValidate autoComplete="off" onSubmit={prepararEnviar}>
            <TextField
                id="Cartao"
                label="Cartão"
                onChange={(event) => {
                    setNumCartao(event.target.value);
                }} 
                fullWidth/>
            <TextField
                id="Endereco"
                label="Endereço"
                onChange={(event) => {
                    setEndereco(event.target.value)
                }} 
                fullWidth/>
            <TextField
                id="Cep"
                label="Cep"
                onChange={(event) => {
                    setCep(event.target.value)
                }} 
                fullWidth/>
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" type="submit">
                Finalizar Compra
            </Button>
        </form>
    );
}