import React from 'react';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import Formulario from '../../componentes/Formulario';
import { useListaCarrinho } from '../../context/carrinho';
import { rmv } from '../../models/prodCar';

export default function Carrinho() {
    /**Ajeitar o CSS*/
    
    const { lista, setLista } = useListaCarrinho() 

    function precoTotal() {
        let total = 0;
        for(let i in lista){
            total += lista[i].preco;
        }
        return total;
    }

    function enviar(dados){
        console.log(dados);
    }

    return (

            <section className="Carrinho-section">
                <section className="campoProduto">
                    {lista.map((produto) => {
                        return (
                            <div key={produto.id}>
                                <ProdCarrinho
                                    id={produto.id}
                                    nome={produto.nome}
                                    categoria={produto.categoria}
                                    preco={produto.preco}
                                    funcao={rmv(setLista, lista)}
                                />
                            </div>
                        );
                    })}
                    <h3>Total: R$ {precoTotal()}</h3>
                </section>
                <div className="campFormulario">
                    <Formulario enviar={enviar}/>
                </div>
            </section>

    );
}