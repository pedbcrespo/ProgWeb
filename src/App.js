import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cabecalho from './componentes/Cabecalho';
import Rodape from './componentes/Rodape';
import Adm from './componentes/Adm';
import Inicial from './paginas/Inicial';
import Carrinho from './paginas/Carrinho';
import AdmLogin from './paginas/AdmLogin';
import CategoriaEsp from './paginas/CategoriaEsp';
import ProdutoBuscado from './paginas/ProdutoBuscado';
import { useSessao } from './context/sessao';
import { inicializaSessao } from './models/dadosCliente';
import { useEffect } from 'react';

export default function App() {

  const { sessao, setSessao } = useSessao();

  useEffect(() => {
    inicializaSessao(setSessao, sessao);
  }, [setSessao, sessao]);


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

          <Route exact path="/produto_buscado/:id_produto_buscado" children={<ProdutoBuscado />}></Route>
          
          <Route path="/categoria/:categoria" children={<CategoriaEsp />}></Route>
          
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

