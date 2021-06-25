import React from 'react';

export default function ProdCarrinho({id, nome, categoria, preco}){
    return (
        <div className="miniCarrinho">
            <h4>{nome} {categoria} R${preco}</h4>
        </div>
    );
}