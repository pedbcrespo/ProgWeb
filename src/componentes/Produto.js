import React, {useEffect, useState} from 'react';
import imagem_background from '../server/bdimg/background.png';
import { getImagemProduto } from '../server/api';
import { converteImagem } from '../models/prodCar';

export default function Produto({ id, nome, preco, categoria, funcao }) {
    
    const [imagem, setImagem] = useState(imagem_background);

    getImagemProduto(setImagem, id);

    // useEffect(()=>{
    //     getImagemProduto(setImagem, id);
    // }, [])

    // const img_convertida = converteImagem(imagem, `prod${id}`);
    const img_convertida = converteImagem(imagem, `prod${id}.jpg`);
    return (
        <div className="div-prod">
            <div className="Produto">
                <h3>{nome}</h3>
                <img src={img_convertida} alt={`imagem ${categoria} ${id}`}/>
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