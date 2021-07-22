import React from 'react';

export default function AdmProduto({id, nome, categoria, preco, funcao_alterar, funcao_excluir}){
    return (
        <div >
            <div>
                <h3>{nome}</h3>
                <h5>{preco}</h5>
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={()=>{
                        funcao_alterar(id)
                    }}
                >
                    Alterar
                </button>
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={()=>{
                        funcao_excluir(id);
                    }}
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}