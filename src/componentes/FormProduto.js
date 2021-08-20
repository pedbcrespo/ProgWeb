import React from 'react';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { useListaCateg } from '../context/categoria';
import { validarProduto, validarPreco, validarQuantidade } from '../models/validacao';
import FileBase64 from 'react-file-base64';
import { Link } from 'react-router-dom';

export default function FormProduto({ enviar }) {

    const { listaCat } = useListaCateg();

    const statusErroPadrao = { valido: true, texto: '' };

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    //arquivoImagem é um objeto, para saber o nome dele, basta acessar o campo 'name'
    const [arquivoImagem, setArquivoImagem] = useState(null);

    const [erroNome, setErroNome] = useState(statusErroPadrao);
    const [erroPreco, setErroPreco] = useState(statusErroPadrao);
    const [erroQuantidade, setErroQuantidade] = useState(statusErroPadrao);

    
    function prepararEnviar(event) {
        event.preventDefault();
        setErroNome(validarProduto(nome));
        setErroPreco(validarPreco(preco));
        setErroQuantidade(validarQuantidade(quantidade));

        if (erroNome['valido'] && erroPreco['valido']) {
            console.log(arquivoImagem)
            enviar({ nome, preco, categoria, arquivoImagem, quantidade });

        } else {
            window.alert("Erro!")
        }
    }

    return (
        <div className="CampFormProduto">

            <form>
                <TextField
                    id="Nome"
                    label="Nome"
                    variant="outlined"
                    value={nome}
                    error={!erroNome['valido']}
                    onBlur={() => {
                        setErroNome(validarProduto(nome));
                    }}
                    onChange={(event) => {
                        setNome(event.target.value);
                    }}
                    fullWidth
                />
                <br></br>
                <br></br>
                <TextField
                    id="Preco"
                    label="Preço"
                    variant="outlined"
                    value={preco}
                    error={!erroPreco['valido']}
                    onBlur={() => {
                        setErroPreco(validarPreco(preco));
                    }}
                    onChange={(event) => {
                        setPreco(event.target.value);
                    }}
                    fullWidth />
                <br></br>
                <br></br>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="Categoria">Categoria</InputLabel>
                    <Select
                        labelId="Categoria"
                        id="Categoria-select"
                        onChange={e => setCategoria(e.target.value)}
                    >

                        {listaCat.map((cat) => {
                            return <MenuItem value={cat.id} key={cat.id}>{cat.nome}</MenuItem>
                        })}

                    </Select>
                </FormControl>
                <br></br>
                <br></br>
                <TextField
                    id="Quantidade"
                    label="Quantidade"
                    variant="outlined"
                    value={quantidade}
                    error={!erroQuantidade['valido']}
                    onBlur={() => {
                        setErroQuantidade(validarQuantidade(quantidade));
                    }}
                    onChange={(event) => {
                        setQuantidade(event.target.value);
                    }}
                    fullWidth />
                <br></br>
                <br></br>
                <FileBase64 
                    multiple={false}
                    onDone={(e) => {
                        setArquivoImagem(e)
                    }} />
                <br></br>
                <br></br>

                <Button variant="contained" color="primary" onClick={prepararEnviar}>
                    <Link to='/adm/inicial' className="linkAlterar">Confirmar</Link>
                </Button>
            </form>
        </div>
    );

}