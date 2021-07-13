import React from 'react';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import Formulario from '../../componentes/Formulario';
import { useListaCarrinho } from '../../context/carrinho';
import { useCliente } from '../../context/cliente';
import { useUrlNome } from '../../context/urlNome';
import { rmv } from '../../models/prodCar';
import { postInfoCliente, putCompras } from '../../server/api';

export default function Carrinho() {
    /**Ajeitar o CSS*/
    
    const { urlNome } = useUrlNome();
    const { lista, setLista } = useListaCarrinho() 
    const { idCliente } = useCliente();

    function precoTotal() {
        let total = 0;
        for(let i in lista){
            total += lista[i].preco;
        }
        return total.toFixed(2);
    }

    function enviar(num_cartao, dados){
        //atualiza os dados do cliente, finaliza a compra e salva no banco de dados
        console.log(`cliente: ${dados}`)
        postInfoCliente(dados);
        putCompras(idCliente);
        
        window.location.href=`${urlNome}/`
    }

    return (

            <section className="Carrinho-section">
                <section className="campoProduto">
                    {lista.map((produto, indice) => {
                        return (
                            <div key={indice}>
                                <ProdCarrinho
                                    id={produto.id}
                                    nome={produto.nome}
                                    categoria={produto.categoria}
                                    preco={produto.preco}
                                    funcao={rmv(setLista, lista, idCliente, indice)}
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