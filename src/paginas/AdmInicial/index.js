import React from 'react';
import AdmProduto from '../../componentes/AdmProduto';
import { useProdutos } from '../../context/produto';
import { useListaCateg } from '../../context/categoria';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';


export default function AdmInicial() {

    const { listaProdutos, setListaProdutos } = useProdutos();
    const { listaCat, setListaCat } = useListaCateg();

    function categ(id){
        for(let i in listaCat){
            if(listaCat[i]['id'] === id)
                return listaCat[i]['nome'];
        }
        return 'Não identificado';
    }

    return (
        <>
            <TableContainer >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Produto</TableCell>
                            <TableCell align="right">Categoria</TableCell>
                            <TableCell align="right">Preço</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaProdutos.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.nome}
                                </TableCell>
                                <TableCell align="right">{categ(row.categoriaProduto)}</TableCell>
                                <TableCell align="right">{row.preco.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}