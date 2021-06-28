import React from 'react';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import { useListaCateg } from '../context/categoria';


export default function FormProduto({ enviar, id }) {

    const {listaCat} = useListaCateg();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState('');

    function prepararEnviar(event) {
        event.preventDefault();
        enviar({ id, nome, preco, categoria });
    }

    return (
        <form onSubmit={prepararEnviar}>
            <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                onChange={(event) => {
                    setNome(event.target.value);
                }} />

            <TextField
                id="outlined-basic"
                label="Preço"
                variant="outlined"
                onChange={(event) => {
                    setPreco(event.target.value);
                }} />
            <br></br>
            <Button variant="contained" color="primary" type="submit">
                Confirmar
            </Button>
        </form>
    );

}