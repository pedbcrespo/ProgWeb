import React, { useEffect, useState } from 'react';
import { getTodasCompras } from '../../server/api';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import InfoCliente from '../../componentes/InfoCliente';

export default function () {

    const [listaCompras, setListaCompras] = useState([]);

    useEffect(() => {
        getTodasCompras(setListaCompras);
    }, []);

    return (
        <section>
            <h2>Compras realizadas</h2>
            <div className="campTabela">
                <TableContainer >
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell align="right">Produto</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaCompras.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.idCliente}
                                    </TableCell>
                                    <TableCell align="right">{row.idProduto}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <h2>Informações Clientes</h2>
            <div className="campTabela">
                <TableContainer >
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell align="right">Endereço</TableCell>
                                <TableCell align="right">CEP</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaCompras.map((row) => (
                                <InfoCliente id_cliente = {row.idCliente}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    );
}