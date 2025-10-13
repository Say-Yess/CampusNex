@echo off
echo ========================================
echo CampusNex Vercel Deployment Helper
echo ========================================
echo.

echo This script will help you prepare for Vercel deployment
echo.

echo Step 1: Install Vercel CLI (if not already installed)
echo Run: npm install -g vercel
echo.

echo Step 2: Login to Vercel
echo Run: vercel login
echo.

echo Step 3: Deploy Backend API
echo Navigate to server folder and run: vercel --prod
echo.

echo Step 4: Deploy Frontend
echo Navigate to campusnex folder and run: vercel --prod
echo.

echo Step 5: Configure Environment Variables
echo Go to Vercel Dashboard and add environment variables
echo Use .env.vercel.template as reference
echo.

echo Step 6: Update API URLs
echo Update REACT_APP_API_BASE_URL in frontend environment
echo Update CORS_ORIGIN in backend environment
echo.

echo ========================================
echo Files created for Vercel deployment:
echo ========================================
echo - server/vercel.json (Backend configuration)
echo - campusnex/vercel.json (Frontend configuration)
echo - .env.vercel.template (Environment variables template)
echo - campusnex/.env.vercel (Frontend production environment)
echo - docs/deployment/vercel-deployment-guide.md (Complete guide)
echo.

echo Next: Follow the detailed guide in docs/deployment/vercel-deployment-guide.md
echo.

pause