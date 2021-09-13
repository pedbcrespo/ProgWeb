import React, { createContext, useState, useContext } from 'react';

export const UrlNomeContext = createContext([]);

export default function UrlProvider({ children }) {
    const [urlNome, setUrlNome] = useState('https://eprogweb.herokuapp.com/')
    
    return (
        <UrlNomeContext.Provider value={{ urlNome, setUrlNome, }}>
            {children}
        </UrlNomeContext.Provider>
    );
}




function useUrlNome() {
    const context = useContext(UrlNomeContext);
    const {urlNome, setUrlNome} = context;
    return {urlNome, setUrlNome};
}

export {
    useUrlNome
}