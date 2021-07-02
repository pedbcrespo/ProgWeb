import React from 'react';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { useListaCateg } from '../context/categoria';


export default function FormProduto({ enviar, id }) {

    const { listaCat } = useListaCateg();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState({})

    function prepararEnviar(event) {
        event.preventDefault();
        enviar({ id, nome, preco, categoria });
    }

    return (
        <form onSubmit={prepararEnviar}>
            <TextField
                id="Nome"
                label="Nome"
                variant="outlined"
                value={nome}
                onChange={(event) => {
                    setNome(event.target.value);
                }} />

            <TextField
                id="Preco"
                label="Preço"
                variant="outlined"
                value={preco}
                onChange={(event) => {
                    setPreco(event.target.value);
                }} />
                {/* consertar, a categoria nao é selecionada */}
            <FormControl variant="outlined" >
                <InputLabel id="Categoria">Categoria</InputLabel>
                <Select 
                    labelId="Categoria"
                    id="Categoria-select"
                >
                
                    {listaCat.map((cat)=>{
                        return <MenuItem value={cat.nome} key={cat.id}>{cat.nome}</MenuItem>
                    })}

                </Select>
            </FormControl>
            <br></br>
            <Button variant="contained" color="primary" type="submit">
                Confirmar
            </Button>
        </form>
    );

}