from models import Cliente, Info_cliente, Produto, Categoria, Carrinho, Estoque
from config import db

class ClienteDAO:
    def adicionar(self, id):
        db.session.add(Cliente(id))
        db.session.commit()
        return {"id":id}

    def adiciona_info(self, email, endereco, cep, id_cliente):
        db.session.add(Info_cliente(email, endereco, cep, id_cliente))
        db.session.commit()
        return {"id":id_cliente}

    def deletar(self, id):
        db.session.delete(Cliente.query.get(id))
        db.session.commit()
        return {"id":id}

    def buscar_cliente(self, id):
        cliente = Cliente.query.get(id)
        return cliente.dic()

    def dados_cliente(self, id):
        info = Info_cliente.query.filter_by(cliente_id=id).first()
        return info.dic()

    def buscar_todos_cliente_info(self):
        lista_info_cliente = Info_cliente.query.all()
        return [info.dic() for info in lista_info_cliente]


class CarrinhoDAO:
    def adicionar_produto(self, id_cliente, id_produto):
        db.session.add(Carrinho(id_cliente,id_produto))
        db.session.commit()
        return {"idCliente": id_cliente, "idProduto":id_produto}

    def finalizar_compra(self, id_cliente):
        compra_atual = Carrinho.query.filter_by(idCliente=id_cliente)
        
        for compra in compra_atual:
            compra.finalizado = True
            produto_estoque = db.session.get(compra.idProduto)
            produto_estoque.quantidade -= 1
        
        db.session.commit()
        return {"status": "compra finalizada"}

    def remover_produto(self, id_cliente, id_produto):
        produto = Carrinho.query.filter_by(idCliente = id_cliente, idProduto=id_produto).first()
        db.session.delete(produto)
        db.session.commit()
        return {"idCliente": id_cliente, "idProduto":id_produto}

    def buscar(self, id_cliente):
        compra_atual = Carrinho.query.filter_by(idCliente=id_cliente).all()
        return [compra.dic() for compra in compra_atual]

    def buscar_todos(self):
        lista_carrinhos = Carrinho.query.all()
        return [carrinho.dic() for carrinho in lista_carrinhos]


class ProdutoDAO:
    def adicionar(self, id, nome, categoria_id, preco, imagem):
        db.session.add(Produto(id, nome, categoria_id, preco, imagem))
        db.session.commit()
        return {"id":id, "nome":nome, "categoria":categoria_id, "preco":preco}

    def deletar(self, id):
        self.removerEstoque(id)
        produto = Produto.query.get(id)
        db.session.delete(produto)
        db.session.commit()
        return {"id":id}

    def atualizarEstoque(self, id_produto, novo_valor):
        produtoEstoque = Estoque.query.filter_by(id=id_produto).first()
        produtoEstoque.quantidade = novo_valor
        db.session.commit()
        return {"id":id_produto, "quantidade":novo_valor}

    def removerEstoque(self, id_produto):
        produtoEstoque = Estoque.query.filter_by(id=id_produto).first()
        db.session.delete(produtoEstoque)
        db.session.commit()
        return {"id":id_produto}

    def buscar_todos(self):
        lista_produtos = Produto.query.all()
        return [produto.dic() for produto in lista_produtos]


class CategoriaDAO:
    def adicionar(self, id, nome):
        db.session.add(Categoria(id, nome))
        db.session.commit()
        return {"id":id, "nome":nome}
    
    def deletar(self, id):
        categoria = Categoria.query.filter_by(id=id).first()
        db.session.delete(categoria)
        db.session.commit()
        return {"id":id}
    
    def buscar_todos(self):
        lista_categoria = Categoria.query.all()
        return [categoria.dic() for categoria in lista_categoria]

    def buscar(self, id_categoria):
        categoria = Categoria.query.get(id_categoria)
        return categoria.dic()

if __name__ == '__main__':
    p = CategoriaDAO()
    print(p.buscar(2))
    