from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from bd_con import BancoDados

app = Flask(__name__)
api = Api(app)
CORS(app)

class Conexao:
    bd = BancoDados()

# Classes com busca de valor especifico
class Produto(Resource, Conexao):
    def get(self, id):
        dados = "produto.id, produto.nome as produto, categoria.nome  as categoria ,produto.preco, produto.caminhoImagem"
        complemento = f"inner join categoria where produto.categoriaProduto = categoria.id and produto.id = {id}"
        lista_resposta = self.bd.getTabela("produto", dados, complemento)
        return lista_resposta[0]

class Categoria(Resource, Conexao):
    def get(self, id):
        lista_resposta = self.bd.getTabela("categoria", "*", f"WHERE id = {id}")
        return lista_resposta[0]

class Cliente(Resource, Conexao):
    def get(self, id):
        lista_resposta = self.bd.getTabela("cliente", "*", f"WHERE id = {id}")
        return lista_resposta[0]

class Carrinho(Resource, Conexao):
    def get(self, id):
        dados = "carrinho.id, cliente.nome as cliente, carrinho.idCliente ,produto.nome as produto, carrinho.idProduto, produto.preco"
        complemento = f"inner join cliente inner join produto where cliente.id = carrinho.idCliente and produto.id = carrinho.idProduto and carrinho.id = {id}"
        lista_resposta = self.bd.getTabela("carrinho", dados, complemento)
        return lista_resposta[0]
        
# Classes com busca de todos os valores registrados 
class Produtos(Resource, Conexao):
    def get(self):
        return self.bd.getTabela("produto", "*")
    
class Categorias(Resource, Conexao):
    def get(self):
        return self.bd.getTabela("categoria", "*")

if __name__ == '__main__':
    app.run(debug=True)
    