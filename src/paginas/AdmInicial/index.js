import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProdutos } from '../../context/produto';
import { useListaCateg } from '../../context/categoria';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import { deleteProduto } from '../../server/api';

export default function AdmInicial() {

    const { listaProdutos, setListaProdutos } = useProdutos();
    const { listaCat } = useListaCateg();

    const [estoque, setEstoque] = useState([]);

    function categ(id) {
        for (let i in listaCat) {
            if (listaCat[i]['id'] === id)
                return listaCat[i]['nome'];
        }
        return 'Não identificado';
    }

    function alterar(produto) {
        return <Link to={`/adm/alterar_produto/${produto}`} />
    }

    return (
        <>
            <br></br>
            <h2>Produtos</h2>
            <TableContainer >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="right">Categoria</TableCell>
                            <TableCell align="right">Preço</TableCell>
                            <TableCell align="right">Operações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaProdutos.map((row) => (
                            <TableRow key={row.id} onClick={() => { console.log(row) }}>
                                <TableCell component="th" scope="row">
                                    {row.nome}
                                </TableCell>
                                <TableCell align="right">{categ(row.categoriaProduto)}</TableCell>
                                <TableCell align="right">{row.preco.toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <Button>Alterar</Button>
                                    <Button>Remover</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <h2>Estoque</h2>
            <TableContainer >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Produto</TableCell>
                            <TableCell align="right">Quanditade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {estoque.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.nome}
                                </TableCell>
                                <TableCell align="right">{categ(row.quantidade)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}