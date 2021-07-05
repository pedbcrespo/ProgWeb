import pymysql
import datetime
import decimal
import json

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
        print(lista)
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
        comando = "select produto.id, produto.nome, categoria.nome  as categoria , produto.categoriaProduto as idCategoria, produto.preco, HEX(produto.caminhoImagem) as caminhoImagem from produto inner join categoria where produto.categoriaProduto = categoria.id"
        colunas = ['id', 'nome', 'categoria', 'idCategoria', 'preco', 'caminhoImagem']
        return self.getTabela(comando, colunas)
    
    def getTodasCategorias(self):
        comando = "select * from categoria"
        colunas = ['id', 'nome']
        return self.getTabela(comando, colunas)

    def getTodosClientes(self):
        comando = "select * from cliente"
        colunas = ['id', 'email', 'endereco', 'cep']
        return self.getTabela(comando, colunas)

    def getIdCliente(self):
        comando = "select id from cliente"
        colunas = ['id']
        return self.getTabela(comando, colunas)

    def getTodasCompras(self):
        select_parte = "select carrinho.idCliente as idCliente, cliente.email as cliente, cliente.cep as cep, carrinho.idProduto as idProduto, produto.nome as produto, categoria.nome as categoria, produto.preco, carrinho.finalizado"
        from_parte = "from carrinho inner join cliente inner join produto inner join categoria"
        where_parte = "where carrinho.idCliente = cliente.id and carrinho.idProduto = produto.id and categoria.id = produto.categoriaProduto"
        comando = f"{select_parte} {from_parte} {where_parte}"
        colunas = ['id', 'cliente', 'cep', 'idProduto', 'produto', 'categoria', 'preco', 'finalizado']
        
        return self.getTabela(comando, colunas)

    def getProdutoCarrinho(self, id_cliente):
        select_parte = "select carrinho.idProduto as id, produto.nome as nome, categoria.nome as categoria, produto.preco from carrinho"
        inner_parte = "inner join produto inner join categoria where carrinho.idProduto = produto.id and produto.categoriaProduto = categoria.id and carrinho.finalizado = 0 and carrinho.idCliente = {}".format(id_cliente)
        comando = f"{select_parte} {inner_parte}"
        return self.getTabela(comando, ['id', 'nome', 'categoria', 'preco'])


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
        comando = "INSERT INTO cliente (nome, endereco, cep) VALUES ({})".format(self.__formata(dado))
        return self.postDado(comando)

    def postCarrinho(self, dado):
        comando = "INSERT INTO carrinho (idCliente, idProduto) VALUES ({})".format(self.__formata(dado))
        return self.postDado(comando)

# =================DELETE=======================
    def deleteDado(self, comando):
        try:
            self.__cursor.execute(comando)
            self.__conexao.commit()

            return {"status": 1} 
        except:
            return {"status": 0, "mensagem": "erro ao deletar dado"}

# =================PUT=======================
    def putDado(self, comando):
        try:
            self.__cursor.execute(comando)
            self.__conexao.commit()
            return {"status": 1}
        except:
            return {"status": 0, "mensagem": "erro ao atualizar dado"}


    def putCliente(self, id_cliente, dado):
        comando = f"update cliente set email='{dado['email']}', endereco='{dado['endereco']}', cep='{dado['cep']}' where id={id_cliente}"
        return self.putDado(comando)


if __name__ == '__main__':
    bd = BancoDados()
    # print(bd.getTodosProdutos())
    # print(bd.getTodosClientes())
    # print(bd.getTodasCompras())
    # print(bd.getProdutoCarrinho())
    print(bd.getIdCliente())