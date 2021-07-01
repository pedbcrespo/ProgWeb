import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cabecalho from './componentes/Cabecalho';
import Rodape from './componentes/Rodape';
import Adm from './componentes/Adm';
import Inicial from './paginas/Inicial';
import Carrinho from './paginas/Carrinho';
import AdmLogin from './paginas/AdmLogin';
import CategoriaEsp from './paginas/CategoriaEsp';
import ListaProvider from './context/carrinho';
import ListaCatProvider from './context/categoria';
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
                {/* <Route path="/adm/:caminho" children={<Adm/>}></Route> */}
                <Adm/>
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
