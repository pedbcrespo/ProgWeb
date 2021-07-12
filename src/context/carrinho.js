import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { useCliente } from './cliente';
import { getCarrinho } from '../server/api';

//Estou usando o context do cliente aqui!

export const listaContext = createContext([]);

export default function ListaProvider({ children }) {
    // const {cliente} = useCliente();
    const [lista, setLista] = useState([])

    // function atualiza(){
    //     getCarrinho(setLista, cliente['id']);
    //     console.log(lista)
    // }

    useEffect(()=>{
        console.log(lista);
    }, [lista])



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