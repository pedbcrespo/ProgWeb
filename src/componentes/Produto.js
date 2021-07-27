import React from 'react';
import imagem_background from '../server/bdimg/background.png';
export default function Produto({ id, nome, preco, categoria, img, funcao }) {
    return (
        <div className="div-prod">
            <div className="Produto">
                <h3>{nome}</h3>
                <img src={imagem_background} alt={`imagem ${categoria} ${id}`}/>
                <h5>{preco}</h5>
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