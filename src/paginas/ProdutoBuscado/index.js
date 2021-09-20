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

    return(
        <>
            <h1>Item Buscado</h1>
        </>
    );
}