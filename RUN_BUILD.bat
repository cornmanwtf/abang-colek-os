@echo off
REM ⚡ ABANG COLEK - ONE-CLICK BUILD
REM Double-click this file to run rapid build

echo.
echo =====================================
echo    ABANG COLEK RAPID BUILD
echo =====================================
echo.

cd /d H:\ANTIGRAVITY\ABANG-COLEK\abang-colek-brand-os

echo Running PowerShell script...
powershell -ExecutionPolicy Bypass -File .\scripts\rapid-build.ps1

echo.
echo Press any key to exit...
pause > nul
