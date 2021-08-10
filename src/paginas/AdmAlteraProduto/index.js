import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { validarProduto, validarPreco, validarQuantidade, validarArquivoImagem } from '../../models/validacao';
import { useParams } from 'react-router-dom';
import { getProduto } from '../../server/api';

export default function AdmAlteraProduto({ enviar }) {

    const statusErroPadrao = { valido: true, texto: '' };
    const { produto_id } = useParams();

    const [produto, setProduto] = useState({});
    useEffect(()=>{
        getProduto(produto_id, setProduto);
    }, []);

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [arquivoImagem, setArquivoImagem] = useState(null);

    const [erroNome, setErroNome] = useState(statusErroPadrao);
    const [erroPreco, setErroPreco] = useState(statusErroPadrao);
    const [erroQuantidade, setErroQuantidade] = useState(statusErroPadrao);
    const [erroArquivo, setErroArquivo] = useState(statusErroPadrao);

    console.log(produto_id);

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
                    value={produto.nome}
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
                <br></br>
                <br></br>
                <TextField
                    value={produto.preco}
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
                <br></br>
                <br></br>
                <TextField
                    value={quantidade}
                    label="Quantidade"
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
                <br></br>
                <br></br>
                {/* <Input
                    ip='upload_imagem'
                    type='file'
                    onChange={(event) => {
                        console.log(event.target.files[0])
                        validarArquivoImagem(event.target.files[0])
                        setArquivoImagem(event.target.files[0])
                    }}
                    name="file"
                /> */}
                <Button variant="contained" color="primary" type="submit">
                    Confirmar
                </Button>
            </form>
        </div>
    );
}