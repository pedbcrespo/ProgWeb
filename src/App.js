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
// import { inicializaSessao } from './models/dadosCliente';
import Providers from './componentes/Providers';

export default function App() {

  // const [sessao, setSessao] = useSessao();
  // const { cliente } = useCliente();

  return (
    <>
      <Router>
        <Providers>

          {/**A ideia é que, na primeira vez que rode, da um post, enviando os dados
               * do cliente vazios, apenas com o id. Apos o final da compra, a sessao é finalizada
               * e o id da nova sessao é gerado.
               */}
          {/* {inicializaSessao(setSessao, cliente, sessao)} */}

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

        </Providers>
      </Router>
    </>
  );
}

