import React from 'react';

export default function ProdCarrinho({ id, nome, categoria, preco, funcao }) {

    return (
        <div className="miniCarrinho">
            <h4>{nome} {categoria} ${preco}</h4>
            <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => {
                    funcao(id);
                }}>
                X
            </button>
        </div>
    );
}