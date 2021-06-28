import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';

export const ListaCatContext = createContext([]);

export default function ListaCatProvider({ children }) {
    const [listaCat, setListaCat] = useState([])

    useEffect(()=>{
        console.log(listaCat)
    }, []);

    return (
        <ListaCatContext.Provider value={{ listaCat, setListaCat, }}>
            {children}
        </ListaCatContext.Provider>
    );
}




function useListaCateg() {
    const context = useContext(ListaCatContext);
    const {listaCat, setListaCat} = context;
    return {listaCat, setListaCat};
}

export {
    useListaCateg
}