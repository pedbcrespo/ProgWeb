import React, { useEffect, useState } from 'react';
import Produto from '../../componentes/Produto';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import { getProdutos } from '../../server/api_sim';
import { useListaCarrinho } from '../../context/carrinho';
import { useParams } from 'react-router-dom';

export default function CategoriaEsp(){
    const [listaProdutos, setListaProduto] = useState([])
    const { lista, setLista } = useListaCarrinho();

    const {categoria} = useParams();

    useEffect(() => {
        getProdutos(setListaProduto);
    }, []);

    function listaPorCategoria(){
        let lista_filtrada = listaProdutos.filter((prod)=>{
            return prod.categoria === categoria
        })
        return lista_filtrada
    }

    function add(dado) {
        setLista([...lista, dado]);
        console.log(lista)
    }

    function rmv(indice){
        lista.splice(indice, 1);
        setLista(lista);
    }

    return (
        <section className="campInicial">
            <section className="campProduto">
                {listaPorCategoria().map((prod) => {
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
    );
}