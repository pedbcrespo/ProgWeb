import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { geradorId } from '../models/dadosCliente';
import { get_id_cliente } from '../server/api';

export const ClienteContext = createContext([]);

export default function ClienteProvider({ children }) {
    const [cliente, setCliente] = useState({id:geradorId() , email:'', endereco:'', cep:''})

    useEffect(()=>{
        console.log(`context cliente: ${cliente['id']}`)
    }, [])

    return (
        <ClienteContext.Provider value={{cliente, setCliente}}>
            {children}
        </ClienteContext.Provider>
    );
}

function useCliente() {
    const context = useContext(ClienteContext);
    const { cliente, setCliente } = context;
    return { cliente, setCliente };
}

export {
    useCliente
}