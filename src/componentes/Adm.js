import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import AdmInicial from '../paginas/AdmInicial';
import AddCategoria from '../paginas/AddCategoria';
import AddProduto from '../paginas/AddProduto';
import RegistroCompras from '../paginas/RegistroCompras';
import AdmAlteraProduto from '../paginas/AdmAlteraProduto';
import { useAdmin } from '../context/admin';

export default function Adm() {
    const { acesso } = useAdmin();
    
    return acesso ? (
        <Switch>
            <Route exact path='/adm/inicial' children={<AdmInicial />} />
            <Route exact path="/adm/add_categoria" children={<AddCategoria / >} />
            <Route exact path="/adm/add_produto" children={<AddProduto />}/>
            <Route exact path="/adm/registros" children={<RegistroCompras />}/>
            <Route exact path="/adm/alterar_produto/:produto" children={<AdmAlteraProduto />}/>
        </Switch>

    ) : <Redirect to="/login" />
}

