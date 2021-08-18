import React, {useState} from 'react';
import FormProduto from '../../componentes/FormProduto';
import { useProdutos } from '../../context/produto';
import { add_estoque } from '../../models/prodCar';
export default function AddProduto(){
    
    /**Jogar os dados direto no banco de dados*/
    const [id, setId] = useState(-1);
    const { listaProdutos, setListaProdutos } = useProdutos()

    return(<FormProduto enviar={add_estoque(setListaProdutos, listaProdutos)} />);
}