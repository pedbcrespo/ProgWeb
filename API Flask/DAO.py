from models import Cliente, InfoCliente, Produto, Categoria, Carrinho, Estoque
from config import db

class ClienteDAO:
    def add(self, id):
        db.session.add(Cliente(id))
        return id

    def add_info(self, id_info, email, endereco, cep, id_cliente):
        db.session.add(InfoCliente(id_info, email, endereco, cep, id_cliente))
        return id_info

    def delete(self, id):
        db.session.delete(Cliente.query.get(id))
        return id

    def infoCompleta(self):
        pass

class CarrinhoDAO:
    def adiciona(self, id_cliente, id_produto):
        db.session.add(Carrinho(id_cliente,id_produto))
        db.session.commit()

    def finaliza_compra(self, id_cliente):
        compra_atual = Carrinho.query.filter_by(idCliente=id_cliente)
        
        for compra in compra_atual:
            compra.finalizado = True
            produto_estoque = db.session.get(compra.idProduto)
            produto_estoque.quantidade -= 1
        
        db.session.commit()

    def busca(self, id_cliente):
        compra_atual = Carrinho.query.filter_by(idCliente=id_cliente)
        return [compra.__str__() for compra in compra_atual]

class ProdutoDAO:
    pass
