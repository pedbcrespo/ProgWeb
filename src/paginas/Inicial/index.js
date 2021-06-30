import React, { useEffect, useState } from 'react';
import Produto from '../../componentes/Produto';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import { getProdutos } from '../../server/api';
import { useListaCarrinho } from '../../context/carrinho';

export default function Inicial() {

    const [listaProdutos, setListaProdutos] = useState([])
    const { lista, setLista } = useListaCarrinho();

    useEffect(() => {
        getProdutos(setListaProdutos)
    }, []);

    function add(dado) {
        setLista([...lista, dado]);
        console.log(lista)
    }
    /**Colocar essa funçao em uma pasta separada pois sera usada em componentes diferentes */
    function rmv(indice){
        let nova_lista = lista;
        nova_lista.splice(indice, 1);
        console.log(nova_lista);
        setLista(nova_lista);
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
                                funcao={add} 
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
                                funcao={rmv}
                            />
                        </li>
                    })}
                </ul>

            </aside>
        </section>
    )
}