import React from 'react';
import Produto from '../../componentes/Produto';
// import ProdCarrinho from '../../componentes/ProdCarrinho';
import { useListaCarrinho } from '../../context/carrinho';
import { useParams } from 'react-router-dom';
import { useProdutos } from '../../context/produto';
import { useCliente } from '../../context/cliente';
import { add } from '../../models/prodCar'
import { useListaCateg } from '../../context/categoria';

export default function CategoriaEsp(){

    const { idCliente } = useCliente();
    const { listaProdutos } = useProdutos()
    const { lista, setLista } = useListaCarrinho();
    const { listaCat } = useListaCateg()

    const { categoria } = useParams();

    function pegaIdCategoria(categoria){
        for(let i in listaCat){
            if(listaCat[i].nome === categoria){
                return listaCat[i].id;
            }
        }
        return -1;
    }

    function listaPorCategoria(){
        let lista_filtrada = listaProdutos.filter((prod)=>{
            return prod.categoriaProduto === pegaIdCategoria(categoria)
        })
        return lista_filtrada
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
                                funcao={add(setLista, lista, idCliente)} 
                                />
                        </div>
                    )
                })}
            </section>
        </section>
    );
}