from flask import request
from flask_restful import Resource
from config import api
from DAO import *
import json

class Inicial(Resource):
    def get(self):
        return {"status":"rodando"}

class Cliente(Resource):
    cliente = ClienteDAO()
    def get(self):
        return self.cliente.buscar_todos_cliente_info()

    def post(self):
        novo_cliente = json.loads(request.data)
        self.cliente.adicionar(novo_cliente['id'])
        return {"mensagem":"operacao concluida"}

class ClienteInfo(Resource):
    cliente = ClienteDAO()
    def get(self, id_cliente):
        return self.cliente.dados_cliente(id_cliente)

    def post(self, id_cliente):
        dados_cliente = json.loads(request.data)
        return self.cliente.adiciona_info(
            dados_cliente['id'],
            dados_cliente['email'],
            dados_cliente['endereco'],
            dados_cliente['cep'],
            id_cliente
        )

    def delete(self, id_cliente):
        cliente_rmv = self.cliente.buscar_cliente(id_cliente)
        return self.cliente.deletar(cliente_rmv)



class Produto(Resource):
    produto = ProdutoDAO()
    def get(self):
        return self.produto.buscar_todos()

    def post(self):
        novo_produto = json.loads(request.data)
        return self.produto.adicionar(
            novo_produto["id"],
            novo_produto["nome"], 
            novo_produto["categoriaProduto"],
            novo_produto["preco"],
            novo_produto["imagem"]
        )

class ProdutoInfo(Resource):
    produto = ProdutoDAO()
    def delete(self, id_produto):
        return self.produto.deletar(id_produto)



class Categoria(Resource):
    def get(self):
        pass

    def post(self):
        pass

class CategoriaInfo(Resource):
    def delete(self, id_categoria):
        pass



class Carrinho(Resource):
    def get(self):
        pass

    def post(self):
        pass

class CarrinhoInfo(Resource):
    def get(self, id_cliente):
        pass

    def delete(self, id_cliente):
        pass

    def put(self, id_cliente):
        pass

class CarrinhoProduto(Resource):
    def delete(self, id_cliente, id_produto):
        pass 


# Definindo o caminho para a API

api.add_resource(Inicial, "/")
api.add_resource(Produto, "/produtos")
api.add_resource(Cliente, "/clientes")