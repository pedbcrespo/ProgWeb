import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useAdmin } from '../../context/admin';
import { Redirect } from 'react-router-dom';
import { add_categoria } from '../../models/prodCar';
import { useListaCateg } from '../../context/categoria';

export default function AddCategoria({ enviar }) {

    /**Jogar a atualizacao direto no banco de dados */
    const { acesso } = useAdmin();
    const [nomeCat, setNome] = useState('');
    const { listaCat, setListaCat } = useListaCateg();

    return acesso ? (
        <div className='CampFormProduto'>
            <form onSubmit={add_categoria(setListaCat, listaCat)}>
                <TextField
                    id="Categoria"
                    label="Categoria"
                    variant="outlined"
                    onChange={(event) => {
                        setNome(event.target.value);
                    }} />
                <br></br>
                <br></br>
                <Button variant="contained" color="primary" type="submit">
                    Confirmar
                </Button>
            </form>
        </div>
    ) : <Redirect to="/login" />;
}