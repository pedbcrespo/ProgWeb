import React, { createContext, useState, useContext } from 'react';

export const BuscadoContext = createContext([]);

export default function BuscadoProvider({ children }) {
    const [buscados, setBuscados] = useState(-1);
    
    return (
        <BuscadoContext.Provider value={{ buscados, setBuscados, }}>
            {children}
        </BuscadoContext.Provider>
    );
}




function useBuscados() {
    const context = useContext(BuscadoContext);
    const {buscados, setBuscados} = context;
    return {buscados, setBuscados};
}

export {
    useBuscados
}