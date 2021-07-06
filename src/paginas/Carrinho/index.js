import React from 'react';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import Formulario from '../../componentes/Formulario';
import { useListaCarrinho } from '../../context/carrinho';
import { rmv } from '../../models/prodCar';
import { useCliente } from '../../context/cliente';
import { putCliente } from '../../server/api';
import { novaSessao } from '../../models/dadosCliente';

export default function Carrinho() {
    /**Ajeitar o CSS*/
    
    const { lista, setLista } = useListaCarrinho() 
    const { cliente, setCliente } = useCliente();

    function precoTotal() {
        let total = 0;
        for(let i in lista){
            total += lista[i].preco;
        }
        return total;
    }

    function enviar(num_cartao){
        console.log(num_cartao)
        //atualiza os dados do cliente, finaliza a compra e salva no banco de dados
        putCliente(cliente['id'], cliente)
        //inicia uma nova sessao
        setCliente(novaSessao())

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
                                    funcao={rmv(setLista, lista, cliente['id'])}
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