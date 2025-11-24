@echo off
echo ========================================
echo    CITY PULSE DASHBOARD - DEPLOY
echo ========================================
echo.

echo 1. Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependencias!
    pause
    exit /b 1
)

echo.
echo 2. Executando build de producao...
call npm run build
if %errorlevel% neq 0 (
    echo Erro no build!
    pause
    exit /b 1
)

echo.
echo 3. Build concluido com sucesso!
echo Arquivos gerados na pasta 'dist'
echo.

echo Opcoes de deploy:
echo [1] Servir localmente (preview)
echo [2] Deploy no Vercel
echo [3] Deploy no Netlify
echo [4] Apenas build (concluido)
echo.

set /p choice="Escolha uma opcao (1-4): "

if "%choice%"=="1" (
    echo.
    echo Iniciando servidor local...
    call npm run preview
) else if "%choice%"=="2" (
    echo.
    echo Para deploy no Vercel:
    echo 1. Instale o Vercel CLI: npm i -g vercel
    echo 2. Execute: vercel --prod
    echo 3. Siga as instrucoes
) else if "%choice%"=="3" (
    echo.
    echo Para deploy no Netlify:
    echo 1. Acesse https://app.netlify.com/
    echo 2. Arraste a pasta 'dist' para o deploy
    echo 3. Configure o dominio personalizado
) else (
    echo.
    echo Build concluido! Arquivos prontos para deploy na pasta 'dist'
)

echo.
pause