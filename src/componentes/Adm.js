import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CabecalhoAdm from '../componentes/CabecalhoAdm';
import AdmInicial from '../paginas/AdmInicial';
import AddCategoria from '../paginas/AddCategoria';
import AddProduto from '../paginas/AddProduto';
// import ListaCatProvider from '../context/categoria';
import { useAdmin } from '../context/admin';

export default function Adm() {
    const { acesso } = useAdmin();

    return acesso? (
        <>
            <Router>
                <Switch>
                    <Route path='/inicial'>
                        <AdmInicial />
                    </Route>
                    <Route path="/add_categoria">
                        <AddCategoria />
                    </Route>
                    <Route path="/add_produto">
                        <AddProduto />
                    </Route>
                </Switch>
            </Router>

        </>
    ) : <Redirect to="/login"/>
}