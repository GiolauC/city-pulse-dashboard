@echo off
echo ========================================
echo    CITY PULSE - DEPLOY FULL STACK
echo ========================================
echo.

set BACKEND_PATH=c:\Users\Giovanna\IdeaProjects\Sofia\sofia
set FRONTEND_PATH=C:\Users\Giovanna\OneDrive\Área de Trabalho\city-pulse-dashboard

echo Caminhos configurados:
echo Backend:  %BACKEND_PATH%
echo Frontend: %FRONTEND_PATH%
echo.

echo [1] Deploy completo (Backend + Frontend)
echo [2] Deploy apenas Backend
echo [3] Deploy apenas Frontend
echo [4] Testar localmente (ambos)
echo [5] Verificar status dos serviços
echo.

set /p choice="Escolha uma opcao (1-5): "

if "%choice%"=="1" goto deploy_full
if "%choice%"=="2" goto deploy_backend
if "%choice%"=="3" goto deploy_frontend
if "%choice%"=="4" goto test_local
if "%choice%"=="5" goto check_status
goto end

:deploy_full
echo.
echo ========================================
echo         DEPLOY COMPLETO
echo ========================================
echo.

echo Passo 1: Compilando Backend...
cd /d "%BACKEND_PATH%"
call mvnw.cmd clean package -DskipTests
if %errorlevel% neq 0 (
    echo Erro no build do backend!
    pause
    exit /b 1
)

echo.
echo Passo 2: Compilando Frontend...
cd /d "%FRONTEND_PATH%"
call npm install
call npm run build
if %errorlevel% neq 0 (
    echo Erro no build do frontend!
    pause
    exit /b 1
)

echo.
echo ========================================
echo    BUILDS CONCLUIDOS COM SUCESSO!
echo ========================================
echo.
echo Próximos passos para deploy:
echo.
echo BACKEND (Railway/Render/Heroku):
echo 1. Faça upload do JAR: %BACKEND_PATH%\target\sofia-0.0.1-SNAPSHOT.jar
echo 2. Configure as variáveis de ambiente:
echo    - PORT=8080
echo    - SPRING_PROFILES_ACTIVE=prod
echo    - DATABASE_URL (se usar PostgreSQL)
echo.
echo FRONTEND (Vercel/Netlify):
echo 1. Faça upload da pasta: %FRONTEND_PATH%\dist
echo 2. Configure a variável VITE_API_URL com a URL do backend
echo.
goto end

:deploy_backend
echo.
echo ========================================
echo        DEPLOY BACKEND APENAS
echo ========================================
echo.
cd /d "%BACKEND_PATH%"
call deploy-backend.bat
goto end

:deploy_frontend
echo.
echo ========================================
echo       DEPLOY FRONTEND APENAS
echo ========================================
echo.
cd /d "%FRONTEND_PATH%"
call deploy-frontend.bat
goto end

:test_local
echo.
echo ========================================
echo         TESTE LOCAL
echo ========================================
echo.

echo Iniciando Backend...
cd /d "%BACKEND_PATH%"
start "Sofia Backend" cmd /k "mvnw.cmd spring-boot:run"

echo Aguardando backend inicializar...
timeout /t 10 /nobreak > nul

echo Iniciando Frontend...
cd /d "%FRONTEND_PATH%"
start "City Pulse Frontend" cmd /k "npm run dev"

echo.
echo Serviços iniciados:
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Pressione qualquer tecla para continuar...
pause > nul
goto end

:check_status
echo.
echo ========================================
echo      VERIFICANDO STATUS
echo ========================================
echo.

echo Testando Backend (localhost:8080)...
curl -s http://localhost:8080/actuator/health > nul
if %errorlevel% == 0 (
    echo ✓ Backend está rodando
) else (
    echo ✗ Backend não está rodando
)

echo.
echo Testando Frontend (localhost:5173)...
curl -s http://localhost:5173 > nul
if %errorlevel% == 0 (
    echo ✓ Frontend está rodando
) else (
    echo ✗ Frontend não está rodando
)

echo.
echo Verificando builds...
if exist "%BACKEND_PATH%\target\sofia-0.0.1-SNAPSHOT.jar" (
    echo ✓ JAR do backend existe
) else (
    echo ✗ JAR do backend não encontrado
)

if exist "%FRONTEND_PATH%\dist\index.html" (
    echo ✓ Build do frontend existe
) else (
    echo ✗ Build do frontend não encontrado
)

echo.
goto end

:end
echo.
echo ========================================
echo    PLATAFORMAS DE DEPLOY SUGERIDAS
echo ========================================
echo.
echo BACKEND:
echo • Railway (https://railway.app) - Fácil e gratuito
echo • Render (https://render.com) - Gratuito com limitações
echo • Heroku (https://heroku.com) - Pago, mas confiável
echo.
echo FRONTEND:
echo • Vercel (https://vercel.com) - Gratuito e rápido
echo • Netlify (https://netlify.com) - Gratuito com CI/CD
echo • GitHub Pages - Gratuito para repositórios públicos
echo.
echo BANCO DE DADOS (se necessário):
echo • Supabase (https://supabase.com) - PostgreSQL gratuito
echo • PlanetScale (https://planetscale.com) - MySQL gratuito
echo • Railway PostgreSQL - Incluído no plano gratuito
echo.
pause