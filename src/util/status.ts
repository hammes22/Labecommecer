export enum STATUS {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}

/*
### 200 - Ok
status genérico de sucesso
### 201 - Created
status de criação de item de entidade
### 400 - Bad Request
status genérico de requisição inválida: método ou caminho inválidos, JSON inválido
### 401 - Unauthorized
credenciais ausentes ou inválidas
### 403 - Forbidden
usuário não tem as permissões necessárias
### 404 - Not Found
rota ou recurso não encontrado
### 409 - Conflict
tentativa de criar um registro já existente
### 422 - Unprocessable Entity
requisição válida que possui tudo para ser processada 
(não falta nada e todos os dados estão no formato correto),
porém se torna inválida devido à outras questões:
parâmetros com termos pejorativos, 
senha com muitos caracteres repetidos, etc.
### 500 - Internal Server Error
status genérico de erro do servidor e não do cliente
*/
