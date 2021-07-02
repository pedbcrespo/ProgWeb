import React from 'react';
import FormProduto from '../../componentes/FormProduto';
import { useProdutos } from '../../context/produto';
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

    function enviar(novo_produto){
        setListaProdutos([...listaProdutos, novo_produto]);
    }

    return(
        <form>
            <FormProduto enviar={enviar} id={id_disponivel()}/>
        </form>
    );
}