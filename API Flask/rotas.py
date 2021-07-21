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
        return self.cliente.adicionar(novo_cliente['id'])


class ClienteInfo(Resource):
    cliente = ClienteDAO()
    def get(self, id_cliente):
        return self.cliente.dados_cliente(id_cliente)

    def post(self):
        dados_cliente = json.loads(request.data)
        return self.cliente.adiciona_info(
            dados_cliente['id'],
            dados_cliente['email'],
            dados_cliente['endereco'],
            dados_cliente['cep'],
            dados_cliente['cliente_id']
        )

    def delete(self, id_cliente):
        return self.cliente.deletar(id_cliente)


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
    categoria = CategoriaDAO()
    def get(self):
        return self.categoria.buscar_todos()        

    def post(self):
        nova_categoria = json.loads(request.data)
        return self.categoria.adicionar(
            nova_categoria['id'],
            nova_categoria['nome']
        )

class CategoriaInfo(Resource):
    categoria = CategoriaDAO()
    def delete(self, id_categoria):
        return self.categoria.deletar(id_categoria)


class Carrinho(Resource):
    carrinho = CarrinhoDAO()
    def get(self, id_cliente):
        return self.carrinho.buscar(id_cliente)

    def put(self, id_cliente):
        return self.carrinho.finalizar_compra()

class CarrinhoInfo(Resource):
    carrinho = CarrinhoDAO()
    def post(self):
        novo_carrinho = json.loads(request.data)
        return self.carrinho.adicionar(
            novo_carrinho["idCliente"],
            novo_carrinho["idProduto"]
        )

class CarrinhoProduto(Resource):
    carrinho = CarrinhoDAO()
    def delete(self, id_cliente, id_produto):
        return self.carrinho.remover_produto(id_cliente, id_produto)

class TodasCompras(Resource):
    carrinho = CarrinhoDAO()
    def get(self):
        return self.carrinho.buscar_todos()

# Definindo o caminho para a API

api.add_resource(Inicial, "/")
api.add_resource(Produto, "/produtos")
api.add_resource(Cliente, "/clientes")
api.add_resource(CarrinhoInfo, "/carrinhos")
api.add_resource(TodasCompras, "/todas_compras")
api.add_resource(TodasCompras, "/carrinho/<int:id_carrinho>")
