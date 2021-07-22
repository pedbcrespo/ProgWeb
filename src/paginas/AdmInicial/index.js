import React from 'react';
import AdmProduto from '../../componentes/AdmProduto';
import { useProdutos } from '../../context/produto';

export default function AdmInicial() {

    const {listaProdutos, setListaProdutos} = useProdutos();

    return (
        <>
            {listaProdutos.map((produto, index)=>{
                return <div key={index}>
                    <AdmProduto
                        id={produto.id}
                        nome={produto.nome}
                        categoria={produto.categoria}
                        preco={produto.preco}
                    />
                </div>
            })}
        </>
    );
}