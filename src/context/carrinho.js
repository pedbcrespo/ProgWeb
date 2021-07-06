import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { useCliente } from './cliente';
import { fetchProdutosCarrinho } from '../server/api';

//Estou usando o context do cliente aqui!

export const listaContext = createContext([]);

export default function ListaProvider({ children }) {
    const {cliente} = useCliente();
    const [lista, setLista] = useState([])

    useEffect(()=>{
        fetchProdutosCarrinho(setLista, cliente['id']);
    }, [])

    return (
        <listaContext.Provider value={{ lista, setLista}}>
            {children}
        </listaContext.Provider>
    );
}

function useListaCarrinho() {
    const context = useContext(listaContext);
    const {lista, setLista} = context;
    return {lista, setLista};
}

export {
    useListaCarrinho
}