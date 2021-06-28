from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from bd_con import BancoDados

app = Flask(__name__)
api = Api(app)
CORS(app)

class Conexao:
    bd = BancoDados()


if __name__ == '__main__':
    app.run(debug=True)
    