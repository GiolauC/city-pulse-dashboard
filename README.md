# 🤖 SOF.IA — Agente Inteligente + Dashboard de Gestão Cívica

## ✨ 1. Visão Geral

A **SOF.IA** é uma plataforma de **Engajamento Cidadão Inteligente** que combina:

* Um **Agente Automatizado via WhatsApp**
* Um **Dashboard Web Analítico**
* Uma arquitetura integrada com **n8n + IA + Spring Boot + PostgreSQL**

A solução converte mensagens do cidadão em **dados estruturados** e gera **inteligência acionável** para governos municipais.

---

## 👥 2. Equipe

* **Giovanna Carvalho de Moraes** — `giovannamilena50@gmail.com`
* **Matheus Costa** — `matheushenri26@outlook.com`
* **Jesus Felipe Candian Silva** — `felipecandian95@gmail.com`
* **Pedro Henrique Santiago Siqueira** — `pedro.santiagosiqueira@gmail.com`

---

## 🏗️ 3. Arquitetura do Sistema

### 🔄 Fluxo de Comunicação

1. **Cidadão (WhatsApp)** → envia mensagem
2. **n8n + OpenAI** → classifica e estrutura
3. **Backend (Spring Boot)** → processa, armazena e expõe API
4. **Frontend (React)** → dashboards e métricas
5. **Database (PostgreSQL/H2)** → persistência de dados

### 🧩 Tecnologias Utilizadas

| Camada        | Tecnologia                                                  |
| ------------- | ----------------------------------------------------------- |
| **Frontend**  | React 18, Vite, Tailwind, shadcn/ui, Recharts               |
| **Backend**   | Spring Boot 3.4, Java 17+, Spring Security, Spring Data JPA |
| **Banco**     | PostgreSQL (prod), H2 (dev), Flyway                         |
| **Automação** | n8n, OpenAI                                                 |

---

## 💡 4. Funcionalidades

*(mantido igual à versão anterior — organizado e não repetitivo)*

---

# 💻 5. Como Executar o Projeto

## 5.1. Clonar o Repositório

```bash
git clone https://github.com/Pedro1santiago/Sofia
```

Ou acesse:
🔗 [https://github.com/Pedro1santiago/Sofia](https://github.com/Pedro1santiago/Sofia)

---

# ⚙️ 5.2. Configurar o Backend (Spring Boot)

## 📌 Variáveis de Ambiente Necessárias

Crie um arquivo **`.env`** ou configure no sistema:

```
DB_USERNAME=postgres
DB_PASSWORD=578ead459354cf44f3b6
DB_URL=jdbc:postgresql://localhost:5432/sofia
```

> Caso esteja usando H2 em desenvolvimento, não precisa alterar nada — o Spring Boot já vem configurado para H2 no `application.properties`.

---

## 🧩 5.3. Executar o Backend

### Opção 1 — Executar pela IDE (IntelliJ/Eclipse)

1. Abra o projeto clonado.
2. Localize o arquivo:

```
src/main/java/.../SofiaApplication.java
```

3. Clique em **Run SofiaApplication**.

---

### Opção 2 — Executar pelo Terminal

```bash
cd Sofia
.\mvnw.cmd spring-boot:run
```

Ou no Linux/Mac:

```bash
./mvnw spring-boot:run
```

Backend disponível em:
👉 [http://localhost:8080](http://localhost:8080)

---

## 🔍 Endpoints Principais

* Health Check → `GET /actuator/health`
* Dashboard Metrics → `GET /metrics/dashboard`
* H2 Console (local dev) → `http://localhost:8080/h2-console`

---

# 🖥️ 5.4. Executar o Frontend (React/Vite)

```bash
cd "C:\Users\{user}\OneDrive\Área de Trabalho\city-pulse-dashboard"
npm install
npm run dev
```

Frontend disponível em:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🌐 5.5. Variáveis de Ambiente (Frontend)

Crie `.env.local`:

```
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=City Pulse Dashboard
```

---

# 🧪 6. Scripts Automatizados

```bash
test-integration.bat     # Teste de integração
deploy-full-stack.bat    # Deploy frontend + backend
```

---

# 📁 7. Estrutura do Projeto

*(mantido conforme sua versão final)*

---

# 🤝 8. Contribuição

*(mantido igual)*

---

# 📄 9. Licença

MIT Licens
