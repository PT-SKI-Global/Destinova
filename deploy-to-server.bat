@echo off
REM Deploy Destinova ke Server
REM Script ini akan:
REM 1. Copy file ke server via SCP
REM 2. SSH ke server
REM 3. Jalankan docker-compose

setlocal enabledelayedexpansion

set SERVER_IP=10.240.183.128
set SERVER_USER=isprastika
set SERVER_PASSWORD=nitrogear21
set SERVER_PATH=~/destinova
set LOCAL_PATH=C:\Users\LENOVO\Downloads\DestinovaAIChat

echo.
echo ========================================
echo Destinova Docker Deployment Script
echo ========================================
echo.

REM Cek apakah puttygen/pscp tersedia
echo Checking for PuTTY tools...
where pscp >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PuTTY tools (pscp) tidak ditemukan!
    echo Silakan install PuTTY dari: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html
    pause
    exit /b 1
)

echo [1/3] Menyalin file ke server...
echo Menjalankan: pscp -pw %SERVER_PASSWORD% -r "%LOCAL_PATH%\*" %SERVER_USER%@%SERVER_IP%:%SERVER_PATH%/
pscp -pw %SERVER_PASSWORD% -r "%LOCAL_PATH%\Dockerfile" %SERVER_USER%@%SERVER_IP%:%SERVER_PATH%/
pscp -pw %SERVER_PASSWORD% -r "%LOCAL_PATH%\Dockerfile.app" %SERVER_USER%@%SERVER_IP%:%SERVER_PATH%/
pscp -pw %SERVER_PASSWORD% -r "%LOCAL_PATH%\docker-compose.yml" %SERVER_USER%@%SERVER_IP%:%SERVER_PATH%/
pscp -pw %SERVER_PASSWORD% -r "%LOCAL_PATH%\.dockerignore" %SERVER_USER%@%SERVER_IP%:%SERVER_PATH%/
pscp -pw %SERVER_PASSWORD% -r "%LOCAL_PATH%\scripts" %SERVER_USER%@%SERVER_IP%:%SERVER_PATH%/
echo ✓ File berhasil disalin!

echo.
echo [2/3] Menghubungkan ke server...
echo Server: %SERVER_IP%
echo User: %SERVER_USER%
echo.

REM Create plink script untuk menjalankan perintah
echo [3/3] Menjalankan Docker Compose...
echo.

echo Menjalankan perintah di server...
plink -pw %SERVER_PASSWORD% %SERVER_USER%@%SERVER_IP% "cd %SERVER_PATH% && docker-compose up -d"

echo.
echo ========================================
echo Deployment Selesai!
echo ========================================
echo.
echo Untuk melihat status:
echo   plink -pw %SERVER_PASSWORD% %SERVER_USER%@%SERVER_IP% "cd %SERVER_PATH% && docker-compose ps"
echo.
echo Untuk melihat logs:
echo   plink -pw %SERVER_PASSWORD% %SERVER_USER%@%SERVER_IP% "cd %SERVER_PATH% && docker-compose logs -f"
echo.
pause
