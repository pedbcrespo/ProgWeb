import './App.css';
// import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Cabecalho from './componentes/Cabecalho';
import CabecalhoAdm from './componentes/CabecalhoAdm';
import Rodape from './componentes/Rodape';
import Adm from './componentes/Adm';
import Inicial from './paginas/Inicial';
import Carrinho from './paginas/Carrinho';
import AdmInicial from './paginas/AdmInicial';
import AdmLogin from './paginas/AdmLogin';
// import AddCategoria from './paginas/AddCategoria';
// import AddProduto from './paginas/AddProduto';
import CategoriaEsp from './paginas/CategoriaEsp';
import ListaProvider from './context/carrinho';
import ListaCatProvider from './context/categoria';
import { acessoAdm } from './models/validacao';
import { useAdmin } from './context/admin';
import AdminProvider from './context/admin';

/**
 * Problema persistente:
 *  Jogar os dados do carrinho no db.json
 * 
 * Preciso criar um Context para todos os dados, e nele colocar os dados das api's
 */

function App() {

  return (
    <>
      <Router>
        <AdminProvider>

          <ListaCatProvider>
            <Cabecalho/>
            <ListaProvider>
              <Switch>
                <Route exact path='/'>
                  <Inicial />
                </Route>
                <Route path='/carrinho'>
                  <Carrinho />
                </Route>
                <Route path="/categoria/:categoria" children={<CategoriaEsp />}>
                </Route>
                <Route path="/login">
                  <AdmLogin />
                </Route>
                <Adm />
              </Switch>
              <Rodape />
            </ListaProvider>
          </ListaCatProvider>

        </AdminProvider>
      </Router>
    </>
  );
}

export default App;
