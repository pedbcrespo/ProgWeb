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
        return self.bd.getProdutoCarrinho(id_cliente)

    def put(self, id_cliente):
        complemento = f"finalizado = true where carrinho.idCliente = {id_cliente}"
        return self.bd.putDado('carrinho', complemento)

class ProdtudoCarrinho(Resource, Conexao):
    def delete(self, id_cliente, id_produto):
        return self.bd.deleteProdutoCarrinho(id_cliente, id_produto)

# Classes com busca de todos os valores registrados 
class Produtos(Resource, Conexao):
    def get(self):
        return self.bd.getTodosProdutos()

    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postDado("produto", dado_request)


class Categorias(Resource, Conexao):
    def get(self):
        return self.bd.getTodasCategorias()

    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postDado("categoria", dado_request)

class Clientes(Resource, Conexao):
    def get(self):
        return self.bd.getTodosClientes()

    def post(self):
        dado_request = json.loads(request.data)
        return self.bd.postDado("cliente", dado_request)

class IdClientes(Resource, Conexao):
    def get(self):
        return self.bd.getIdCliente()

class Carrinhos(Resource, Conexao):
    # def get(self):
        # return self.bd.getProdutoCarrinho()

    def post(self):
        dado_request = json.loads(request.data)
        # return dado_request
        return self.bd.postCarrinho(dado_request)

class TodasCompras(Resource, Conexao):
    def get(self):
        return self.bd.getTodasCompras()