import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { getTodasCompras, getClientes, deleteCliente } from '../server/api';

export const AdminContext = createContext([]);

export default function AdminProvider({ children }) {
    const [acesso, setAcesso] = useState(false)

    const [listaCompras, setListaCompras] = useState([]);
    const [clientes, setClientes] = useState([]);

    // function verificar(){
    //     getTodasCompras(setListaCompras);
    //     getClientes(setClientes);
    //     for(let i in clientes){
    //         let lista = listaCompras.filter((elem)=>{
    //             elem.idCliente === clientes.id;
    //         })
    //     }
    // }

    useEffect(()=>{
        console.log(acesso)
    }, [acesso]);

    return (
        <AdminContext.Provider value={{ acesso, setAcesso, }}>
            {children}
        </AdminContext.Provider>
    );
}

function useAdmin() {
    const context = useContext(AdminContext);
    const {acesso, setAcesso} = context;
    return {acesso, setAcesso};
}

export {
    useAdmin
}