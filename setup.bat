@echo off
echo.
echo ========================================
echo Code Humanizer - Setup Script
echo ========================================
echo.

echo [1/3] Installing backend dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo Error installing Python dependencies
    exit /b 1
)

echo.
echo [2/3] Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo Error installing Node dependencies
    exit /b 1
)

echo.
echo [3/3] Setup complete!
echo.
echo ========================================
echo To start the application:
echo ========================================
echo.
echo Terminal 1 - Backend (Flask):
echo   python app.py
echo.
echo Terminal 2 - Frontend (Next.js):
echo   npm run dev
echo.
echo Then open: http://localihost:3000
echo.
pause
