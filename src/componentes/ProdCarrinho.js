import React from 'react';

export default function ProdCarrinho({id, indice, nome, categoria, preco, funcao}){
    return (
        <div className="miniCarrinho">
            <h4>{nome} {categoria} R${preco}</h4>
            <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={(event)=>{
                        funcao(indice)
                    }}>
                    X
                </button>
        </div>
    );
}