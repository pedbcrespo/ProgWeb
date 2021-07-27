import React, {useEffect, useState} from 'react';
import imagem_background from '../server/bdimg/background.png';
export default function Produto({ id, nome, preco, categoria, img, funcao }) {
    
    const [imagem, setImagem] = useState(null);
    
    useEffect(()=>{

    }, [])

    return (
        <div className="div-prod">
            <div className="Produto">
                <h3>{nome}</h3>
                <img src={imagem_background} alt={`imagem ${categoria} ${id}`}/>
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