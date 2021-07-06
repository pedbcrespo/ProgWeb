import React from 'react';
import ClienteProvider from '../context/cliente';
import SessaoProvider from '../context/sessao';
import AdminProvider from '../context/admin';
import ProdutoProvider from '../context/produto';
import ListaCatProvider from '../context/categoria';
import ListaProvider from '../context/carrinho';

export default function Providers(props){
    return (
        <AdminProvider>
            <ClienteProvider>
                <SessaoProvider>
                    <ProdutoProvider>
                        <ListaCatProvider>
                            <ListaProvider>
                                {props.children}
                            </ListaProvider>
                        </ListaCatProvider>
                    </ProdutoProvider>
                </SessaoProvider>
            </ClienteProvider>
        </AdminProvider>
    );

}