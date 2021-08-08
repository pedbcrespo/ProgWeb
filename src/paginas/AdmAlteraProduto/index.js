import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { validarProduto, validarPreco, validarQuantidade } from '../../models/validacao';
import { useParams } from 'react-router-dom';

export default function AdmAlteraProduto({ enviar }) {

    const { produto } = useParams();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [quantidade, setQuantidade] = useState(0);

    const [erroNome, setErroNome] = useState({ valido: true, texto: '' });
    const [erroPreco, setErroPreco] = useState({ valido: true, texto: '' });
    const [erroQuantidade, setErroQuantidade] = useState({ valido: true, texto: '' });

    function prepararEnviar(event) {
        event.preventDefault();
        setErroNome(validarProduto(nome));
        setErroPreco(validarPreco(preco));
        setErroQuantidade(validarQuantidade(quantidade));

        if (erroNome['valido'] && erroPreco['valido'] && erroQuantidade['valido']) {
            enviar({ nome, preco, quantidade });
        }
    
    }

    return (
        <div className='CampFormProduto'>
            <form onSubmit={prepararEnviar}>
                <TextField
                    value={nome}
                    label="Nome"
                    id="nome"
                    variant="outlined"
                    error={!erroNome['valido']}
                    placeholder={produto.nome}
                    onChange={(e) => { setNome(e.target.value) }}
                    onBlur={() => {
                        setErroNome(validarProduto(nome));
                    }}
                    fullWidth
                />
                <TextField
                    value={preco}
                    label="Preço"
                    id="preco"
                    variant="outlined"
                    error={!erroPreco['valido']}
                    placeholder={produto.preco}
                    onChange={(e) => { setPreco(e.target.value) }}
                    onBlur={() => {
                        setErroPreco(validarPreco(preco));
                    }}
                    fullWidth
                />
                <TextField
                    value={quantidade}
                    label="Preço"
                    id="quantidade"
                    variant="outlined"
                    error={!erroQuantidade['valido']}
                    placeholder={produto.quantidade}
                    onChange={(e) => { setNome(e.target.value) }}
                    onBlur={() => {
                        setErroQuantidade(validarQuantidade(quantidade));
                    }}
                    fullWidth
                />
            </form>
        </div>
    );
}