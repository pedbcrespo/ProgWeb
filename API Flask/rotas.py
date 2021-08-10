from flask import request
from flask_restful import Resource, reqparse
from config import api
from controller import *
import json

class Inicial(Resource):
    def get(self):
        return {"status":"rodando"}


class ClienteRota(Resource):
    cliente = ClienteDAO()
    def get(self):
        return self.cliente.buscar_todos_cliente_info()

    def post(self):
        novo_cliente = json.loads(request.data)
        return self.cliente.adicionar(novo_cliente['id'])

class ClienteComDados(Resource):
    cliente = ClienteDAO()
    def get(self, id_cliente):
        return self.cliente.dados_cliente(id_cliente)

    def delete(self, id_cliente):
        return self.cliente.deletar(id_cliente)

class InfoCliente(Resource):
    cliente = ClienteDAO()
    def post(self):
        dados_cliente = json.loads(request.data)
        return self.cliente.adiciona_info(
            dados_cliente['email'],
            dados_cliente['endereco'],
            dados_cliente['cep'],
            dados_cliente['idCliente']
        )

    def get(self):
        return self.cliente.buscar_todos_cliente_info()

class ClienteDados(Resource):
    cliente = ClienteDAO()
    def get(self, id_cliente):
        return self.cliente.buscar_cliente(id_cliente)

class ProdutoRota(Resource):
    produto = ProdutoDAO()
    def get(self):
        return self.produto.buscar_todos()

    def post(self):
        novo_produto = json.loads(request.data)

        return self.produto.adicionar(
            novo_produto["nome"], 
            novo_produto["categoriaProduto"],
            novo_produto["preco"],
            novo_produto['quantidade']
        )

class ProdutoInfo(Resource):
    produto = ProdutoDAO()
    def get(self, id_produto):
        return self.produto.buscar(id_produto)

    def delete(self, id_produto):
        return self.produto.deletar(id_produto)

    def put(self, id_produto):
        pass

class ImagemProduto(Resource):
    produto = ProdutoDAO()
    def get(self, id_produto):
        return self.produto.download_imagem(id_produto)

    def post(self, id_produto):
        imagem = request.files['file']
        if imagem:
            self.produto.upload_imagem(id_produto, imagem)
        return {"mensagem": "uma imagem foi enviada"}

class CategoriaRota(Resource):
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
    def get(self, id_categoria):
        return self.categoria.buscar(id_categoria)

    def delete(self, id_categoria):
        return self.categoria.deletar(id_categoria)


class CarrinhoRota(Resource):
    carrinho = CarrinhoDAO()

    def get(self):
        return self.carrinho.buscar_todos()

    def post(self):
        novo_carrinho = json.loads(request.data)
        return self.carrinho.adicionar_produto(
            novo_carrinho["idCliente"],
            novo_carrinho["idProduto"]
        )

class CarrinhoInfo(Resource):
    carrinho = CarrinhoDAO()
    def get(self, id_cliente):
        return self.carrinho.buscar(id_cliente)

    def put(self, id_cliente):
        dado_carrinho = json.loads(request.data)
        return self.carrinho.finalizar_compra(id_cliente)

class CarrinhoProduto(Resource):
    carrinho = CarrinhoDAO()
    def delete(self, id_cliente, id_produto, indice):
        return self.carrinho.remover_produto(id_cliente, id_produto, indice)

class EstoqueRota(Resource):
    produto = ProdutoDAO()
    def get(self):
        return self.produto.buscar_todo_estoque()

# Definindo o caminho para a API

api.add_resource(Inicial, "/")#GET
api.add_resource(ProdutoRota, "/produtos")#GET, POST
api.add_resource(ProdutoInfo, "/produto/<int:id_produto>")#GET, PUT
api.add_resource(CategoriaRota, "/categorias")#GET, POST
api.add_resource(ClienteRota, "/clientes")#GET, POST(só o id)
api.add_resource(CarrinhoRota, "/carrinhos")#GET, POST
api.add_resource(InfoCliente, "/info_cliente")#GET, POST
api.add_resource(ClienteDados, "/dados_cliente/<int:id_cliente>")#POST
api.add_resource(CategoriaInfo, "/categoria/<int:id_categoria>")#GET
api.add_resource(CarrinhoInfo, "/carrinho/<int:id_cliente>")#GET, PUT
api.add_resource(CarrinhoProduto, "/carrinho_del/<int:id_cliente>/<int:id_produto>/<int:indice>")#DELETE
api.add_resource(ImagemProduto, "/imagem/<int:id_produto>")#GET, POST
api.add_resource(EstoqueRota, "/estoque")