# Plano de Trabalho PE - Nelson Ponte

## Foco principal
Desenvolvimento da API de gestao de utilizadores, conforme pedido no enunciado: registo, autenticacao, perfis e permissoes basicas.

## Objetivo
Criar um back-end em Node.js com Express que permita ao front-end registar utilizadores, autenticar login, consultar perfil, editar dados de perfil e distinguir utilizadores normais de administradores.

## Responsabilidades
- Criar a estrutura da API no servidor Express existente.
- Definir o modelo de utilizador.
- Implementar registo de utilizadores.
- Implementar login com token JWT.
- Guardar passwords com hashing.
- Criar middleware de autenticacao.
- Criar endpoints protegidos para perfil.
- Implementar permissao basica por `role`, por exemplo `user` e `admin`.
- Validar dados recebidos pela API.
- Tratar erros de forma clara para o front-end.

## Endpoints previstos
- `POST /api/auth/register` - cria um novo utilizador.
- `POST /api/auth/login` - autentica o utilizador e devolve token.
- `GET /api/users/me` - devolve o perfil do utilizador autenticado.
- `PUT /api/users/me` - atualiza o perfil do utilizador autenticado.
- `GET /api/admin/users` - lista utilizadores, apenas para administradores.

## Tarefas
- [ ] Instalar/configurar dependencias necessarias para JWT e hashing de passwords.
- [ ] Criar armazenamento de utilizadores simples para desenvolvimento, podendo ser ficheiro JSON ou base de dados leve.
- [ ] Criar modelo de utilizador com `id`, `name`, `email`, `passwordHash`, `role`, `createdAt` e `updatedAt`.
- [ ] Implementar validacao de email e password no back-end.
- [ ] Implementar registo com bloqueio de emails duplicados.
- [ ] Implementar login com comparacao segura da password.
- [ ] Implementar criacao e verificacao de JWT.
- [ ] Criar middleware `requireAuth`.
- [ ] Criar middleware `requireRole('admin')`.
- [ ] Criar endpoints de perfil.
- [ ] Criar endpoint basico de administracao.
- [ ] Testar respostas de sucesso e erro com pedidos HTTP.

## Entregaveis
- API funcional de gestao de utilizadores.
- Autenticacao com JWT.
- Passwords guardadas com hashing.
- Endpoints de perfil e permissao basica.
- Exemplos de pedidos/respostas para David integrar no front-end.

## Dependencias
- David precisa da lista final de endpoints e formato das respostas.
- Adriano precisa saber quais paginas devem existir no front-end para ligar a autenticacao.
