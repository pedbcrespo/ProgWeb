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
    const { id_produto_buscado } = useParams();
    var objProduto;

    objProduto = listaProdutos.filter((prod)=>{
        return prod.id === id_produto_buscado
    })[0];

    console.log(objProduto);

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