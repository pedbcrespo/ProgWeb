import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';

export const admContext = createContext(false);

export default function AdmProvider({ children }) {
    const [acesso, setAcesso] = useState(false)

    useEffect(()=>{
        
    },[])

    return (
        <admContext.Provider value={{ acesso, setAcesso, }}>
            {children}
        </admContext.Provider>
    );
}




function useAcessoAdm() {
    const context = useContext(admContext);
    const {acesso, setAcesso} = context;
    return {acesso, setAcesso};
}

export {
    useAcessoAdm
}