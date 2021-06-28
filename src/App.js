import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cabecalho from './componentes/Cabecalho';
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
  return (
    <>
      <Router>
        <ListaCatProvider>
          <Cabecalho />
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
              <AdmInicial/>
            </Route>
            <Route path="/login">
              <AdmLogin/>
            </Route>
            <Route>
              
            </Route>
          </Switch>
        </ListaProvider>
      </Router>
    </>
  );
}

export default App;
