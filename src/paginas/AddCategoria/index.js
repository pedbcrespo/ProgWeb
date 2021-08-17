import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useAdmin } from '../../context/admin';
import { Redirect } from 'react-router-dom';
import { add_categoria } from '../../models/prodCar';
import { useListaCateg } from '../../context/categoria';
import { Link } from 'react-router-dom';

export default function AddCategoria({ enviar }) {

    /**Jogar a atualizacao direto no banco de dados */
    const { acesso } = useAdmin();
    const [nomeCat, setNome] = useState('');
    const { listaCat, setListaCat } = useListaCateg();

    function preparar_enviar(e){
        e.preventDefault();
        let categoria = {nome:nomeCat}
        add_categoria(setListaCat, listaCat)(categoria)
    }

    return acesso ? (
        <div className='CampFormProduto'>
            <form>
                <TextField
                    id="Categoria"
                    label="Categoria"
                    variant="outlined"
                    onChange={(event) => {
                        setNome(event.target.value);
                    }} />
                <br></br>
                <br></br>
                <Button variant="contained" color="primary" onClick={preparar_enviar}>
                    <Link to="/adm/inicial" className="linkAlterar">Confirmar</Link>
                </Button>
            </form>
        </div>
    ) : <Redirect to="/login" />;
}