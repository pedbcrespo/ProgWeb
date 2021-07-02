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
        print(lista)
        return ",".join(lista)

    def getTabela(self, tabela, dados, complemento="", colunas=None):
        try:
            comando = "SELECT {} FROM {} {}".format(dados, tabela, complemento)
            self.__cursor.execute(comando)

            lista_tupla = [tupla for tupla in self.__cursor]
            if colunas == None:
                self.__cursor.execute(f"SHOW COLUMNS FROM {tabela}")
                colunas = [coluna[0] for coluna in self.__cursor]

            return list(map(lambda x: self.__dic(colunas, x), lista_tupla))
        except:
            return {"status": 0}

    def postDado(self, tabela, dado):
        try:
            comando = "INSERT INTO {} VALUES ({})".format(tabela, self.__formata(dado))
            self.__cursor.execute(comando)
            self.__conexao.commit()

            return {"status": 1, "inserido": dado} 
        except:
            return {"status": 0}

    def deleteDado(self, tabela, complemento=""):
        try:
            comando = "DELETE FROM {} WHERE {}".format(tabela, complemento)
            self.__cursor.execute(comando)
            self.__conexao.commit()

            return {"status": 1, "removido": id} 
        except:
            return {"status": 0}

    def putDado(self, tabela, complemento):
        try:
            comando = f"UPDATE {tabela} SET {complemento}"
            self.__cursor.execute(comando)
            self.__conexao.commit()
            return {"status": 1}
        except:
            return {"status": 0}

    

if __name__ == '__main__':
    bd = BancoDados()
    dados = "produto.id, produto.nome, categoria.nome, produto.categoriaProduto, produto.preco, produto.caminhoImagem"
    complemento = "inner join categoria where produto.categoriaProduto = categoria.id"
    colunas = ['id', 'nome', "categoria", "id_categoria", "preco", "caminhoImagem"]
    lista = bd.getTabela("produto", dados, complemento, colunas)
    for i in lista:
        print(i)

