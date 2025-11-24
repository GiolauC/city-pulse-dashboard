# 🤖 SOF.IA: Agente Inteligente + Dashboard de Gestão Cívica

## ✨ 1. Visão Geral do Projeto

A **SOF.IA** é uma solução de Engajamento Cidadão Inteligente que une a facilidade do WhatsApp com a análise de dados robusta para a gestão pública.

O projeto é dividido em dois grandes pilares que se complementam:

1.  **Agente Inteligente (SOF.IA):** O motor de comunicação e processamento de linguagem natural (LN), responsável por coletar, filtrar e estruturar dados via WhatsApp.
2.  **Dashboard SOF.IA:** A interface web de gestão, responsável por visualizar métricas em tempo real, demandas georreferenciadas e fornecer suporte à decisão governamental.

### 🎯 Missão e Valor

[cite\_start]A missão principal é transformar a **participação cidadã em impacto legislativo real**[cite: 3].

| Atributo | Descrição Detalhada |
| :--- | :--- |
| **Acessibilidade** | Garante que **qualquer pessoa** entenda leis e registre demandas, traduzindo informações complexas em orientações simples e acionáveis. |
| **Filtragem de Dados** | A IA classifica demandas por tipo e urgência, garantindo que o volume de interações se transforme em **inteligência acionável** para gestores. |
| **Mercado** | [cite\_start]Atua no mercado GovTech, focado em **5.570 prefeituras no Brasil** e câmaras legislativas[cite: 50, 51]. |

-----

## 🏗️ 2. Arquitetura do Sistema e Fluxo de Dados

O sistema é construído sobre uma arquitetura full-stack, onde o N8N atua como o **motor de integração** primário.

### 2.1. Fluxo de Dados (Ponta a Ponta)

O fluxo segue uma progressão lógica:

1.  **Cidadão (WhatsApp):** Interage em linguagem natural.
2.  **Automação (n8n + OpenAI):** Recebe, processa, filtra o ruído e estrutura a demanda.
3.  **Backend (Spring Boot):** Recebe os dados estruturados via HTTP/REST e armazena.
4.  **Database (PostgreSQL):** Persistência dos dados de gestão e métricas.
5.  **Dashboard (React/Vite):** Consome os dados do Backend para visualização e análise.

### 2.2. Tecnologias Utilizadas

| Camada | Componente | Detalhes e Versões |
| :--- | :--- | :--- |
| **Frontend** | Dashboard | **React 18**, **TypeScript**, **Vite** (Build), **Tailwind CSS** (UI), **Recharts** (Gráficos). |
| **Backend** | API de Gestão | **Spring Boot 3.4**, **Java 17+**, **Spring Security** (Autenticação). |
| **Persistência** | Banco de Dados | **PostgreSQL** (Produção), **H2** (Desenvolvimento), **Flyway** (Migração). |
| **Automação** | Workflow | **N8N** (Orquestração), **Redis** (Buffer), **Evolution API** (WhatsApp), **OpenAI/Gemini** (IA/Análise). |

-----

## ⚙️ 3. Detalhamento do Workflow N8N

O N8N é o motor de triagem e inteligência da SOF.IA.

### 3.1. Entrada e Automação de Leads

O fluxo inicial garante que a comunicação seja tratada e o usuário identificado:

  * **Webhook EVO:** Ponto de entrada das mensagens.
  * **Dados:** Extrai o `pushName` e o `remoteJid` (Número).
  * **Consulta se o Lead existe:** Verifica no **PostgreSQL/Supabase** se o número já está cadastrado.
  * **já\_existe\_numero (IF/Else):** Direciona para `criar_lead` (Supabase) se for o primeiro contato.

### 3.2. Tratamento de Mídia e Contexto (Buffer)

O sistema lida com áudio e fragmentação de mensagens:

  * **Switch1:** Roteia a mensagem por tipo (`audioMessage`, `imageMessage`, `conversation`).
      * **Áudio:** Transcrição via `HTTP Request1` (Groq/Whisper).
      * **Imagens:** Análise multimodal via `Analyze an image` (Gemini).
  * **Buffer (Redis):** O sistema `push` / `Wait` / `junta_msgs` usa o **Redis** para armazenar o histórico recente, garantindo que a IA receba o contexto completo e não mensagens fragmentadas.

### 3.3. Agente de IA e Decisão Estratégica

O motor de IA aplica a lógica de negócios e o filtro de qualidade:

  * **AI Agent:** Processa o contexto usando um LLM (OpenAI `gpt-5-mini`), com memória persistente (`Chat` - PostgreSQL) e ferramentas externas, como `salvaBancoDados`.
  * **Prompt de Sistema:** Fornece o papel acolhedor da SOF.IA e o fluxo de coleta de dados (Nome, Idade, Bairro/Rua) e o fluxo de registro de problemas.
  * **Structured Output Parser:** Força a IA a retornar dados em **JSON** para decisões binárias e estruturação da informação, facilitando o consumo pelo Backend do Dashboard.
  * **Divisão e Envio:** A resposta da IA é segmentada (`divide_msgs` / `Split Out`) em mensagens curtas para simular uma conversa natural antes de ser enviada via `Enviar texto`.

-----

## 💻 4. Guia de Execução e Desenvolvimento

### 4.1. Pré-requisitos de Desenvolvimento

Certifique-se de ter as seguintes versões instaladas localmente:

  * **Node.js 18+**
  * **Java 17+**
  * **npm** ou **yarn**

### 4.2. Execução Local

Execute o Backend e o Frontend separadamente, garantindo que o N8N esteja ativo.

#### 1\. Backend (Spring Boot)

```bash
# Navegar para o diretório do backend
cd c:\Users\Giovanna\IdeaProjects\Sofia\sofia
# Executar o backend
.\mvnw.cmd spring-boot:run
```

> **Endpoints Principais:**
>
>   * Health Check: `GET /actuator/health`
>   * Métricas: `GET /metrics/dashboard`
>   * H2 Console: `http://localhost:8080/h2-console`

#### 2\. Frontend (Dashboard React/Vite)

```bash
# Navegar para o diretório do frontend
cd "C:\Users\{user}\OneDrive\Área de Trabalho\city-pulse-dashboard"
# Instalar dependências
npm install
# Executar o frontend
npm run dev
```

> O Dashboard estará disponível em: `http://localhost:5173`

### 4.3. Testes e Deploy

  * **Testes de Integração:** Use o script `test-integration.bat` para verificar a comunicação completa entre as camadas.
  * **Deploy Completo:** O script `deploy-full-stack.bat` gerencia o deploy do Frontend e Backend.
  * **Plataformas Recomendadas:** Frontend (Vercel, Netlify); Backend (Railway, Render, Heroku); Banco (Supabase, PlanetScale).

-----

## 🤝 5. Contribuição e Licença

### Contribuição

Este projeto segue as práticas de **Conventional Commits** para padronização das mensagens de commit.

| Tipo | Descrição | Exemplo |
| :--- | :--- | :--- |
| `feat` | Nova funcionalidade | `feat(dashboard): adicionar métricas em tempo real` |
| `fix` | Correção de bug | `fix(api): corrigir endpoint de autenticação` |
| `docs` | Alterações na documentação | `docs(readme): atualizar instruções de instalação` |

### Licença

Este projeto está licenciado sob a **MIT License**.
