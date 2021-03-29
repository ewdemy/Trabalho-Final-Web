# ESTOQUE

GET /estoque - Listar estoque
GET /estoque/{id} - Buscar por ID
GET /estoque/buscar/{produto} - Buscar por nome do produto ou parte do nome
POST /estoque - Adicionar estoque. deve enviar payload nesse modelo: 
{
	"produto": "nome do produlo"
}
obs.: Só pode ser adicionado ou atualizado nome do produto. 
PUT /estoque/{id} - Atualizar estoque
DELETE /estoque/{id} - Deletar estoque

# ENTRADA

GET /entradas - Listar entradas
POST /entradas - Adicionar entrada. deve enviar payload nesse modelo: 
{
	"produtoId": "ID",
	"quantidade": quantidade
}
DELETE /entradas/{id} - Deletar entrada

# SAÍDA

GET /saidas - Listar saidas
POST /saidas - Adicionar saída. deve enviar payload nesse modelo: 
{
	"produtoId": "ID",
	"quantidade": quantidade
}
DELETE /saidas/{id} - Deletar saída