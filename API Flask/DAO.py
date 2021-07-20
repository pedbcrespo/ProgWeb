from models import Cliente, InfoCliente, Produto, Categoria, Carrinho, Estoque
from config import db

class ClienteDAO:
    def adicionar(self, id):
        db.session.add(Cliente(id))
        db.session.commit()
        return id

    def add_info(self, id_info, email, endereco, cep, id_cliente):
        db.session.add(InfoCliente(id_info, email, endereco, cep, id_cliente))
        db.session.commit()
        return id_info

    def delete(self, id):
        db.session.delete(Cliente.query.get(id))
        db.session.commit()
        return id

    def info_completa(self, id):
        info = InfoCliente.query.filter_by(cliente_id=id).first()
        return info

class CarrinhoDAO:
    def adicionar(self, id_cliente, id_produto):
        db.session.add(Carrinho(id_cliente,id_produto))
        db.session.commit()

    def finalizar_compra(self, id_cliente):
        compra_atual = Carrinho.query.filter_by(idCliente=id_cliente)
        
        for compra in compra_atual:
            compra.finalizado = True
            produto_estoque = db.session.get(compra.idProduto)
            produto_estoque.quantidade -= 1
        
        db.session.commit()

    def remover_produto(self, id_cliente, id_produto):
        produto = Carrinho.query.filter_by(idCliente = id_cliente, idProduto=id_produto).first()
        db.session.delete(produto)
        db.session.commit()

    def buscar(self, id_cliente):
        compra_atual = Carrinho.query.filter_by(idCliente=id_cliente).all()
        return [compra for compra in compra_atual]

class ProdutoDAO:
    def adicionar(self, id, nome, categoria_id, preco, imagem):
        db.session.add(Produto(id, nome, categoria_id, preco, imagem))
        return {"id":id, "nome":nome, "categoria": categoria_id, "preco": preco}

    def atualizarEstoque(self, id_produto):
        produtoEstoque = Estoque.query.get(id_produto)
