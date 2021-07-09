import React from 'react';
import Produto from '../../componentes/Produto';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import { useListaCarrinho } from '../../context/carrinho';
import { useCliente } from '../../context/cliente';
import { rmv, add } from '../../models/prodCar';

import { useProdutos } from '../../context/produto';

export default function Inicial() {

    const { listaProdutos } = useProdutos();
    const { lista, setLista } = useListaCarrinho();
    const { cliente } = useCliente();

    return (
        <section className="campInicial">
            <section className="campProduto">
                {listaProdutos.map((prod) => {
                    return (
                        <div key={prod.id}>
                            <Produto
                                id={prod.id}
                                nome={prod.nome}
                                categoria={prod.categoria}
                                // img={prod.caminhoImagem}
                                preco={prod.preco}
                                funcao={add(setLista, lista, cliente.id)} 
                                />
                        </div>
                    )
                })}
            </section>


            <aside className="campCarrinho">
                <h3>Pré visualização carrinho</h3>
                <ul>

                    {lista.map((prod, indice) => {
                        return <li key={indice} className="prodCarrinho">
                            <ProdCarrinho
                                indice={indice}
                                id={prod.id}
                                nome={prod.nome}
                                categoria={prod.categoria}
                                preco={prod.preco}
                                funcao={rmv(setLista, lista, cliente.id)}
                            />
                        </li>
                    })}
                </ul>

            </aside>
        </section>
    )
}