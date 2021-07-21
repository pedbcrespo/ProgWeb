import pymysql
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import db


class Aux:
    def dicionario(self, **dicionario):
        return dicionario

# Tirando a classe Aux, todas as outras representam uma tabela do banco de dados

class Cliente(db.Model, Aux):
    id = db.Column(db.Integer, primary_key=True)
    info = db.relationship('Info_cliente', backref='comprador')

    def __init__(self, id):
        self.id = id

    def dic(self):
        return self.dicionario(id=self.id)

class Info_cliente(db.Model, Aux):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50))
    endereco = db.Column(db.String(255))
    cep = db.Column(db.String(50))
    
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))

    def __init__(self, email, endereco, cep, cliente_id):
        self.email = email 
        self.endereco = endereco
        self.cep = cep
        self.cliente_id = cliente_id 

    def dic(self):
        return self.dicionario(id=self.id, email=self.email, endereco=self.endereco, 
        cep=self.cep)

class Categoria(db.Model, Aux):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50))
    produto = db.relationship('Produto', backref="categoria_produto")

    def __init__(self, id, nome):
        self.id = id
        self.nome = nome

    def dic(self):
        return self.dicionario(id=self.id, nome=self.nome)

class Produto(db.Model, Aux):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50))
    categoriaProduto = db.Column(db.Integer, db.ForeignKey('categoria.id'))
    preco = db.Column(db.Float)
    caminhoImagem = db.Column(db.LargeBinary)

    def __init__(self, id, nome, id_categoria, preco, imagem):
        self.id = id
        self.nome = nome
        self.categoriaProduto = id_categoria
        self.preco = preco
        self.caminhoImagem = imagem

    def dic(self):
        # return self.dicionario(id=self.id, nome=self.nome, categoriaProduto=self.categoriaProduto,
        # preco=self.preco, caminhoImagem=self.caminhoImagem)
        return self.dicionario(id=self.id, nome=self.nome, categoriaProduto=self.categoriaProduto,
        preco=self.preco)

class Estoque(db.Model, Aux):
    id = db.Column(db.Integer, db.ForeignKey('produto.id'), primary_key=True)
    quantidade = db.Column(db.Integer)    

    def __init__(self, id_produto, quantidade):
        self.id = id_produto
        self.quantidade = quantidade

    def dic(self):
        return self.dicionario(id=self.id, quantidade=self.quantidade)

class Carrinho(db.Model, Aux):
    idCliente = db.Column(db.Integer, db.ForeignKey('cliente.id'), primary_key=True)
    idProduto = db.Column(db.Integer, db.ForeignKey('produto.id'))
    finalizado = db.Column(db.Boolean)

    def __init__(self, idCliente, idProduto, finalizado=False):
        self.idCliente = idCliente
        self.idProduto = idProduto
        self.finalizado = finalizado

    def dic(self):
        return self.dicionario(idCliente=self.idCliente, idProduto=self.idProduto,
        finalizado=self.finalizado)

if __name__ == '__main__':

    # Para adicionar no banco de dados, uso o metodo db.session.add(objeto)
    # Depois uso o db.session.commit()
    # Exemplo: 
    #   novo = Carrinho(1,2)
    #   db.session.add(novo)
    #   db.session.commit()

    # Delete funciona de forma similar:
    # db.session.delete(objeto)
    # db.session.commit()

    # Para fazer um SELECT, buscando todos os dados, uso, o NomeClasse.query.all()
    # Exemplo:
    #   res = Produto.query.all()
    #   for p in res:
    #       print(p)
    
    # Para selecionar de acordo com algum criterio: usar Classe.query.filter_by(coluna=valor).all()

    # lista = Produto.query.filter_by(categoriaProduto=1).all()
    # for i in lista:
    #     print(i)

    # res = Estoque.query.filter_by(id=5).first()
    # res = Produto.query.get(5)

    db.session.add(Info_cliente('p-crespo@hotmail.com', "Cabo Frio", "22999000", 1))
    db.session.commit()