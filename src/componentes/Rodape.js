import { Link } from 'react-router-dom';
import React from 'react';

export default function Rodape(){
    return (
        <footer className="Rodape">
            <Link to="/adm/inicial">administrador</Link>
        </footer>
    );
}