import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cabecalho from './componentes/Cabecalho';
import Rodape from './componentes/Rodape';
import Adm from './componentes/Adm';
import Inicial from './paginas/Inicial';
import Carrinho from './paginas/Carrinho';
import AdmLogin from './paginas/AdmLogin';
import CategoriaEsp from './paginas/CategoriaEsp';
import { useCliente } from './context/cliente';
import { useSessao } from './context/sessao';
import { inicializaSessao } from './models/dadosCliente';
import { useEffect } from 'react';

export default function App() {

  const {idCliente} = useCliente();
  const {sessao, setSessao} = useSessao();

  useEffect(()=>{
    inicializaSessao(setSessao, idCliente, sessao);
  }, [])

  return (
    <>
      <Router>

          <Cabecalho />

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

      </Router>
    </>
  );
}

