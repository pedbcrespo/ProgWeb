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

# =====================Produto===================
class Produto(Resource, Conexao):
    def get(self, id_produto):
        return self.bd.getProduto(id_produto)

    def put(self, id_produto):
        pass

    def delete(self, id_produto):
        pass

class Produtos(Resource, Conexao):
    def get(self):
        return self.bd.getTodosProdutos()

    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postDado("produto", dado_request)

class ProdtudoCarrinho(Resource, Conexao):
    def delete(self, id_cliente, id_produto):
        return self.bd.deleteProdutoCarrinho(id_cliente, id_produto)

# =====================Categoria===================
class Categoria(Resource, Conexao):
    def get(self, id_categoria):
        lista_resposta = self.bd.getTabela("categoria", "*", f"WHERE id = {id_categoria}")
        return lista_resposta[0]

    def put(self, id_produto):
        pass

    def delete(self, id_produto):
        pass

class Categorias(Resource, Conexao):
    def get(self):
        return self.bd.getTodasCategorias()

    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postCategoria(dado_request)

# =====================Cliente===================
class Cliente(Resource, Conexao):
    def get(self, id_cliente):
        lista_resposta = self.bd.getTabela("cliente", "*", f"WHERE id = {id_cliente}")
        return lista_resposta[0]

    def put(self, id_cliente):
        dado_request = json.loads(request.data)
        return self.bd.putCliente(id_cliente, dado_request)

    def delete(self, id_cliente):
        return self.bd.deleteCliente(id_cliente)

class Clientes(Resource, Conexao):
    def get(self):
        return self.bd.getTodosClientes()

    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postCliente(dado_request)

class InfoCliente(Resource, Conexao):
    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postInfoCliente(dado_request)

# =====================Carrinho===================
class Carrinhos(Resource, Conexao):
    def post(self):
        dado_request = json.loads(request.data)
        # return dado_request
        return self.bd.postCarrinho(dado_request)

class Carrinho(Resource, Conexao):
    def get(self, id_cliente):
        return self.bd.getProdutoCarrinho(id_cliente)

    def put(self, id_cliente):
        return self.bd.putCompras(id_cliente)

class TodasCompras(Resource, Conexao):
    def get(self):
        return self.bd.getTodasCompras()