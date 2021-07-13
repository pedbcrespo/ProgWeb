import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { geradorId } from '../models/dadosCliente';

export const ClienteContext = createContext([]);

export default function ClienteProvider({ children }) {
    const [idCliente, setCliente] = useState(geradorId());
    
    useEffect(()=>{
    }, [idCliente]);

    return (
        <ClienteContext.Provider value={{idCliente, setCliente}}>
            {children}
        </ClienteContext.Provider>
    );
}

function useCliente() {
    const context = useContext(ClienteContext);
    const { idCliente, setCliente } = context;
    return { idCliente, setCliente };
}

export {
    useCliente,
};