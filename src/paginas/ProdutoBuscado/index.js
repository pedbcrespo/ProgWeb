import React, { useParams } from 'react';
import Produto from '../../componentes/Produto';
import { useCliente } from '../../context/cliente';
import { add } from '../../models/prodCar';
// import { useProdutos } from '../../context/produto';


export default function ProdutoBuscado(){

    // const { listaProdutos } = useProdutos();
    const { lista, setLista } = useListaCarrinho();
    const { idCliente } = useCliente();
    const { produto } = useParams();

    return (
        <section className="campInicial">
            <section className="campProduto">
                <Produto
                    id={produto.id}
                    nome={produto.nome}
                    categoria={produto.categoriaProduto}
                    preco={produto.preco}
                    imagem = {produto.imagem}
                    funcao={add(setLista, lista, idCliente)}
                />
            </section>
        </section>
    );
}