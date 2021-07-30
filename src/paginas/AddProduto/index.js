import React from 'react';
import FormProduto from '../../componentes/FormProduto';
import { useProdutos } from '../../context/produto';
import { add_estoque } from '../../models/prodCar';
export default function AddProduto(){
    
    /**Jogar os dados direto no banco de dados*/

    const { listaProdutos, setListaProdutos } = useProdutos()

    function id_disponivel(){
        let val = 1;
        for(let i in listaProdutos){
            if( listaProdutos[i].id === val){
                val += 1;
            }
        }
        return val;
    }

    return(
        <form>
            <FormProduto enviar={add_estoque(setListaProdutos, listaProdutos)} />
        </form>
    );
}