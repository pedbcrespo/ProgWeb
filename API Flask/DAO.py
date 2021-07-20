from models import Cliente, InfoCliente, Produto, Categoria, Carrinho, Estoque
from config import db

class ClienteDAO:
    def adicionar(self, id):
        db.session.add(Cliente(id))
        db.session.commit()
        return id

    def adiciona_info(self, id_info, email, endereco, cep, id_cliente):
        db.session.add(InfoCliente(id_info, email, endereco, cep, id_cliente))
        db.session.commit()
        return id_info

    def deletar(self, id):
        db.session.delete(Cliente.query.get(id))
        db.session.commit()
        return id

    def dados_cliente(self, id):
        info = InfoCliente.query.filter_by(cliente_id=id).first()
        return info

class CarrinhoDAO:
    def adicionar(self, id_cliente, id_produto):
        db.session.add(Carrinho(id_cliente,id_produto))
        db.session.commit()
        return id_cliente, id_produto

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
        return id_cliente, id_produto

    def buscar(self, id_cliente):
        compra_atual = Carrinho.query.filter_by(idCliente=id_cliente).all()
        return [compra.__str__() for compra in compra_atual]

class ProdutoDAO:
    def adicionar(self, id, nome, categoria_id, preco, imagem):
        db.session.add(Produto(id, nome, categoria_id, preco, imagem))
        return id, nome, categoria_id, preco

    def atualizarEstoque(self, id_produto, novo_valor):
        produtoEstoque = Estoque.query.filter_by(id=id_produto).first()
        produtoEstoque.quantidade = novo_valor
        db.session.commit()
        return id_produto, novo_valor

    def removerEstoque(self, id_produto):
        produtoEstoque = Estoque.query.filter_by(id=id_produto).first()
        db.session.delete(produtoEstoque)
        db.session.commit()
        return id_produto

    def buscar_todos(self):
        lista_produtos = Produto.query.all()
        return [produto.__str__() for produto in lista_produtos]

class CategoriaDAO:
    def adicionar(self, id, nome):
        db.session.add(Categoria(id, nome))
        db.session.commit()
        return id, nome
    
    def remover(self, id):
        categoria = Categoria.query.filter_by(id=id).first()
        db.session.delete(categoria)
        db.session.commit()
        return id
    
    def buscar_todos(self):
        lista_categoria = Categoria.query.all()
        return [categoria.__str__() for categoria in lista_categoria]