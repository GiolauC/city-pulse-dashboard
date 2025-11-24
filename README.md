# 🤖 SOF.IA: Agente Inteligente + Dashboard de Gestão Cívica

## ✨ 1. Visão Geral do Projeto

A **SOF.IA** é uma solução completa de **Engajamento Cidadão Inteligente** que conecta moradores, gestão pública e negócios locais. Ela utiliza um fluxo inteligente via **WhatsApp** e um **Dashboard Web** de monitoramento para modernizar a comunicação cívica.

A missão é traduzir informações complexas em orientações simples e acionáveis, transformando a interação em **inteligência acionável** para a gestão pública.

### 🎯 Proposta de Valor

  * **Acessibilidade:** Permite que qualquer pessoa entenda leis, registre demandas e participe, utilizando a **linguagem natural** do WhatsApp.
  * **Inteligência:** A SOF.IA coleta dados estruturados sobre denúncias, necessidades e interesses (problemas de infraestrutura, solicitações de serviços) e os organiza em um painel analítico.
  * **Eficiência:** Cidades podem **priorizar demandas reais**, reduzir retrabalho e acompanhar a resolução de problemas de forma mais eficiente.

-----

## 👥 2. Equipe de Desenvolvimento

  * **Giovanna Carvalho de Moraes** - `giovannamilena50@gmail.com`
  * **Matheus Costa** - `matheushenri26@outlook.com`
  * **Jesus Felipe Candian Silva** - `felipecandian95@gmail.com`
  * **Pedro Henrique Santiago Siqueira** - `pedro.santiagosiqueira@gmail.com`

-----

## 🏗️ 3. Arquitetura do Sistema

O sistema utiliza uma arquitetura full-stack, com o **n8n** gerenciando o fluxo de mensagens e a **IA** (OpenAI) garantindo a classificação dos dados.

### 3.1. Fluxo de Comunicação

O fluxo integra o canal do cidadão ao sistema de gestão:

1.  **Cidadãos (WhatsApp):** Interagem com o Agente SOF.IA.
2.  **n8n + OpenAI (Automação):** Recebe e processa a mensagem, aplicando o filtro de qualidade e estruturando os dados.
3.  **Backend (Spring Boot):** Recebe os dados estruturados via HTTP/REST e gerencia a lógica de negócios e segurança.
4.  **Database (PostgreSQL):** Armazena as demandas, métricas e o histórico da IA.

### 3.2. Tecnologias Utilizadas

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Frontend** | **React 18** / **Vite** | Interfaces, **shadcn/ui** (componentes), **Recharts** (gráficos). |
| **Backend** | **Spring Boot 3.4** / **Java 17+** | **Spring Security** (autenticação), **Spring Data JPA** (persistência). |
| **Database** | **PostgreSQL** / **H2** | PostgreSQL (Produção), H2 (Desenvolvimento), **Flyway** (migração). |
| **Automação** | **n8n** / **OpenAI** | Orquestração do WhatsApp, **filtragem de qualidade** e categorização automática. |

-----

## 💡 4. Funcionalidades Detalhadas

| Módulo | Funcionalidades |
| :--- | :--- |
| **Dashboard Principal** | **Métricas em tempo real**, Visualização de interações por localização, Análise demográfica por faixa etária e Indicadores de performance municipal. |
| **Gestão de Demandas** | **Interações via WhatsApp**, **Mapa de ocorrências**, Upload e visualização de fotos (evidências), e **Categorização automática** (IA). |
| **Consultas Governamentais** | **Chat com IA Sofia** para esclarecimentos sobre leis municipais, Análise de regulamentações e Suporte a decisões administrativas. |
| **Métricas e Analytics** | **Questões urgentes identificadas por IA**, Análise de tendências temporais, Métricas de engajamento cidadão e Relatórios exportáveis. |

-----

## 💻 5. Como Executar o Projeto

### 5.1. Pré-requisitos

  * **Node.js 18+**
  * **Java 17+**
  * **npm** ou **yarn**
  * **N8N** configurado e rodando com acesso às APIs (Evolution, OpenAI, Redis, etc.).

### 5.2. Executar o Backend (Spring Boot)

```bash
# Navegar para o diretório do backend
cd c:\Users\Giovanna\IdeaProjects\Sofia\sofia

# Executar o backend
.\mvnw.cmd spring-boot:run
```

> O backend estará disponível em: `http://localhost:8080`

### 5.3. Executar o Frontend (React/Vite)

```bash
# Navegar para o diretório do frontend
cd "C:\Users\{user}\OneDrive\Área de Trabalho\city-pulse-dashboard"

# Instalar dependências
npm install

# Executar o frontend
npm run dev
```

> O frontend estará disponível em: `http://localhost:5173`

### 5.4. Endpoints e Configuração

  * **Endpoints Principais (Backend):** Health Check: `GET /actuator/health`, Métricas: `GET /metrics/dashboard`, H2 Console: `http://localhost:8080/h2-console`.
  * **Configuração do Backend:** O arquivo `application.properties` define a conexão com o H2 para desenvolvimento.
  * **Configuração do Frontend:** O arquivo `.env.local` deve apontar para o Backend: `VITE_API_URL=http://localhost:8080`.

### 5.5. Estrutura do Projeto

```
city-pulse-dashboard/
├── src/
│   ├── components/     # Componentes React (shadcn/ui)
│   ├── pages/          # Páginas da aplicação (Dashboard)
│   ├── services/       # Serviços de API (Comunicação com o Backend)
├── sofia/              # Backend Spring Boot (Lógica de API)
├── .n8n/               # Workflow da Automação SOF.IA
└── dist/               # Build de produção
```

-----

## 🤝 6. Contribuição e Licença

### 6.1. Contribuição

Este projeto segue as práticas de **Conventional Commits**.

  * Faça um `fork` do projeto.
  * Crie uma `branch` para sua feature (ex: `git checkout -b feat/nova-funcionalidade`).
  * Commit suas mudanças seguindo o padrão (ex: `git commit -m 'feat: adicionar nova funcionalidade'`).
  * Abra um **Pull Request**.

### 6.2. Licença

Este projeto está licenciado sob a **MIT License**.
