# Plano de Trabalho PE - Adriano Arruda

## Foco principal
Refatorizacao do front-end existente para uma framework JavaScript moderna, mantendo a identidade visual do CACA e reaproveitando o trabalho feito nas fases anteriores.

## Objetivo
Transformar a landing page atual num front-end modular em framework, com componentes reutilizaveis, estrutura clara e base preparada para integracao com a API de utilizadores.

## Responsabilidades
- Escolher, com a equipa, a framework front-end a usar, por exemplo React com Vite.
- Criar a estrutura inicial do front-end em componentes.
- Implementar a base SQLite usada pela API para persistir utilizadores em desenvolvimento local.
- Migrar a landing page existente para a nova framework.
- Manter o design, cores, tipografia, secoes e identidade visual do CACA.
- Reaproveitar as interacoes e animacoes ja existentes quando fizer sentido.
- Garantir que a pagina continua responsiva em desktop, tablet e mobile.
- Preparar a estrutura de navegacao para incluir paginas de autenticacao.

## Tarefas
- [ ] Criar a base do projeto front-end em framework.
- [ ] Criar a configuracao SQLite em `data/caca.sqlite` para substituir armazenamento JSON.
- [ ] Criar componentes principais: `Header`, `Hero`, `Mission`, `Stats`, `ResearchAreas`, `Consortium`, `News`, `Events`, `Contact` e `Footer`.
- [ ] Migrar o conteudo da landing page atual para esses componentes.
- [ ] Organizar estilos globais e estilos por area/componente.
- [ ] Adaptar as animacoes e interacoes existentes para a nova estrutura.
- [ ] Criar navegacao para as paginas de login, registo e perfil.
- [ ] Testar a responsividade da interface nas larguras principais.
- [ ] Corrigir problemas visuais causados pela migracao.

## Entregaveis
- Front-end em framework a correr localmente.
- Landing page do CACA migrada para componentes.
- Estrutura visual preparada para receber as funcionalidades de autenticacao.
- Notas simples sobre a framework escolhida e organizacao do front-end.

## Dependencias
- Precisa da API do Nelson para saber que rotas de autenticacao serao usadas.
- Precisa coordenar com David a forma como os componentes de login, registo e perfil entram na aplicacao.
