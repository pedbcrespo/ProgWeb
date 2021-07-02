import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import AdmInicial from '../paginas/AdmInicial';
import AddCategoria from '../paginas/AddCategoria';
import AddProduto from '../paginas/AddProduto';
import { useAdmin } from '../context/admin';

export default function Adm() {
    const { acesso } = useAdmin();
    
    return acesso ? (
        <Switch>
            <Route exact path='/adm/inicial' children={<AdmInicial />} />
            <Route exact path="/adm/add_categoria" children={<AddCategoria />} />
            <Route exact path="/adm/add_produto" children={<AddProduto />}/>
        </Switch>

    ) : <Redirect to="/login" />
}