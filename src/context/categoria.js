import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { fetchCategorias } from '../server/api';
// import { getCategorias } from '../server/api_sim';

export const ListaCatContext = createContext([]);

export default function ListaCatProvider({ children }) {
    const [listaCat, setListaCat] = useState([])

    useEffect(()=>{
        fetchCategorias(setListaCat)
        // getCategorias(setListaCat)
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