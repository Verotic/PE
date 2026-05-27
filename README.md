# Projeto PE - Landing page do Centro Académico Clínico dos Açores (CACA)

Este repositório contém o código-fonte e a documentação referente ao projeto **PE** da unidade curricular de Tecnologias Web.

A documentação da primeira e segunda fase (PI1 e PI2) pode ser consultada no repositório anterior: [Verotic/Projeto-PEI2](https://github.com/Verotic/Projeto-PEI2).

## a) Identificação do grupo (PE)

- Adriano Furtado Arruda - 2024111815
- Júlia Melo Freitas - 2024114388
- Daniela de Lima Gabriel- 30230007

## b) Descrição do Projeto (PE)

O objetivo principal do projeto é a **persistência de dados e integração de APIs externas** na landing page do CACA, utilizando tecnologias como IndexedDB e consumo de serviços web de terceiros, mantendo a arquitetura modular e boas práticas de UI/UX. 
*(Nota: As funcionalidades descritas abaixo foram desenvolvidas e implementadas ao longo do projeto.)*

### Funcionalidades Implementadas e Distribuição de Tarefas

Nesta fase, as tarefas foram realizadas de acordo com os planos de trabalho de cada elemento da equipa:

#### 1. Eventos e API de Mapas (Adriano)
Responsável pela base da plataforma: Gestão de Eventos e a sua localização no mapa.
-   **CRUD de Eventos:** Criação da página de administração (`admin-eventos.html`) com formulários e lógica para adicionar, visualizar, editar e remover eventos utilizando a IndexedDB para persistência de dados.
-   **Integração na Homepage:** Exibição dinâmica de eventos na página principal com imagens e dados vindos da base de dados local.
-   **API de Mapas:** Integração de uma API de mapas para mostrar um mapa interativo com a localização do evento criado.
-   **Módulos:** `js/modules/EventManager.js`, `js/modules/HomepageEvents.js`, `js/services/MapService.js` e `js/admin-eventos.js`.

#### 2. Newsletter, UI/UX e API Meteorológica (Daniela)
Foco na Interação com o Utilizador, captura de contactos e previsão do tempo para os eventos criados.
-   **Newsletter com Persistência:** Criação do formulário de subscrição, validação robusta (contraste de cor, etc.) e gravação local na IndexedDB, com feedback visual.
-   **API Meteorológica:** Consumo da API OpenWeatherMap para apresentar as condições climáticas locais com indicadores visuais (fundo dinâmico e loading spinner).
-   **UI/UX e Acessibilidade:** Garantia de que os novos formulários e listagens seguem o design original, são responsivos e acessíveis em diferentes browsers (ex: Safari).
-   **Módulos:** `js/modules/NewsletterManager.js` e `js/services/WeatherService.js`.

#### 3. Core DB, API de Notícias e Integração (Julia)
Responsabilidade da Arquitetura da Base de Dados, consumo de Notícias e Documentação.
-   **Core IndexedDB:** Criação da classe principal para ligação à base de dados e criação das Object Stores (tabelas) para Eventos e Newsletter.
-   **API de Notícias/RSS:** Consumo de um feed de notícias de saúde/CACA através de API ou RSS público e apresentação dinâmica.
-   **Integração e Documentação:** Inicialização de todas as classes no `main.js` e redação deste `README.md`.
-   **Módulos:** `js/core/Database.js`, `js/services/NewsService.js` e `main.js`.

## c) Estrutura do Projeto e Tecnologias

A arquitetura continua focada na **decomposição funcional**, **modularização** e **Programação Orientada a Objetos (POO)**:

### Estrutura de Pastas:
```
/
├── assets/             # Imagens e recursos estáticos
├── styles/             # Módulos CSS separados por componente/área
├── js/                 # Código JavaScript
│   ├── core/           # Lógica central da aplicação
│   │   └── Database.js # Gestão global e conexão da IndexedDB
│   ├── modules/        # Módulos independentes (Classes)
│   │   ├── EventManager.js
│   │   ├── HomepageEvents.js
│   │   └── NewsletterManager.js
│   ├── services/       # Serviços e consumo de APIs externas
│   │   ├── MapService.js
│   │   ├── WeatherService.js
│   │   └── NewsService.js
│   ├── admin-eventos.js# Lógica específica da página de administração
│   └── main.js         # Ponto de entrada e integração da aplicação
├── index.html          # Estrutura HTML
├── admin-eventos.html  # Página de Administração de Eventos (CRUD)
├── style.css           # Entry-point CSS
└── README.md           # Documentação
```

## d) Identidade Visual e Design

O nosso protótipo base (mockup) foi desenvolvido no Figma:
[Figma do Projeto TE1](https://www.figma.com/design/SNOlEnaHQc2sBNPphX713Q/TE1?node-id=0-1&t=g3v6JbHW5wJggUtT-1)

---

## Benchmarking (PE)

### Resultados do Benchmark

![Benchmark do projeto CACA - PE](benchmark.png)

---

# PE Project - Azores Academic Clinical Center (CACA) Landing Page

This repository contains the source code and documentation for the **PE** project of the Web Technologies course.

Documentation for the first and second phases (PI1 and PI2) can be found in the previous repository: [Verotic/Projeto-PEI2](https://github.com/Verotic/Projeto-PEI2).

## a) Group Identification (PE)

- Adriano Furtado Arruda - 2024111815
- Júlia Melo Freitas - 2024114388
- Daniela de Lima Gabriel - 30230007

## b) Project Description (PE)

The main goal of this project is **data persistence and external API integration** into the CACA landing page, using technologies like IndexedDB and consuming third-party web services, while maintaining the modular architecture and UI/UX best practices.

### Implemented Features and Task Distribution

#### 1. Events and Maps API (Adriano)
-   **Events CRUD:** Dedicated administration page (`admin-eventos.html`) with forms and logic to add, view, edit, and remove events using IndexedDB.
-   **Homepage Integration:** Dynamic display of upcoming events with images and data loaded from the local database.
-   **Maps API:** Integration of an interactive map to display the location of the events.
-   **Modules:** `js/modules/EventManager.js`, `js/modules/HomepageEvents.js`, `js/services/MapService.js`, and `js/admin-eventos.js`.

#### 2. Newsletter, UI/UX, and Weather API (Daniela)
-   **Persistent Newsletter:** Subscription form with robust validation, improved color contrast, and local IndexedDB storage.
-   **Weather API:** Integration of OpenWeatherMap API to show expected conditions with dynamic backgrounds and loading spinners.
-   **UI/UX and Accessibility:** Ensuring responsiveness and cross-browser compatibility (e.g., Safari date fixes) for new elements.
-   **Modules:** `js/modules/NewsletterManager.js` and `js/services/WeatherService.js`.

#### 3. Core DB, News API, and Integration (Julia)
-   **Core IndexedDB:** Main class to connect and create Object Stores for Events and Newsletter.
-   **News/RSS API:** Consuming a public health/CACA news feed and displaying it dynamically.
-   **Integration and Documentation:** Initializing all classes in `main.js` and maintaining the `README.md`.
-   **Modules:** `js/core/Database.js`, `js/services/NewsService.js`, and `main.js`.

## c) Project Structure and Technologies

### Folder Structure:
```
/
├── assets/             # Images and static resources
├── styles/             # CSS Modules
├── js/                 # JavaScript Code
│   ├── core/           # Core application logic (Database.js)
│   ├── modules/        # Independent Modules (EventManager.js, HomepageEvents.js, NewsletterManager.js)
│   ├── services/       # External APIs (MapService.js, WeatherService.js, NewsService.js)
│   ├── admin-eventos.js# Specific logic for the events admin page
│   └── main.js         # Application Entry Point
├── index.html          # Main HTML Structure
├── admin-eventos.html  # Events Administration Page (CRUD)
├── style.css           # CSS Entry-point
└── README.md           # Documentation
```

## d) Visual Identity and Design

[TE1 Project Figma](https://www.figma.com/design/SNOlEnaHQc2sBNPphX713Q/TE1?node-id=0-1&t=g3v6JbHW5wJggUtT-1)

---

## Benchmarking (PE)

### Benchmark Results

![CACA Project Benchmark - PE](benchmark.png)
