import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useListaCateg } from '../context/categoria';
import { getCategorias } from '../server/api_sim';

export default function Cabecalho() {
    const {listaCat, setListaCat} = useListaCateg();

    useEffect(()=>{
        getCategorias(setListaCat);
    },[setListaCat])

    return (
        <>
            <header className="Cabecalho">
                <h1>ProgWeb Commerce</h1>
                <h2>A lojinha mais sagaz da internet</h2>
            </header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Inicial</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/carrinho">Carrinho</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categoria
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {listaCat.map((cat, indice)=>{
                                        return (<li key={indice}>
                                            <Link className="dropdown-item" to={`/categoria/${cat.nome}`}>{cat.nome}</Link>
                                        </li>)
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}