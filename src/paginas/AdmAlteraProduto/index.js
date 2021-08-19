import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { validarProduto, validarPreco, validarQuantidade, validarArquivoImagem } from '../../models/validacao';
import { useParams } from 'react-router-dom';
import { getProduto } from '../../server/api';
import { Link } from 'react-router-dom';
import { atualiza_produto } from '../../models/prodCar';
import { useProdutos } from '../../context/produto';

export default function AdmAlteraProduto({ enviar }) {

    const statusErroPadrao = { valido: true, texto: '' };
    const { produto_id } = useParams();

    const {listaProdutos, setListaProdutos} = useProdutos();

    const [produto, setProduto] = useState({});
    useEffect(()=>{
        getProduto(produto_id, setProduto);
    }, []);

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [quantidade, setQuantidade] = useState(0);

    const [erroNome, setErroNome] = useState(statusErroPadrao);
    const [erroPreco, setErroPreco] = useState(statusErroPadrao);
    const [erroQuantidade, setErroQuantidade] = useState(statusErroPadrao);

    console.log(produto_id);

    function prepararEnviar(event) {
        event.preventDefault();
        setErroNome(validarProduto(nome));
        setErroPreco(validarPreco(preco));
        setErroQuantidade(validarQuantidade(quantidade));

        if (erroNome['valido'] && erroPreco['valido'] && erroQuantidade['valido']) {
            atualiza_produto(setListaProdutos, listaProdutos,produto_id)({nome, preco, quantidade});
        }

    }

    return (
        <div className='CampFormProduto'>
            <form>
                <TextField
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
                    label="Quantidade"
                    id="quantidade"
                    variant="outlined"
                    error={!erroQuantidade['valido']}
                    onChange={(e) => { setQuantidade(e.target.value) }}
                    onBlur={() => {
                        setErroQuantidade(validarQuantidade(quantidade));
                    }}
                    fullWidth
                />
                <br></br>
                <br></br>
                <Button variant="contained" color="primary" onClick={prepararEnviar}>
                    <Link to="/adm/inicial" className="linkAlterar">Confirmar</Link>
                </Button>
            </form>
        </div>
    );
}