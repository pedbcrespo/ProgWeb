import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';

export const listaContext = createContext([]);

export default function ListaProvider({ children }) {
    const [lista, setLista] = useState([])

    useEffect(()=>{
        console.log(lista)
    },[])

    return (
        <listaContext.Provider value={{ lista, setLista, }}>
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