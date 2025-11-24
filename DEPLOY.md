# 🚀 Guia de Deploy - City Pulse Dashboard

Este guia contém instruções completas para fazer o deploy do sistema City Pulse Dashboard (Frontend + Backend Sofia).

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Java 17+ instalado
- Git configurado
- Conta nas plataformas de deploy escolhidas

## 🏗️ Arquitetura do Sistema

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   Frontend      │ ──────────────► │   Backend       │
│   (React/Vite)  │                 │   (Spring Boot) │
│   Port: 5173    │                 │   Port: 8080    │
└─────────────────┘                 └─────────────────┘
                                            │
                                            ▼
                                    ┌─────────────────┐
                                    │   Database      │
                                    │   (H2/PostgreSQL)│
                                    └─────────────────┘
```

## 🚀 Deploy Rápido

### Opção 1: Script Automático
```bash
# Execute o script de deploy completo
deploy-full-stack.bat
```

### Opção 2: Deploy Manual

#### Backend (Spring Boot)
```bash
cd c:\Users\Giovanna\IdeaProjects\Sofia\sofia
mvnw.cmd clean package -DskipTests
```

#### Frontend (React/Vite)
```bash
cd "C:\Users\Giovanna\OneDrive\Área de Trabalho\city-pulse-dashboard"
npm install
npm run build
```

## 🌐 Plataformas de Deploy Recomendadas

### Backend (Spring Boot)

#### 1. Railway (Recomendado)
- ✅ Gratuito até 500h/mês
- ✅ PostgreSQL incluído
- ✅ Deploy automático via Git

**Passos:**
1. Acesse [railway.app](https://railway.app)
2. Conecte seu repositório GitHub
3. Configure as variáveis:
   ```
   SPRING_PROFILES_ACTIVE=prod
   PORT=8080
   ```
4. Deploy automático!

#### 2. Render
- ✅ Gratuito com limitações
- ✅ Fácil configuração

**Passos:**
1. Acesse [render.com](https://render.com)
2. Crie um novo Web Service
3. Configure:
   - Build Command: `./mvnw clean package -DskipTests`
   - Start Command: `java -jar target/sofia-0.0.1-SNAPSHOT.jar`
   - Environment: `SPRING_PROFILES_ACTIVE=prod`

#### 3. Heroku
- 💰 Pago, mas confiável
- ✅ Muitos add-ons disponíveis

### Frontend (React/Vite)

#### 1. Vercel (Recomendado)
- ✅ Gratuito
- ✅ CDN global
- ✅ Deploy automático

**Passos:**
1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório
3. Configure a variável: `VITE_API_URL=https://seu-backend.railway.app`
4. Deploy automático!

#### 2. Netlify
- ✅ Gratuito
- ✅ CI/CD integrado

**Passos:**
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta `dist` ou conecte o Git
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🔧 Configuração de Variáveis

### Backend (application-prod.properties)
```properties
# Banco de dados (Railway PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:port/db
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_DRIVER=org.postgresql.Driver
DB_DIALECT=org.hibernate.dialect.PostgreSQLDialect

# Configurações de produção
SPRING_PROFILES_ACTIVE=prod
PORT=8080
FLYWAY_ENABLED=true
H2_CONSOLE_ENABLED=false
```

### Frontend (.env.production)
```env
VITE_API_URL=https://seu-backend.railway.app
VITE_APP_NAME=City Pulse Dashboard
VITE_ENVIRONMENT=production
```

## 🧪 Teste Local

### Iniciar ambos os serviços:
```bash
# Terminal 1 - Backend
cd c:\Users\Giovanna\IdeaProjects\Sofia\sofia
mvnw.cmd spring-boot:run

# Terminal 2 - Frontend
cd "C:\Users\Giovanna\OneDrive\Área de Trabalho\city-pulse-dashboard"
npm run dev
```

### URLs de teste:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- API Health: http://localhost:8080/actuator/health
- H2 Console: http://localhost:8080/h2-console

## 📊 Monitoramento

### Endpoints de Health Check
- Backend: `GET /actuator/health`
- Métricas: `GET /metrics/dashboard`

### Logs importantes
```bash
# Backend logs
tail -f logs/spring.log

# Frontend build logs
npm run build --verbose
```

## 🔒 Segurança

### Variáveis sensíveis (não commitar):
- `DB_PASSWORD`
- `JWT_SECRET`
- `API_KEYS`

### CORS configurado para:
- Desenvolvimento: `http://localhost:5173`
- Produção: Configurar com domínio real

## 🐛 Troubleshooting

### Problemas comuns:

#### Backend não inicia
```bash
# Verificar Java
java -version

# Verificar porta
netstat -an | findstr :8080

# Logs detalhados
mvnw.cmd spring-boot:run --debug
```

#### Frontend não conecta com Backend
1. Verificar `VITE_API_URL` no `.env.production`
2. Verificar CORS no backend
3. Verificar se backend está rodando

#### Build falha
```bash
# Limpar cache
npm cache clean --force
mvnw.cmd clean

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

## 📈 Próximos Passos

1. **Configurar CI/CD**: GitHub Actions para deploy automático
2. **Monitoramento**: Adicionar Sentry ou similar
3. **Banco de dados**: Migrar para PostgreSQL em produção
4. **CDN**: Configurar para assets estáticos
5. **SSL**: Certificados HTTPS automáticos

## 🆘 Suporte

Em caso de problemas:
1. Verificar logs de ambos os serviços
2. Testar endpoints individualmente
3. Verificar configurações de rede/firewall
4. Consultar documentação das plataformas de deploy

---

**Última atualização:** $(Get-Date -Format "dd/MM/yyyy HH:mm")