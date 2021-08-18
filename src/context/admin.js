import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';


export const AdminContext = createContext([]);

export default function AdminProvider({ children }) {
    const [acesso, setAcesso] = useState(false)

    // useEffect(()=>{
    //     console.log(acesso)
    // }, [acesso]);

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