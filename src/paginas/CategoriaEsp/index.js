import React from 'react';
import Produto from '../../componentes/Produto';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import { useListaCarrinho } from '../../context/carrinho';
import { useParams } from 'react-router-dom';
import { useProdutos } from '../../context/produto';


export default function CategoriaEsp(){

    const { listaProdutos } = useProdutos()
    const { lista, setLista } = useListaCarrinho();

    const { categoria } = useParams();

    function listaPorCategoria(){
        let lista_filtrada = listaProdutos.filter((prod)=>{
            return prod.categoria === categoria
        })
        return lista_filtrada
    }

    function add(dado) {
        setLista([...lista, dado]);
        console.log(lista)
    }

    function rmv(indice){
        lista.splice(indice, 1);
        setLista(lista);
    }

    return (
        <section className="campInicial">
            <section className="campProduto">
                {listaPorCategoria().map((prod) => {
                    return (
                        <div key={prod.id}>
                            <Produto
                                id={prod.id}
                                nome={prod.nome}
                                categoria={prod.categoria}
                                preco={prod.preco}
                                funcao={add} 
                                />
                        </div>
                    )
                })}
            </section>
        </section>
    );
}