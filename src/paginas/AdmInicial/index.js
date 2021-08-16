import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProdutos } from '../../context/produto';
import { useListaCateg } from '../../context/categoria';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import { rmv_produto_estoque } from '../../models/prodCar';
import { getTodoEstoque } from '../../server/api';

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

    function retNomeProduto(id){
        for(let i in listaProdutos){
            if(listaProdutos[i].id === id){
                return listaProdutos[i].nome;
            }
        }
    }

    function remover(produto){
        console.log(`remover ${produto}`);
        rmv_produto_estoque(setListaProdutos, listaProdutos, produto.id);
    }

    useEffect(()=>{
        getTodoEstoque(setEstoque);
    }, []);

    return (
        <>
            <br></br>
            <h2>Produtos</h2>
            <TableContainer className='Tabela'>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Nome</TableCell>
                            <TableCell align="right">Categoria</TableCell>
                            <TableCell align="right">Preço</TableCell>
                            <TableCell align="right">Operações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaProdutos.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">
                                    {row.nome}
                                </TableCell>
                                <TableCell align="right">{categ(row.categoriaProduto)}</TableCell>
                                <TableCell align="right">{row.preco.toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary">
                                        <Link to={`/adm/alterar_produto/${row.id}`} id="linkAlterar">Alterar</Link>
                                    </Button>
                                    <Button onClick={()=>{remover(row)}}>Remover</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <h2>Estoque</h2>
            <TableContainer className='Tabela'>
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
                                    {retNomeProduto(row.id)}
                                </TableCell>
                                <TableCell align="right">{row.quantidade}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}