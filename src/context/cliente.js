import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { geradorId } from '../models/dadosCliente';

export const ClienteContext = createContext([]);

export default function ClienteProvider({ children }) {
    const [cliente, setCliente] = useState({id:geradorId() , email:'', endereco:'', cep:''});
    const [sessao, setSessao] = useState(false);
    
    useEffect(()=>{
        console.log(`context cliente: ${cliente['id']}`)
    }, []);

    return (
        <ClienteContext.Provider value={{cliente, setCliente, sessao, setSessao}}>
            {children}
        </ClienteContext.Provider>
    );
}

function useCliente() {
    const context = useContext(ClienteContext);
    const { cliente, setCliente } = context;
    return { cliente, setCliente };
}

function useSessao(){
    const context = useContext(ClienteContext);
    const {sessao, setSessao} = context;
    return {sessao, setSessao};
}

export {
    useCliente,
    useSessao,
};