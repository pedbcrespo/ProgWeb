import React, { useState } from 'react';
// import { TextField, Button} from '@material-ui/core';
// import { validarUsuario, validarSenha } from '../../models/validacao';
// import { Redirect } from 'react-router';
import AdmInicial from '../AdmInicial';
import Login from '../../componentes/Login';
import { useAdmin } from '../../context/admin';

export default function AdmLogin() {
    /**Criar context para dados do Adm;
     * Usar materialUI;
     * Reassistir curso da Alura sobre form;
     * Problema no form, tem que clicar 2 vezes para entrar!!!
     */
    const { acesso } = useAdmin();
    
    return acesso? <AdmInicial/> : <Login/>;
}