import React from 'react';
import FormProduto from '../../componentes/FormProduto';
import { useProdutos } from '../../context/produto';
import { add_estoque } from '../../models/prodCar';
export default function AddProduto(){
    
    const { listaProdutos, setListaProdutos } = useProdutos()

    return(<FormProduto enviar={add_estoque(setListaProdutos, listaProdutos)} />);
}