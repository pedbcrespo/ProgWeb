import React, { useEffect, useState } from 'react';
import { getImagemProduto } from '../server/api';

export default function Produto({ id, nome, preco, categoria, funcao }) {

    const [imagem, setImagem] = useState(null);

    useEffect(() => {
        getImagemProduto(setImagem, id);
    }, [])


    return (
        <div className="div-prod">
            <div className="Produto">
                <h3>{nome}</h3>
                <img src={imagem} alt={`produto${categoria}${id}`} id='imagem-produto'/>
                <h5>$ {preco.toFixed(2)}</h5>
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={(event)=>{
                        funcao({id, nome, preco, categoria})
                    }}>
                    Carrinho
                </button>
            </div>
        </div>
    );
}