import React from 'react';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import Formulario from '../../componentes/Formulario';
import { useListaCarrinho } from '../../context/carrinho';
import { useCliente } from '../../context/cliente';
import { useUrlNome } from '../../context/urlNome';
import { rmv, finalizar_compras } from '../../models/prodCar';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { Table } from 'react-bootstrap';

export default function Carrinho() {
    /**Ajeitar o CSS*/

    const { urlNome } = useUrlNome();
    const { lista, setLista } = useListaCarrinho()
    const { idCliente } = useCliente();

    function precoTotal() {
        let total = 0;
        for (let i in lista) {
            total += lista[i].preco;
        }
        return total.toFixed(2);
    }


    return (

        <section className="Carrinho-section">
            <FormControl variant="outlined">
                <InputLabel id="Categoria">Ordenar por</InputLabel>
                <Select
                    labelId="Categoria"
                    id="Categoria-select"
                    onChange={e => {
                        const copia_lista = Array.from(lista);
                        let func;
                        if (e.target.value === 'alfbt_cres') {
                            func = (a, b) => {
                                return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
                            }
                        }
                        else if(e.target.value === 'preco_cres'){
                            func = (a,b)=>{
                                return b.preco - a.preco;
                            }
                        }
                        else{
                            func = (a,b)=>{
                                return a.preco - b.preco;
                            }
                        }
                        copia_lista.sort(func)
                        setLista(copia_lista);
                    }}
                >
                    <MenuItem value={'alfbt_cres'}>A-Z</MenuItem>
                    <MenuItem value={'preco_cres'}>Maior</MenuItem>
                    <MenuItem value={'preco_dcres'}>Menor</MenuItem>

                </Select>
            </FormControl>
            <section className="campoProduto">
                {/* {lista.map((produto, indice) => {
                    return (
                        <div key={indice}>
                            <ProdCarrinho
                                id={produto.id}
                                nome={produto.nome}
                                categoria={produto.categoriaProduto}
                                preco={produto.preco.toFixed(2)}
                                funcao={rmv(setLista, lista, idCliente, indice)}
                            />
                        </div>
                    );
                })} */}

                <Table striped bordered hover variant="dark" className="tabela">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Preço ($)</th>
                            <th>del</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((produto, indice) => {
                            return <tr key={indice}>
                                <td>{produto.nome}</td>
                                <td>{produto.preco.toFixed(2)}</td>
                                <td><Button
                                    onClick={()=>{
                                        rmv(setLista, lista, idCliente, indice)(produto.id);
                                    }}
                                    >X</Button></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <h3>Total: $ {precoTotal()}</h3>
            </section>
            <div className="campFormulario">
                <Formulario enviar={finalizar_compras(lista, urlNome, idCliente)} />
            </div>
        </section>

    );
}