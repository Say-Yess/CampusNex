@echo off
REM CampusNex Frontend Build and Deploy Script

echo 🚀 Starting CampusNex Frontend Deployment...

REM Check if we're in the campusnex directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the campusnex directory
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build the React app
echo 🏗️ Building React application...
npm run build

REM Check if build was successful
if exist "build" (
    echo ✅ Build successful! Ready for deployment.
    echo 📁 Build folder location: %CD%\build
    echo.
    echo 🎯 Next steps:
    echo    Firebase: firebase deploy
    echo    Netlify: Drag the 'build' folder to netlify.com
    echo    Vercel: vercel --prod
) else (
    echo ❌ Build failed! Please check the errors above.
    exit /b 1
)

pause