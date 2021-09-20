import React, { useParams } from 'react';
import Produto from '../../componentes/Produto';
import { useCliente } from '../../context/cliente';
import { add } from '../../models/prodCar';
import { useProdutos } from '../../context/produto';
import { useListaCarrinho } from '../../context/carrinho';
import { ret_prod } from '../../models/prodCar';

export default function ProdutoBuscado() {

    const { listaProdutos } = useProdutos();
    const { lista, setLista } = useListaCarrinho();
    const { idCliente } = useCliente();
    const { id_produto_buscado } = useParams();

    var prod = ret_prod(listaProdutos, id_produto_buscado);

    return (
        <section className="campInicial">
            <section className="campProduto">
                <div key={prod.id}>
                    <Produto
                        id={prod.id}
                        nome={prod.nome}
                        categoria={prod.categoria}
                        preco={prod.preco}
                        imagem={prod.imagem}
                        funcao={add(setLista, lista, idCliente)}
                    />
                </div>
            </section>
        </section>
    );
}