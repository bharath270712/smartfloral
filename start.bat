@echo off
title FloraVault Botanical Portal
cd /d "%~dp0"
cls
echo ============================================================
echo   🌿 FloraVault - Privacy-First Botanical Portal
echo   Zero Trackers * Camera Enabled * Real-Time AI
echo ============================================================
echo.
echo Starting local web server on http://localhost:8080...
echo If you close this window, the local server will stop.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Opening index.html directly in your default browser...
    start "" "%~dp0index.html"
)
pause
