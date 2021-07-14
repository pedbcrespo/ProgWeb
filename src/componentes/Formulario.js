import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useCliente } from '../context/cliente';
import { validarCartao, validarCep, validarEmail } from '../models/validacao';

export default function Formulario({ enviar }) {

    const [email, setEmail] = useState('')
    const [numCartao, setNumCartao] = useState('');
    const [cep, setCep] = useState('')
    const [endereco, setEndereco] = useState('')
    const [erroCartao, setErroCartao] = useState({valido:true, texto:""})
    const [erroCep, setErroCep] = useState({valido:true, texto:""})
    const [erroEmail, setErroEmail] = useState({valido:true, texto:""})


    const {idCliente} = useCliente()


    function prepararEnviar(event) {
        event.preventDefault();//lembrar de apagar dps
        console.log({id:idCliente, email:email, endereco:endereco, cep:cep})
        enviar(numCartao, {id:idCliente, email:email, endereco:endereco, cep:cep})
    }

    return (
        <form noValidate autoComplete="off" onSubmit={prepararEnviar}>
            <TextField
                id="Email"
                label="Email"
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
                error={!erroEmail['valido']}
                onBlur={()=>{
                    setErroEmail(validarEmail(email))
                }} 
                fullWidth/>
            <TextField
                id="Cartao"
                label="Cartão"
                onChange={(event) => {
                    setNumCartao(event.target.value);
                }}
                error={!erroCartao['valido']}
                onBlur={()=>{
                    setErroCartao(validarCartao(numCartao))
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
                    setCep( event.target.value);
                }}
                error={!erroCep['valido']}
                onBlur={()=>{
                    setErroCep(validarCep(cep))
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