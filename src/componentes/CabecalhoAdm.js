import React from 'react';
import { Link } from 'react-router-dom';
import { useAcessoAdm } from '../context/adm';

export default function CabecalhoAdm(){
    
    const {acesso, setAcesso} = useAcessoAdm()
    
    return (
        <>
        <header>
            <h1>ADM</h1>
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
                                <Link className="nav-link active" aria-current="page" to="/manual">Manual</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Adicionar
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><Link className="dropdown-item" to="/add_categoria">Categoria</Link></li>
                                    <li><Link className="dropdown-item" to="/add_produto">Produto</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/" onClick={(event)=>{
                                    setAcesso(false)
                                }}>Sair</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        
        </>
    );
}