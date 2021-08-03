import React from 'react';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Input } from '@material-ui/core';
import { useListaCateg } from '../context/categoria';
import { validarProduto, validarPreco, validarQuantidade, validarArquivoImagem } from '../models/validacao';

export default function FormProduto({ enviar }) {

    const { listaCat } = useListaCateg();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [arquivoImagem, setArquivoImagem] = useState(null);

    const [erroNome, setErroNome] = useState({ valido: true, texto: "" });
    const [erroPreco, setErroPreco] = useState({ valido: true, texto: "" });
    const [erroQuantidade, setErroQuantidade] = useState({ valido: true, texto: "" });
    const [erroArquivo, setErroArquivo] = useState({ valido: true, texto: "" });

    function prepararEnviar(event) {
        event.preventDefault();
        setErroNome(validarProduto(nome));
        setErroPreco(validarPreco(preco));
        setErroQuantidade(validarQuantidade(quantidade));
        setErroArquivo(validarArquivoImagem(arquivoImagem));
        if (erroNome['valido'] && erroPreco['valido'])
            enviar({ nome, preco, categoria, arquivoImagem, quantidade });
    }

    return (
        <div className="CampFormProduto">

            <form onSubmit={prepararEnviar}>
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
                <Input 
                    ip='upload_imagem'
                    type='file' 
                    error={!erroArquivo['valido']}
                    onChange={(event)=>{
                        setArquivoImagem(event.target.files[0])
                    }}
                />
                <br></br>
                <br></br>

                <Button variant="contained" color="primary" type="submit">
                    Confirmar
                </Button>
            </form>
        </div>
    );

}