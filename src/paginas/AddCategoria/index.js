import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useAdmin } from '../../context/admin';
import { Redirect } from 'react-router-dom';

export default function AddCategoria({enviar}){
    
    /**Jogar a atualizacao direto no banco de dados */
    const {acesso} = useAdmin();
    const [nomeCat, setNome] = useState('');
    
    function preEnviar(event){
        event.preventDefault();
        enviar(nomeCat);
    }

    return acesso? (
        <form onSubmit={preEnviar}>
            <TextField 
            id="outlined-basic" 
            label="Categoria" 
            variant="outlined" 
            onChange={(event)=>{
                setNome(event.target.value);
            }}/>
            <br></br>
            <Button variant="contained" color="primary" type="submit">
                Confirmar
            </Button>
        </form>
    ) : <Redirect to="/login"/>;
}