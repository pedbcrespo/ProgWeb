import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

export default function InfoCliente({ cliente }) {
    return (
        <TableRow key={cliente.id}>
            <TableCell component="th" scope="row">{cliente.cliente_id}</TableCell>
            <TableCell align="right">{cliente.email}</TableCell>
            <TableCell align="right">{cliente.endereco}</TableCell>
            <TableCell align="right">{cliente.cep}</TableCell>
        </TableRow>
    )
}