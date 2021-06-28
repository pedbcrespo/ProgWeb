import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Cabecalho from './componentes/Cabecalho';
import CabecalhoAdm from './componentes/CabecalhoAdm';
import Rodape from './componentes/Rodape';
import Inicial from './paginas/Inicial';
import Carrinho from './paginas/Carrinho';
import AdmInicial from './paginas/AdmInicial';
import AdmLogin from './paginas/AdmLogin';
import ListaProvider from './context/carrinho';
import ListaCatProvider from './context/categoria';

/**Criar context para login
 * Problema persistente:
 *  Jogar os dados do carrinho no db.json
 */

function App() {

  const [acesso, setAcesso] = useState(false);

  useEffect(() => {
    console.log(acesso);
  }, [])

  function QualCabecalho() {
    return acesso ? <CabecalhoAdm setAcesso={setAcesso}/> : <Cabecalho />
  }

  function acessoInicialAdm() {
    return acesso ? <AdmInicial /> : <Redirect to="/login" />
  }

  function efetuado(val) {
    setAcesso(val)
    console.log(val)
  }

  return (
    <>
        <Router>
          <ListaCatProvider>
            {QualCabecalho()}
          </ListaCatProvider>
          <ListaProvider>
            <Switch>
              <Route exact path='/'>
                <Inicial />
              </Route>
              <Route path='/carrinho'>
                <Carrinho />
              </Route>
              <Route path="/adm_inicial">
                {acessoInicialAdm()}
              </Route>
              <Route path="/login">
                <AdmLogin valida={efetuado} />
              </Route>
            </Switch>
            <Rodape />
          </ListaProvider>
        </Router>
    </>
  );
}

export default App;
