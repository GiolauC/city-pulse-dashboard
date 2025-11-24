# Setup do Projeto City Pulse Dashboard

## Estrutura do Projeto

```
city-pulse-dashboard/          # Frontend React + Vite
├── src/
│   ├── services/api.ts       # Conecta com backend Java
│   ├── components/           # Componentes React
│   └── pages/               # Páginas da aplicação
└── ...

Sofia/sofia/                  # Backend Java Spring Boot
├── src/main/java/
│   └── com/example/sofia/
│       ├── controller/      # Controllers REST
│       ├── service/         # Lógica de negócio
│       └── models/          # Entidades JPA
└── ...
```

## Configuração Inicial

### 1. Backend (Java Spring Boot)

1. **Banco de dados PostgreSQL**:
   ```sql
   CREATE DATABASE sofia_db;
   ```

2. **Variáveis de ambiente** (criar `.env.local` no diretório do backend):
   ```
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   ```

3. **Iniciar backend**:
   ```bash
   cd "c:\Users\Giovanna\IdeaProjects\Sofia\sofia"
   ./mvnw spring-boot:run
   ```

### 2. Frontend (React + Vite)

1. **Instalar dependências**:
   ```bash
   cd "c:\Users\Giovanna\OneDrive\Área de Trabalho\city-pulse-dashboard"
   npm install
   ```

2. **Iniciar frontend**:
   ```bash
   npm run dev
   ```

## Funcionalidades Implementadas

### ✅ Conectividade Frontend-Backend
- API service configurado para Spring Boot (porta 8080)
- Autenticação integrada com endpoints `/auth/login` e `/auth/register`
- Health check automático do backend
- Status de conexão visível na sidebar

### ✅ Endpoints Principais
- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de usuário  
- `GET /context` - Dados do dashboard
- `POST /user-interaction` - Criar demandas
- `POST /opinion` - Criar avaliações

### ✅ Interface de Usuário
- Dashboard responsivo com sidebar
- Páginas para Dashboard, Demandas e Avaliações
- Componente de status do backend
- Autenticação com proteção de rotas

## Scripts Úteis

- `npm run dev` - Inicia frontend
- `npm run check:backend` - Verifica se backend está rodando
- `start-dev.bat` - Script Windows para iniciar ambiente completo
- `start-backend.bat` - Script Windows para iniciar apenas backend

## Teste da Conectividade

1. **Verificar backend**: http://localhost:8080/actuator/health
2. **Verificar frontend**: http://localhost:5173
3. **Status na interface**: Visível na sidebar (indicador verde/vermelho)

## Próximos Passos

1. Implementar autenticação real no backend
2. Conectar com banco de dados PostgreSQL
3. Implementar CRUD completo para demandas e avaliações
4. Adicionar validações e tratamento de erros
5. Implementar upload de imagens para relatórios fotográficos