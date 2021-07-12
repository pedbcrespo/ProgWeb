from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from metodosRotas import *
# Arquivo onde é configurado as rotas declaradaos

app = Flask('main')
api = Api(app)
CORS(app)

api.add_resource(Inicial, "/")
api.add_resource(Produto, "/produto/<int:id_produto>")
api.add_resource(Categoria, "/categoria/<int:id_categoria>")
api.add_resource(Cliente, "/cliente/<int:id_cliente>")
api.add_resource(Carrinho, "/carrinho/<int:id_cliente>")
api.add_resource(Produtos, "/produtos")
api.add_resource(Categorias, "/categorias")
api.add_resource(Clientes, "/clientes")
api.add_resource(Carrinhos, "/carrinhos")
api.add_resource(ProdtudoCarrinho, "/carrinho_del/<int:id_cliente>/<int:id_produto>")
api.add_resource(TodasCompras, '/todas_compras')