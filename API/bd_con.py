import pymysql
import datetime

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

            dicionario[coluna] = val
        return dicionario    

    def __formata(self, dado):
        # dado é um dicionario
        lista = []
        for key in dado:
            if type(dado[key])==str:
                lista.append(f"'{dado[key]}'")
            else:
                lista.append(dado[key])
        return ",".join(lista)

    def getTabela(self, tabela, dados, complemento=""):
        try:
            comando = "SELECT {} FROM {} {}".format(dados, tabela, complemento)
            self.__cursor.execute(comando)

            lista_tupla = [tupla for tupla in self.__cursor]
            self.__cursor.execute(f"SHOW COLUMNS FROM {tabela}")
            colunas = [coluna[0] for coluna in self.__cursor]

            return list(map(lambda x: self.__dic(colunas, x), lista_tupla))
        except:
            return {"status": "Erro ao executar o comando"}

    def postDado(self, tabela, dado):
        try:
            comando = "INSERT INTO {} VALUES ({})".format(tabela, self.__formata(dado))
            self.__cursor.execute(comando)
            self.__cursor.commit()

            return {"status": "Operacao realizada com sucesso", "inserido": dado} 
        except:
            return {"status": "Erro ao inserir o novo dado"}

    def deleteDado(self, tabela, id):
        try:
            comando = "DELETE FROM {} WHERE id = {}".format(tabela, id)
            self.__cursor.execute(comando)
            self.__cursor.commit()

            return {"status": "Operacao realizada com sucesso", "removido": id} 
        except:
            return {"status": "Erro ao remover dado"}

    def putDado(self, tabela, id, alteracao):
        try:
            comando = ""
        except:
            return {"status": "Erro alterar dado"}

if __name__ == '__main__':
    bd = BancoDados()
    bd.getTabela("produto", "*")
    