import React from 'react';

export default function Produto({ id, nome, preco, categoria, img, funcao }) {
    return (
        <div className="div-prod">
            <div className="Produto">
                <h3>{nome}</h3>
                <img src={img} alt={`imagem ${categoria} ${id}`}/>
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