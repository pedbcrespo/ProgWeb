import React, { useState } from 'react';
import { getInfoCliente } from '../server/api';
import { TableRow, TableCell } from '@material-ui/core';

export default function ({ id_cliente }) {
    const [info, setInfo] = useState({});

    useState(() => {
        getInfoCliente(setInfo, id_cliente);
    })

    return (
        <TableRow key={info.id}>
            <TableCell component="th" scope="row">{info.email}</TableCell>
            <TableCell align="right">{info.endereco}</TableCell>
            <TableCell align="right">{info.cep}</TableCell>
        </TableRow>
    )
}