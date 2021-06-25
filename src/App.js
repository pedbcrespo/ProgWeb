import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Carrinho from './paginas/Carrinho';
import Cabecalho from './componentes/Cabecalho';
import Inicial from './paginas/Inicial';
import ListaProvider from './context/carrinho';

/**Problema persistente:
 * Jogar os dados do carrinho no db.json
 */

function App() {
  return (
    <>
      <ListaProvider>
        <Router>
          <Cabecalho />
          <Switch>
            <Route exact path='/'>
              <Inicial />
            </Route>
            <Route path='/carrinho'>
              <Carrinho />
            </Route>
          </Switch>
        </Router>
      </ListaProvider>
    </>
  );
}

export default App;
