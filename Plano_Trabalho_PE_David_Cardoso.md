# Plano de Trabalho PE - David Cardoso

## Foco principal
Integracao entre o front-end e a API, criando os fluxos de registo, login, perfil e migracao das funcionalidades de CRUD existentes para a nova estrutura.

## Objetivo
Fazer com que a aplicacao em framework comunique com a API do Nelson e apresente ao utilizador formularios funcionais de autenticacao e perfil, mantendo tambem as funcionalidades principais ja criadas no PE anterior.

## Responsabilidades
- Criar servico front-end para chamadas HTTP a API.
- Criar formulario de registo.
- Criar formulario de login.
- Criar pagina ou area de perfil.
- Guardar e usar o token JWT no front-end.
- Proteger paginas ou areas que exigem login.
- Mostrar mensagens de erro e sucesso de forma clara.
- Migrar o CRUD de eventos para a estrutura da framework, reaproveitando a logica existente quando possivel.
- Garantir que a homepage consegue apresentar eventos vindos da nova estrutura ou do armazenamento local definido pela equipa.

## Fluxos a implementar
- Registo: utilizador preenche nome, email, password e confirmacao; front-end envia para a API.
- Login: utilizador envia email e password; front-end guarda token recebido.
- Perfil: utilizador autenticado consulta os seus dados.
- Edicao de perfil: utilizador altera nome e email.
- Logout: front-end remove token e volta ao estado nao autenticado.
- Eventos: funcionalidades existentes de criar/listar/editar/remover eventos ficam integradas na nova aplicacao.

## Tarefas
- [ ] Criar modulo `apiClient` ou equivalente para centralizar chamadas `fetch`.
- [ ] Criar modulo de autenticacao no front-end para guardar token e utilizador atual.
- [ ] Criar componente/pagina de registo.
- [ ] Criar componente/pagina de login.
- [ ] Criar componente/pagina de perfil.
- [ ] Ligar registo a `POST /api/auth/register`.
- [ ] Ligar login a `POST /api/auth/login`.
- [ ] Ligar perfil a `GET /api/users/me`.
- [ ] Ligar edicao de perfil a `PUT /api/users/me`.
- [ ] Criar logout.
- [ ] Proteger area de perfil contra acesso sem login.
- [ ] Migrar CRUD de eventos para componentes da framework.
- [ ] Testar fluxos completos com a API a correr.

## Entregaveis
- Registo, login, perfil e logout funcionais no front-end.
- Comunicacao assincrona com a API.
- Token JWT usado nos pedidos protegidos.
- CRUD de eventos integrado na nova estrutura.
- Lista de problemas encontrados durante a integracao para serem documentados depois.

## Dependencias
- Precisa dos endpoints do Nelson.
- Precisa da estrutura visual/componentes base do Adriano.
- A validacao visual dos formularios fica reservada para a Iulia.
