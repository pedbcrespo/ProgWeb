import React from 'react';
import Produto from '../../componentes/Produto';
import { useListaCarrinho } from '../../context/carrinho';
import { useCliente } from '../../context/cliente';
import { add } from '../../models/prodCar';
import { useProdutos } from '../../context/produto';

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
                                categoria={prod.categoriaProduto}
                                preco={prod.preco}
                                imagem = {prod.imagem}
                                funcao={add(setLista, lista, idCliente)} 
                                />
                        </div>
                    )
                })}
            </section>
        </section>
    )
}