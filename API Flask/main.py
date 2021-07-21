from config import app
from rotas import *
from flask_cors import CORS

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
    