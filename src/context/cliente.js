import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { geradorId } from '../models/dadosCliente';
import { Verificacao_clientes_inativos } from '../server/api';

export const ClienteContext = createContext([]);

export default function ClienteProvider({ children }) {
    const [idCliente, setCliente] = useState(geradorId());
    
    Verificacao_clientes_inativos(idCliente);
    // useEffect(()=>{
    // }, [idCliente]);

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