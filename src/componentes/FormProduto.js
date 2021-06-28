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

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                >
                    {listaCat.map((cat, indice)=>{
                        return (
                            <MenuItem value={cat} key={indice}>{cat}</MenuItem>
                        );
                    })}
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
            </FormControl>
            <br></br>
            <Button variant="contained" color="primary" type="submit">
                Confirmar
            </Button>
        </form>
    );

}