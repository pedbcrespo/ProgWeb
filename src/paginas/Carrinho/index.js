import React from 'react';
import ProdCarrinho from '../../componentes/ProdCarrinho';
import Formulario from '../../componentes/Formulario';
import { useListaCarrinho } from '../../context/carrinho';
import { useCliente } from '../../context/cliente';
import { useUrlNome } from '../../context/urlNome';
import { rmv, enviar } from '../../models/prodCar';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export default function Carrinho() {
    /**Ajeitar o CSS*/
    
    const { urlNome } = useUrlNome();
    const { lista, setLista } = useListaCarrinho() 
    const { idCliente } = useCliente();

    function precoTotal() {
        let total = 0;
        for(let i in lista){
            total += lista[i].preco;
        }
        return total.toFixed(2);
    }


    return (

            <section className="Carrinho-section">
                <FormControl variant="outlined">
                    <InputLabel id="Categoria">Ordenar por</InputLabel>
                    <Select
                        labelId="Categoria"
                        id="Categoria-select"
                        onChange={e => {
                            const copia_lista = Array.from(lista);
                            if(!e.target.value){
                                copia_lista.sort(
                                    (a,b)=>{
                                        return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
                                    }
                                )
                            }
                            else{
                                copia_lista.sort(
                                    (a,b)=>{
                                        return (a.preco > b.preco) ? 1 : ((b.preco > a.preco) ? -1 : 0);
                                    }
                                )
                            }
                            setLista(copia_lista);
                        }}
                    >
                        <MenuItem value={0}>Alfabetica</MenuItem>
                        <MenuItem value={1}>Preço</MenuItem>

                    </Select>
                </FormControl>
                <section className="campoProduto">
                    {lista.map((produto, indice) => {
                        return (
                            <div key={indice}>
                                <ProdCarrinho
                                    id={produto.id}
                                    nome={produto.nome}
                                    categoria={produto.categoria}
                                    preco={produto.preco.toFixed(2)}
                                    funcao={rmv(setLista, lista, idCliente, indice)}
                                />
                            </div>
                        );
                    })}
                    <h3>Total: R$ {precoTotal()}</h3>
                </section>
                <div className="campFormulario">
                    <Formulario enviar={enviar(lista, urlNome, idCliente)}/>
                </div>
            </section>

    );
}