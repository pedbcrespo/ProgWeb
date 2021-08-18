import React from 'react';
import Produto from '../../componentes/Produto';
// import ProdCarrinho from '../../componentes/ProdCarrinho';
import { useListaCarrinho } from '../../context/carrinho';
import { useCliente } from '../../context/cliente';
import { add } from '../../models/prodCar';
import { useProdutos } from '../../context/produto';
import { useAdmin } from '../../context/admin';

export default function Inicial() {

    const { listaProdutos } = useProdutos();
    const { lista, setLista } = useListaCarrinho();
    const { idCliente } = useCliente();


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
                                funcao={add(setLista, lista, idCliente)} 
                                />
                        </div>
                    )
                })}
            </section>
        </section>
    )
}