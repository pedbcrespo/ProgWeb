import React, { useParams } from 'react';
import Produto from '../../componentes/Produto';
import { useCliente } from '../../context/cliente';
import { add } from '../../models/prodCar';
import { useProdutos } from '../../context/produto';
import { useListaCarrinho } from '../../context/carrinho';


export default function ProdutoBuscado(){

    const { listaProdutos } = useProdutos();
    const { lista, setLista } = useListaCarrinho();
    const { idCliente } = useCliente();
    const { id_produto } = useParams();
    var objProduto;
    var novo_produto = id_produto;

    objProduto = listaProdutos.filter((prod)=>{
        return prod.id === id_produto
    })[0];

    return (
        <section className="campInicial">
            <section className="campProduto">
                <Produto
                    id={objProduto.id}
                    nome={objProduto.nome}
                    categoria={objProduto.categoriaProduto}
                    preco={objProduto.preco}
                    imagem = {objProduto.imagem}
                    funcao={add(setLista, lista, idCliente)}
                />
            </section>
        </section>
    );
}