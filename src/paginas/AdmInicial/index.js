import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProdutos } from '../../context/produto';
import { useListaCateg } from '../../context/categoria';
import { Button } from '@material-ui/core';
import { rmv_produto_estoque } from '../../models/prodCar';
import { getTodoEstoque, getProdutos } from '../../server/api';
import { Table } from 'react-bootstrap';

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

    function retNomeProduto(id) {
        for (let i in listaProdutos) {
            if (listaProdutos[i].id === id) {
                return listaProdutos[i].nome;
            }
        }
    }

    function remover(produto) {
        console.log(`remover ${produto}`);
        rmv_produto_estoque(setListaProdutos, listaProdutos, produto.id);
    }

    useEffect(() => {
        getTodoEstoque(setEstoque);
        getProdutos(setListaProdutos);
    }, [setEstoque, setListaProdutos]);

    return (
        <>
            <br></br>
            <h2>Produtos</h2>
            <Table striped bordered hover variant="dark" className="tabela">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Operações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProdutos.map((row) => {
                        return <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.nome}</td>
                            <td>{categ(row.categoriaProduto)}</td>
                            <td>{row.preco.toFixed(2)}</td>
                            <td><Button variant="contained" color="primary">
                                <Link to={`/adm/alterar_produto/${row.id}`} className="linkAlterar">Alterar</Link>
                            </Button>
                                <Button onClick={() => { remover(row) }} variant="contained">Remover</Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>

            <br></br>
            <h2>Estoque</h2>

            <Table striped bordered hover variant="dark" className="tabela">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {estoque.map((row) => {
                        return <tr key={row.id}>
                            <td>{retNomeProduto(row.id)}</td>
                            <td>{row.quantidade}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </>
    );
}