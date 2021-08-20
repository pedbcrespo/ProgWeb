import React, { useEffect, useState } from 'react';
import { getTodasCompras, getTodasInfoCliente } from '../../server/api';
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import InfoCliente from '../../componentes/InfoCliente';
import { Table } from 'react-bootstrap';

export default function RegistroCompras() {

    const [listaCompras, setListaCompras] = useState([]);
    const [listaInfoClientes, setListaInfoClientes] = useState([]);

    useEffect(() => {
        getTodasCompras(setListaCompras);
        getTodasInfoCliente(setListaInfoClientes);
    }, []);

    console.log(listaInfoClientes)
    return (
        <section>
            <h2>Compras realizadas</h2>
            {/* <div className="campTabela">
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
            </div> */}
            <Table striped bordered hover variant="dark" className="tabela">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Produto</th>
                    </tr>
                </thead>
                <tbody>
                    {listaCompras.map((row) => {
                        return <tr key={row.id}>
                            <td>{row.idCliente}</td>
                            <td>{row.idProduto}</td>
                        </tr>
                    })}
                </tbody>
            </Table>

            <h2>Informações Clientes</h2>
            <div className="campTabela">
                {/* <TableContainer >
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Endereço</TableCell>
                                <TableCell align="right">CEP</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaInfoClientes.map((row) => (
                                <InfoCliente cliente={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}

                <Table striped bordered hover variant="dark" className="tabela">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Endereço</th>
                            <th>CEP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaInfoClientes.map((row) => {
                            return <tr key={row.id}>
                                <td>{row.email}</td>
                                <td>{row.endereco}</td>
                                <td>{row.cep}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </section>
    );
}