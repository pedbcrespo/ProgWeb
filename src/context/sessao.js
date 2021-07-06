import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';

export const SessaoContext = createContext([]);

export default function SessaoProvider({ children }) {
    const [sessao, setSessao] = useState(false)

    useEffect(()=>{
        console.log(sessao)
    }, [sessao]);

    return (
        <SessaoContext.Provider value={{ sessao, setSessao, }}>
            {children}
        </SessaoContext.Provider>
    );
}

function useSessao() {
    const context = useContext(SessaoContext);
    const {sessao, setSessao} = context;
    return {sessao, setSessao};
}

export {
    useSessao
}