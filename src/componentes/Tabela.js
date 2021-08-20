import React from 'react';
import { Table } from 'react-bootstrap'

export default function Tabela({ colunas, registros, chaves }) {

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    {/* <th>#</th> */}
                    {/* <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th> */}
                    {colunas.map((elem, indice) => {
                        return <th key={indice}>{elem}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    
                </tr> */}
                {registros.map((elem, indice) => {
                    return <tr>
                        {chaves.map((col) => {
                            return <td key={indice}>{elem[col]}</td>
                        })}
                    </tr>
                })}
            </tbody>
        </Table>
    )
}