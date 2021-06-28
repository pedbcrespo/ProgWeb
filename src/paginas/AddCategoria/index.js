import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

export default function AddCategoria({enviar}){
    
    const [nomeCat, setNome] = useState('');
    
    function preEnviar(event){
        event.preventDefault();
        enviar(nomeCat);
    }

    return (
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
    );
}