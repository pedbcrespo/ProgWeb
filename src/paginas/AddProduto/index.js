import React from 'react';
import { useState } from 'react';
import FormProduto from '../../componentes/FormProduto';
export default function AddProduto(){
    
    const [listaProdutos, setListaProdutos] = useState([]);
    
    function id_disponivel(){
        let val = 1;
        for(let i in listaProdutos){
            if( listaProdutos[i].id == val){
                val += 1;
            }
        }
        return val;
    }

    function enviar(dados){
        setListaProdutos([...listaProdutos, dados]);
    }

    return (
        <form>
            <FormProduto enviar={enviar} id={id_disponivel()}/>
        </form>
    );
}