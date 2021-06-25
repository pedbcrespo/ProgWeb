import React from 'react';

export default function Produto({ id, nome, preco, categoria, funcao }) {
    
    return (
        <div className="div-prod">
            <div className="Produto">
                <h3>{nome}</h3>

                <h5>{preco}</h5>
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={(event)=>{
                        console.log(typeof(funcao))
                        funcao({id, nome, categoria, preco})
                    }}>
                    Carrinho
                </button>
            </div>
        </div>
    );
}