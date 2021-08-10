from models import Cliente, Info_cliente, Produto, Categoria, Carrinho, Estoque, Tipo_imagem_produto
from config import db
from skimage.transform import resize
import matplotlib.pyplot as plt
import base64


class ClienteDAO:
    def adicionar(self, id):
        db.session.add(Cliente(id))
        db.session.commit()
        return {"id":id}

    def adiciona_info(self, email, endereco, cep, id_cliente):
        db.session.add(Info_cliente(email, endereco, cep, id_cliente))
        db.session.commit()
        return {"id":id_cliente}

    def deletar(self, id):
        db.session.delete(Cliente.query.get(id))
        db.session.commit()
        return {"id":id}

    def buscar_cliente(self, id):
        cliente = Cliente.query.get(id)
        return cliente.dic()

    def dados_cliente(self, id):
        info = Info_cliente.query.filter_by(cliente_id=id).first()
        return info.dic()

    def buscar_todos_cliente_info(self):
        lista_info_cliente = Info_cliente.query.all()
        return [info.dic() for info in lista_info_cliente]


class CarrinhoDAO:
    def adicionar_produto(self, id_cliente, id_produto):
        db.session.add(Carrinho(id_cliente,id_produto))
        db.session.commit()
        return {"idCliente": id_cliente, "idProduto":id_produto}

    def finalizar_compra(self, id_cliente):
        compra_atual = Carrinho.query.filter_by(idCliente=id_cliente).all()
        
        for compra in compra_atual:
            compra.finalizado = 1
            produto_estoque = Estoque.query.get(compra.idProduto)
            produto_estoque.quantidade -= 1
        
        db.session.commit()

        return {"status": "compra finalizada"}

    def remover_produto(self, id_cliente, id_produto, indice):
        lista_produtos = Carrinho.query.filter_by(idCliente=id_cliente).all()
        print([p.dic() for p in lista_produtos])

        for produto in lista_produtos:
            if produto.idProduto == id_produto and lista_produtos.index(produto) == indice:
                db.session.delete(produto)
                break
        db.session.commit()
        
        return {"idCliente": id_cliente, "idProduto":id_produto}

    def buscar(self, id_cliente):
        compra_atual = Carrinho.query.filter_by(idCliente=id_cliente).all()
        return [compra.dic() for compra in compra_atual]

    def buscar_todos(self):
        lista_carrinhos = Carrinho.query.all()
        return [carrinho.dic() for carrinho in lista_carrinhos]


class ProdutoDAO:
    def adicionar(self, nome, categoria_id, preco, quantidade):
        db.session.add(Produto(nome, categoria_id, preco))
        db.session.commit()
        produto = Produto.query.filter_by(nome=nome).first()
        self.adicionar_estoque(produto.id, quantidade)
        return {"id":produto.id}

    def deletar(self, id):
        self.removerEstoque(id)
        produto = Produto.query.get(id)
        db.session.delete(produto)
        db.session.commit()
        return {"id":id}

    def adicionar_estoque(self, id_produto, quantidade):
        db.session.add(Estoque(id_produto, quantidade))
        db.session.commit()
        return {"id": id_produto, "quantidade": quantidade}

    def atualizarEstoque(self, id_produto, novo_valor):
        produtoEstoque = Estoque.query.filter_by(id=id_produto).first()
        produtoEstoque.quantidade = novo_valor
        db.session.commit()
        return {"id":id_produto, "quantidade":novo_valor}

    def removerEstoque(self, id_produto):
        produtoEstoque = Estoque.query.filter_by(id=id_produto).first()
        db.session.delete(produtoEstoque)
        db.session.commit()
        return {"id":id_produto}

    def buscar_todos(self):
        lista_produtos = Produto.query.all()  
        return [produto.dic() for produto in lista_produtos]

    def buscar(self, id_produto):
        prod = Produto.query.filter_by(id=id_produto).first()
        return prod.dic()

    def download_imagem(self, id_produto):
        produto = Produto.query.get(id_produto)
        tipo_imagem = Tipo_imagem_produto.query.filter_by(id_produto=id_produto).first()
        tipo = tipo_imagem.tipo_imagem
        imagem = base64.b64encode(produto.caminhoImagem).decode('utf-8')
        imagem_json = f"data:image/{tipo};base64,{imagem}"
        return {"imagem": imagem_json}

    def upload_imagem(self, id_produto, arquivo_img):
        produto = Produto.query.get(id_produto)
        
        tipo_imagem = arquivo_img.split('.')[1]

        with open(arquivo_img, 'r+b') as arq:
            produto.caminhoImagem = arq.read()

        db.session.commit()
        return {"id":id, "mensagem": "imagem armazenada com sucesso"}

    def buscar_todo_estoque(self):
        estoque = Estoque.query.all()
        return [dado.dic() for dado in estoque]

    # Esse metodo nao salva a imagem no BD, mas sim num arquivo no servidor
    def salva_imagem(self, arquivo, id_produto):
        cpy_arq = ''
        with open(arquivo, 'r+b') as arquivo_img:
            cpy_arq = arquivo_img.read()
        
        with open(f"./imgs/produto{id_produto}.jpg", 'w+b') as arquivo_slv:
            arquivo_slv.write(cpy_arq)
        
        return {"id": id_produto}

    # Esse metodo busca a imagem numa pasta no servidor
    def buscar_imagem(self, id_produto):
        arquivo_servidor = f"./imgs/produto{id_produto}.jpg"
        arquivo = ''
        with open(arquivo_servidor, 'r+b') as arqbin:
            arquivo = arqbin.read()
        imagem = base64.b64encode(arquivo).decode('utf-8')
        return {"imagem": f"data:image/jpg;base64,{imagem}"}


class CategoriaDAO:
    def adicionar(self, id, nome):
        db.session.add(Categoria(id, nome))
        db.session.commit()
        return {"id":id, "nome":nome}
    
    def deletar(self, id):
        categoria = Categoria.query.filter_by(id=id).first()
        db.session.delete(categoria)
        db.session.commit()
        return {"id":id}
    
    def buscar_todos(self):
        lista_categoria = Categoria.query.all()
        return [categoria.dic() for categoria in lista_categoria]

    def buscar(self, id_categoria):
        categoria = Categoria.query.get(id_categoria)
        return categoria.dic()

if __name__ == '__main__':
    p = ProdutoDAO()
    c = CarrinhoDAO()

    # print(c.buscar_todos())
    
    print(c.remover_produto(1,2,3))
    # print(c.buscar_todos())
