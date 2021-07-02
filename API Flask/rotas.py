import json
from flask import request
from flask_restful import Resource
from bd_con import BancoDados

# arquivo de definição de rotas e implementação de metodos nas mesmas

class Conexao:
    bd = BancoDados()

class Inicial(Resource):
    def get(self):
        return {"status": "Ok"}

# Classes com busca de valor especifico
class Produto(Resource, Conexao):
    def get(self, id_produto):
        dados = "produto.id, produto.nome as produto, categoria.nome  as categoria, produto.categoriaProduto as id_categoria ,produto.preco, produto.caminhoImagem as img"
        complemento = f"inner join categoria where produto.categoriaProduto = categoria.id and produto.id = {id_produto}"
        colunas = ["id", "produto", "categoria", "id_categoria", "preco", "img"]
        lista_resposta = self.bd.getTabela("produto", dados, complemento, colunas)
        return lista_resposta[0]

    def put(self, id_produto):
        pass

    def delete(self, id_produto):
        pass

class Categoria(Resource, Conexao):
    def get(self, id_categoria):
        lista_resposta = self.bd.getTabela("categoria", "*", f"WHERE id = {id_categoria}")
        return lista_resposta[0]

    def put(self, id_produto):
        pass

    def delete(self, id_produto):
        pass

class Cliente(Resource, Conexao):
    def get(self, id_cliente):
        lista_resposta = self.bd.getTabela("cliente", "*", f"WHERE id = {id_cliente}")
        return lista_resposta[0]

    def put(self, id_cliente):
        pass

    def delete(self, id_cliente):
        complemento = f"id={id_cliente}"
        return self.bd.deleteDado('cliente', complemento)

class Carrinho(Resource, Conexao):
    def get(self, id_cliente):
        dados = "cliente.nome as cliente, carrinho.idCliente ,produto.nome as produto, carrinho.idProduto, produto.preco"
        complemento = f"inner join cliente inner join produto where cliente.id = carrinho.idCliente and produto.id = carrinho.idProduto and carrinho.idCliente = {id_cliente}"
        lista_resposta = self.bd.getTabela("carrinho", dados, complemento)
        return lista_resposta[0]

    def put(self, id_cliente):
        complemento = f"finalizado = true where carrinho.idCliente = {id_cliente}"
        return self.bd.putDado('carrinho', complemento)

class ProdtudoCarrinho(Resource, Conexao):
    def delete(self, id_cliente, id_produto):
        complemento = f"carrinho.idCliente = {id_cliente} and carrinho.idProduto = {id_produto}"
        return self.bd.deleteDado('carrinho', complemento)

# Classes com busca de todos os valores registrados 
class Produtos(Resource, Conexao):
    def get(self):
        dados = "id, nome, preco"
        complemento = ""
        colunas = ['id', 'nome', 'preco']
        return self.bd.getTabela("produto", dados, complemento, colunas)

    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postDado("produto", dado_request)


class Categorias(Resource, Conexao):
    def get(self):
        return self.bd.getTabela("categoria", "*")

    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postDado("categoria", dado_request)

class Clientes(Resource, Conexao):
    def get(self):
        return self.bd.getTabela("cliente", "*")

    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postDado("cliente", dado_request)

class Carrinhos(Resource, Conexao):
    def get(self):
        return self.bd.getTabela("carrinho", "*")

    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postDado("carrinho", dado_request)