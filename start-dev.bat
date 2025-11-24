@echo off
echo Iniciando ambiente de desenvolvimento...
echo.

echo 1. Verificando se o backend está rodando...
curl -s http://localhost:8080/actuator/health > nul
if %errorlevel% == 0 (
    echo ✓ Backend está rodando na porta 8080
) else (
    echo ✗ Backend não está rodando. Inicie o backend primeiro:
    echo   cd "c:\Users\Giovanna\IdeaProjects\Sofia\sofia"
    echo   ./mvnw spring-boot:run
    echo.
    echo Nota: O backend agora usa H2 Database (sem necessidade de PostgreSQL)
    pause
    exit /b 1
)

echo.
echo 2. Iniciando frontend...
npm run dev

pause