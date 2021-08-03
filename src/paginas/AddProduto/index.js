import React from 'react';
import FormProduto from '../../componentes/FormProduto';
import { useProdutos } from '../../context/produto';
import { add_estoque } from '../../models/prodCar';
export default function AddProduto(){
    
    /**Jogar os dados direto no banco de dados*/

    const { listaProdutos, setListaProdutos } = useProdutos()

    return(
        <form>
            <FormProduto enviar={add_estoque(setListaProdutos, listaProdutos)} />
        </form>
    );
}