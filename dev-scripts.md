# Scripts de Desenvolvimento

## Como executar o projeto completo

### 1. Backend (Java Spring Boot)

```bash
# Navegar para o diretório do backend
cd "c:\Users\Giovanna\IdeaProjects\Sofia\sofia"

# Executar o backend (porta 8080)
./mvnw spring-boot:run
```

### 2. Frontend (React + Vite)

```bash
# Navegar para o diretório do frontend
cd "c:\Users\Giovanna\OneDrive\Área de Trabalho\city-pulse-dashboard"

# Instalar dependências (se necessário)
npm install

# Executar o frontend (porta 5173)
npm run dev
```

### 3. Banco de dados PostgreSQL

Certifique-se de que o PostgreSQL está rodando na porta 5432 com:
- Database: `sofia_db`
- Username: definido em `DB_USERNAME`
- Password: definido em `DB_PASSWORD`

### 4. Variáveis de ambiente

Crie um arquivo `.env.local` no diretório do backend com:
```
DB_USERNAME=seu_usuario_db
DB_PASSWORD=sua_senha_db
```

## URLs de acesso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health

## Endpoints principais da API

- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de usuário
- `GET /context` - Dados do dashboard
- `GET /context/{id}` - Contexto específico
- `POST /user-interaction` - Criar demanda
- `GET /user-interaction` - Listar demandas
- `POST /opinion` - Criar avaliação
- `GET /opinion` - Listar avaliações

## Teste de conectividade

1. Inicie o backend
2. Acesse http://localhost:8080/actuator/health
3. Deve retornar status 200 com informações de saúde
4. Inicie o frontend
5. Faça login na interface