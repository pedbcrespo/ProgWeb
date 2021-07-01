import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAdmin } from '../../context/admin';
import FormProduto from '../../componentes/FormProduto';
export default function AddProduto(){
    
    /**Jogar os dados direto no banco de dados*/

    const [listaProdutos, setListaProdutos] = useState([]);
    const { acesso } = useAdmin();

    function id_disponivel(){
        let val = 1;
        for(let i in listaProdutos){
            if( listaProdutos[i].id === val){
                val += 1;
            }
        }
        return val;
    }

    function enviar(dados){
        setListaProdutos([...listaProdutos, dados]);
    }
    console.log("Form de produto")
    return(
        <form>
            <FormProduto enviar={enviar} id={id_disponivel()}/>
        </form>
    );
}