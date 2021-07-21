from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import dados_bd as dbd

conn = "mysql+pymysql://{}:{}@{}/{}".format(dbd.usuario, dbd.senha, dbd.host, dbd.bancoDados)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = conn
db = SQLAlchemy(app)
api = Api(app)
CORS(app)

cors = CORS(app, resources={
    r"/*":{
        "origins":"*"
    }
})
