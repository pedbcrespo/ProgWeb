import React, { useEffect, useState } from 'react';
import { getTodasCompras, getTodasInfoCliente } from '../../server/api';
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

                <Table striped bordered hover variant="dark" className="tabela">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Endereço</th>
                            <th>CEP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaInfoClientes.map((row) => {
                            return <tr key={row.id}>
                                <td>{row.id}</td>
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