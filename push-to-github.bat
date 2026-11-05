@echo off
title Push FloraVault to smartfloral
cd /d "%~dp0"
cls
echo ============================================================
echo   🌿 FloraVault - Push to smartfloral Repository
echo ============================================================
echo.
set GIT="C:\ProgramData\togar\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe"
%GIT% remote remove origin 2>nul
%GIT% remote add origin https://github.com/bharath270712/smartfloral.git
%GIT% branch -M main

echo Pushing all files to https://github.com/bharath270712/smartfloral.git...
echo.
%GIT% push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================================
    echo   SUCCESS! Pushed cleanly to https://github.com/bharath270712/smartfloral.git
    echo ============================================================
) else (
    echo.
    echo If GitHub asks you to sign in, use your browser login or GitHub Desktop.
    echo Opening GitHub Desktop...
    "C:\ProgramData\togar\GitHubDesktop\bin\github.bat" open "%~dp0"
)
pause
