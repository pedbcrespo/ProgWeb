import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useCliente } from '../context/cliente';
import { validarCartao, validarCep, validarEmail, tam_campo } from '../models/validacao';
import { getEndereco } from '../server/api';


export default function Formulario({ enviar }) {

    const [email, setEmail] = useState('')
    const [numCartao, setNumCartao] = useState('');
    const [cep, setCep] = useState('')
    const [endereco, setEndereco] = useState('')
    const [erroCartao, setErroCartao] = useState({valido:true, texto:""})
    const [erroCep, setErroCep] = useState({valido:true, texto:""})
    const [erroEmail, setErroEmail] = useState({valido:true, texto:""})


    const {idCliente} = useCliente()


    useEffect(()=>{
        console.log(endereco)
    }, [endereco]);

    function prepararEnviar(event) {
        event.preventDefault();
        let dados_cliente = {
            email, 
            endereco, 
            cep, 
            idCliente
        };
        if(erroCartao['valido'] && erroCep['valido'] && erroEmail['valido'])
            enviar(numCartao, dados_cliente);
        else{
            let erro = '';
            let lista_erro = [erroCartao, erroEmail, erroCep];
            for(let i in lista_erro){
                erro = ! lista_erro[i]['valido'] ? `${lista_erro[i]['texto']}\n` : '';
            }
            window.alert(erro);
        }
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
                    tam_campo(16, event.target.value);
                }}
                error={!erroCartao['valido']}
                onBlur={()=>{
                    setErroCartao(validarCartao(numCartao))
                }} 
                fullWidth/>
            <TextField
                id="Endereco"
                label="Endereço"
                value={endereco}
                onChange={(event) => {
                    setEndereco(event.target.value)
                }} 
                fullWidth/>
            <TextField
                id="Cep"
                label="Cep"
                onChange={(event) => {
                    setCep( event.target.value);
                    tam_campo(8, event.target.value);
                }}

                error={!erroCep['valido']}
                onBlur={()=>{
                    setErroCep(validarCep(cep))
                }} 
                />
                <Button 
                    onClick={()=>{
                        if(cep.length === 8){
                            getEndereco(setEndereco, cep);
                        }                
                }}
                variant="contained"
                >Buscar</Button>
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" type="submit">
                Finalizar Compra
            </Button>
        </form>
    );
}