import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { getProdutos} from '../server/api';
// import { getProdutos} from '../server/api_sim';

export const ProdutoContext = createContext([]);

export default function ProdutoProvider({ children }) {
    const [listaProdutos, setListaProdutos] = useState([])
    const [carregado, setCarregado] = useState(false);

    function carregaDados(){
        if(!carregado){
            getProdutos(setListaProdutos)
            setCarregado(true);
        }
    }

    useEffect(()=>{
        carregaDados()
    }, [listaProdutos, carregado]);
    
    return (
        <ProdutoContext.Provider value={{ listaProdutos, setListaProdutos, }}>
            {children}
        </ProdutoContext.Provider>
    );
}




function useProdutos() {
    const context = useContext(ProdutoContext);
    const {listaProdutos, setListaProdutos} = context;
    return {listaProdutos, setListaProdutos};
}

export {
    useProdutos
}