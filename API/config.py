import json
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from rotas import Inicial, Produto, Produtos, Categoria, Categorias, Cliente, Clientes, Carrinho, Carrinhos

# Arquivo onde é configurado as rotas declaradaos

app = Flask(__name__)
api = Api(app)
CORS(app)
        
api.add_resource(Inicial, "/")
api.add_resource(Produto, "/produto/<int:id_produto>")
api.add_resource(Categoria, "/categoria/<int:id_categoria>")
api.add_resource(Cliente, "/cliente/<int:id_cliente>")
api.add_resource(Carrinho, "/carrinho/<int:id_carrinho>")
api.add_resource(Produtos, "/produtos")
api.add_resource(Categorias, "/categorias")
api.add_resource(Clientes, "/clientes")
api.add_resource(Carrinhos, "/carrinhos")