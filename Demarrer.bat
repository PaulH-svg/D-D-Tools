@echo off
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  start "" "http://127.0.0.1:5173"
  py -m http.server 5173 --bind 127.0.0.1
  pause
  exit /b
)
where python >nul 2>nul
if not errorlevel 1 (
  start "" "http://127.0.0.1:5173"
  python -m http.server 5173 --bind 127.0.0.1
  pause
  exit /b
)
echo Installez Python 3 depuis https://www.python.org/downloads/windows/
echo Puis relancez ce fichier.
pause
