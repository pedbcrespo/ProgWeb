import React, { useState } from 'react';
import Produto from '../../componentes/Produto';
import { useListaCarrinho } from '../../context/carrinho';
import { useCliente } from '../../context/cliente';
import { add, ret_prod } from '../../models/prodCar';
import { useProdutos } from '../../context/produto';
import { useBuscados } from '../../context/produto_buscado';

export default function Inicial() {

    const { listaProdutos } = useProdutos();
    const { lista, setLista } = useListaCarrinho();
    const { idCliente } = useCliente();
    const { buscados } = useBuscados();

    var produtos_apresetar = listaProdutos;

    if(buscados !== -1){
        let obj = ret_prod(listaProdutos, buscados);
        produtos_apresetar = [obj];
    }

    return (
        <section className="campInicial">
            <section className="campProduto">
                {produtos_apresetar.map((prod) => {
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