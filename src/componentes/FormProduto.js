import React from 'react';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { useListaCateg } from '../context/categoria';
import { validarProduto, validarPreco } from '../models/validacao';

export default function FormProduto({ enviar, id }) {

    const { listaCat } = useListaCateg();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState({});

    const [erroNome, setErroNome] = useState({valido:true, texto:""});
    const [erroPreco, setErroPreco] = useState({valido:true, texto:""});

    function prepararEnviar(event) {
        event.preventDefault();
        setErroNome(validarProduto(nome));
        setErroPreco(validarPreco(preco));
        if(erroNome['valido'] && erronPreco['valido'])
            enviar({ id, nome, preco, categoria });
    }

    return (
        <form onSubmit={prepararEnviar}>
            <TextField
                id="Nome"
                label="Nome"
                variant="outlined"
                value={nome}
                error={!erroNome['valido']}
                onBlur={()=>{
                    setErroNome(validarProduto(nome));
                }}
                onChange={(event) => {
                    setNome(event.target.value);
                }} 
                fullWidth
                />

            <TextField
                id="Preco"
                label="Preço"
                variant="outlined"
                value={preco}
                error={!erroPreco['valido']}
                onBlur={()=>{
                    setErroPreco(validarPreco(preco));
                }}
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