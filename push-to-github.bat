@echo off
title Push FloraVault to GitHub
cd /d "%~dp0"
cls
echo ============================================================
echo   🌿 FloraVault - Push to GitHub Repository
echo ============================================================
echo.
set /p REPO_URL="Enter your GitHub repository URL (e.g. https://github.com/bharath270712/FloraVault.git): "
if "%REPO_URL%"=="" (
    echo No URL entered. Opening GitHub Desktop instead...
    "C:\ProgramData\togar\GitHubDesktop\bin\github.bat" open "%~dp0"
    pause
    exit /b
)

set GIT="C:\ProgramData\togar\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe"
%GIT% remote remove origin 2>nul
%GIT% remote add origin %REPO_URL%
%GIT% branch -M main
echo.
echo Pushing to %REPO_URL%...
%GIT% push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================================
    echo   SUCCESS! Your entire FloraVault code has been pushed!
    echo ============================================================
) else (
    echo.
    echo Push encountered an error. Opening in GitHub Desktop to publish...
    "C:\ProgramData\togar\GitHubDesktop\bin\github.bat" open "%~dp0"
)
pause
