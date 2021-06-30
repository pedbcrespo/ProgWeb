import React, { useEffect, useState } from 'react';
import Produto from '../../componentes/Produto';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import { getProdutos } from '../../server/api_sim';
import { useListaCarrinho } from '../../context/carrinho';
import { rmv, add } from '../../models/prodCar';

export default function Inicial() {

    const [listaProdutos, setListaProdutos] = useState([])
    const { lista, setLista } = useListaCarrinho();

    useEffect(() => {
        getProdutos(setListaProdutos)
    }, []);

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
                                preco={prod.preco}
                                funcao={add(setLista, lista)} 
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
                                funcao={rmv(setLista, lista)}
                            />
                        </li>
                    })}
                </ul>

            </aside>
        </section>
    )
}