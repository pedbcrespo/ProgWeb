import React, { useEffect, useState } from 'react';
import Produto from '../../componentes/Produto';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import { getProdutos } from '../../server/api';
import { useListaCarrinho } from '../../context/carrinho';

export default function Inicial() {

    const [listaProdutos, setListaCarrinho] = useState([])
    const { lista, setLista } = useListaCarrinho();

    useEffect(() => {
        getProdutos(setListaCarrinho)
    }, []);

    function add(dado) {
        setLista([...lista, dado]);
        console.log(lista)
    }

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
                                funcao={add} />
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
                                id={prod.id}
                                nome={prod.nome}
                                categoria={prod.categoria}
                                preco={prod.preco}
                            />
                        </li>
                    })}
                </ul>

            </aside>
        </section>
    )
}