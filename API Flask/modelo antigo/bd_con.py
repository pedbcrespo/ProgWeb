import pymysql
import datetime
import decimal

# arquivo de comandos de requisição para o banco de dados

class BancoDados():
    def __init__(self, hst="localhost", usr="root", pss="", dtb="progweb"):
        try:
            self.__conexao = pymysql.connect(
                host=hst,
                user=usr,
                passwd=pss,
                database=dtb
            )
            self.__cursor = self.__conexao.cursor()
        except:
            print("Erro ao conectar")
        
    def __dic(self, colunas, dado):
        dicionario = {}
        for coluna in colunas:
            val = dado[colunas.index(coluna)]
            if type(val) == datetime.time:
                val = str(val).split('-')
                val.reverse()
            if type(val) == decimal.Decimal:
                val = float(val)
            dicionario[coluna] = val
        return dicionario    

    def __formata(self, dado):
        # dado é um dicionario
        lista = []
        for key in dado:
            if type(dado[key])==str:
                lista.append(f"'{dado[key]}'")
            else:
                lista.append(str(dado[key]))
        return ",".join(lista)



# =================GET=======================
    def getTabela(self, comando, colunas):
        try:
            self.__cursor.execute(comando)
            lista_tupla = [tupla for tupla in self.__cursor]            
            lista = list(map(lambda tup : self.__dic(colunas, tup), lista_tupla))
            return lista
        except:
            return []

    def getTodosProdutos(self):
        comando = "select produto.id, produto.nome, categoria.nome  as categoria , produto.categoriaProduto as idCategoria, produto.preco, HEX(produto.caminhoImagem) as caminhoImagem from produto inner join categoria on produto.categoriaProduto = categoria.id"
        colunas = ['id', 'nome', 'categoria', 'idCategoria', 'preco', 'caminhoImagem']
        return self.getTabela(comando, colunas)
    
    def getProduto(self, id_produto):
        comando = f"select produto.id, produto.nome, categoria.nome  as categoria , produto.categoriaProduto as idCategoria, produto.preco, HEX(produto.caminhoImagem) as caminhoImagem from produto inner join categoria on produto.categoriaProduto = categoria.id where produto.id = {id_produto}"
        colunas = ['id', 'nome', 'categoria', 'idCategoria', 'preco', 'caminhoImagem']
        return self.getTabela(comando, colunas)[0]

    def getTodasCategorias(self):
        comando = "select * from categoria"
        colunas = ['id', 'nome']
        return self.getTabela(comando, colunas)

    def getTodosClientes(self):
        comando = "select cliente.id, info_cliente.email, info_cliente.endereco, info_cliente.cep from cliente inner join info_cliente on cliente.id = info_cliente.id"
        colunas = ['id', 'email', 'endereco', 'cep']
        return self.getTabela(comando, colunas)

    def getIdClientes(self):
        comando = "select * from cliente"
        colunas = ['id']
        return self.getTabela(comando, colunas)

    def getTodasCompras(self):
        parte_1 = "select carrinho.idCliente as idCliente, info_cliente.email as cliente, info_cliente.cep as cep, carrinho.idProduto as idProduto, produto.nome as produto, categoria.nome as categoria, produto.preco, carrinho.finalizado from carrinho"
        parte_2 = "inner join info_cliente on carrinho.idCliente = info_cliente.id"
        parte_3 = "inner join produto on carrinho.idProduto = produto.id"
        parte_4 = "inner join categoria on produto.categoriaProduto = categoria.id"

        comando = f"{parte_1} {parte_2} {parte_3} {parte_4}"
        colunas = ['id', 'cliente', 'cep', 'idProduto', 'produto', 'categoria', 'preco', 'finalizado']
        
        return self.getTabela(comando, colunas)

    def getProdutoCarrinho(self, id_cliente):
        select_parte = "select carrinho.idProduto as id, produto.nome as nome, categoria.nome as categoria, produto.preco from carrinho"
        inner_parte = "inner join produto inner join categoria where carrinho.idProduto = produto.id and produto.categoriaProduto = categoria.id and carrinho.finalizado = 0 and carrinho.idCliente = {}".format(id_cliente)
        comando = f"{select_parte} {inner_parte}"
        return self.getTabela(comando, ['id', 'nome', 'categoria', 'preco'])

    def getProdutoEstoque(self, id_produto):
        comando = f"select * from estoque where id = {id_produto}"
        colunas = ["id", "quantidade"]
        return self.getTabela(comando, colunas)[0]

    def getEstoque(self):
        comando_parte_1 = "select produto.id, produto.nome, categoria.nome, estoque.quantidade from produto"
        comando_parte_2 = "inner join categoria on produto.categoriaProduto = categoria.id"
        comando_parte_3 = "inner join  estoque on estoque.id = produto.id"
        comando = f"{comando_parte_1} {comando_parte_2} {comando_parte_3}"
        colunas = ['id', 'nome', 'categoria', 'quantidade']
        return self.getTabela(comando, colunas)


# =================POST=======================
    def postDado(self, comando):
        try:
            # comando = "INSERT INTO {} VALUES ({})".format(tabela, self.__formata(dado))
            self.__cursor.execute(comando)
            self.__conexao.commit()

            return {"status": 1, "mensagem": "enviado com sucesso"} 
        except:
            return {"status": 0, "mensagem": "erro ao enviar dado"}

    def postProduto(self, dado):
        comando = "INSERT INTO produto (nome, categoriaProduto, preco, caminhoImagem) VALUES ({})".format(self.__formata(dado))
        return self.postDado(comando)
    
    def postCategoria(self, dado):
        comando = "INSERT INTO categoria (nome) VALUES ({})".format(self.__formata(dado))
        return self.postDado(comando)

    def postCliente(self, dado):
        comando = "insert into cliente value ({})".format(self.__formata(dado))
        return self.postDado(comando)

    def postCarrinho(self, dado):
        comando = "INSERT INTO carrinho (idCliente, idProduto) VALUES ({})".format(self.__formata(dado))
        return self.postDado(comando)

    def postInfoCliente(self, dado):
        comando = "insert into info_cliente (id, email, endereco, cep) values ({})".format(self.__formata(dado))
        return self.postDado(comando)



# =================DELETE=======================
    def deleteDado(self, comando):
        try:
            self.__cursor.execute(comando)
            self.__conexao.commit()

            return {"status": 1} 
        except:
            return {"status": 0, "mensagem": "erro ao deletar dado"}

    def deleteProdutoCarrinho(self, id_cliente, id_produto):
        comando = f"delete from carrinho where idCliente={id_cliente} and idProduto={id_produto} limit 1"
        return self.deleteDado(comando)

    def deleteCarrinho(self, id_cliente):
        comando = f"delete from carrinho where idCliente={id_cliente}"
        return self.deleteDado(comando)
    
    def deleteInfoCliente(self, id_cliente):
        comando = f"delete form info_cliente where id={id_cliente}"
        return self.deleteDado(comando)

    def deleteCliente(self, id_cliente):
        self.deleteCarrinho(id_cliente)
        self.deleteInfoCliente(id_cliente)
        comando = f"delete from cliente where id = {id_cliente}"
        return self.deleteDado(comando)
    


# =================PUT=======================
    def putDado(self, comando):
        try:
            self.__cursor.execute(comando)
            self.__conexao.commit()
            return {"status": 1}
        except:
            return {"status": 0, "mensagem": "erro ao atualizar dado"}

    def putCliente(self, id_cliente, dado):
        email = dado['email']
        endereco = dado['endereco']
        cep = dado['cep']
        comando = 'update info_cliente set email="{}", endereco="{}", cep="{}" where id={}'.format(email, endereco, cep, id_cliente)
        return self.putDado(comando)

    def putCompras(self, id_cliente):
        comando = f"update carrinho set finalizado = 1 where idCliente = {id_cliente}"
        return self.putDado(comando)

    def putEstoque(self, id_produto):
        quantidade = self.getProdutoEstoque(id_produto)['quantidade'] - 1
        comando = f"update estoque set quantidade={quantidade} where id={id_produto}"
        return self.putDado(comando)

        
if __name__ == '__main__':
    bd = BancoDados()
    # print(bd.getTodosProdutos())
    # print(bd.getTodosClientes())
    # print(bd.getTodasCompras())
    # print(bd.getProdutoCarrinho())
    print(bd.postInfoCliente({"id":4267, "email": "p-crespo@hotmail.com", "endereco": "Cabo Frio", "cep":"22999000"}))