import React from 'react';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Input } from '@material-ui/core';
import { useListaCateg } from '../context/categoria';
import { validarProduto, validarPreco, validarQuantidade, validarArquivoImagem } from '../models/validacao';

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
    const [erroArquivo, setErroArquivo] = useState(statusErroPadrao);

    function prepararEnviar(event) {
        event.preventDefault();
        setErroNome(validarProduto(nome));
        setErroPreco(validarPreco(preco));
        setErroQuantidade(validarQuantidade(quantidade));
        setErroArquivo(validarArquivoImagem(arquivoImagem));
        
        if (erroNome['valido'] && erroPreco['valido']) {
            enviar({ nome, preco, categoria, arquivoImagem, quantidade });
        }else {
            let erros = [erroNome, erroPreco, erroQuantidade, erroArquivo];
            let mensagem_erros = erros.filter((err)=>{return err['valido']})
            let mensagem = '\n'.join(mensagem_erros.map((err)=>{return err['texto']}))
            alert(`ERRO ${mensagem}`)
        }
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
                    onChange={(event) => {
                        console.log(event.target.files[0])
                        validarArquivoImagem(event.target.files[0])
                        setArquivoImagem(event.target.files[0])
                    }}
                    name="file"
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