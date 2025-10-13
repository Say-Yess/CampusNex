# CampusNex Vercel Deployment Guide

## Overview
This guide will help you deploy CampusNex to Vercel instead of Firebase. The setup includes:
- **Frontend**: React application deployed as a static site
- **Backend**: Node.js API deployed as serverless functions

## Prerequisites
1. Vercel account (free at [vercel.com](https://vercel.com))
2. GitHub repository with your code
3. Database hosted externally (Railway, PlanetScale, Supabase, etc.)

## Deployment Steps

### Part 1: Deploy the Backend API

1. **Navigate to Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"

2. **Import Backend Repository**
   - Select your GitHub repository
   - Set **Root Directory** to: `server`
   - Click "Deploy"

3. **Configure Environment Variables** (in Vercel Dashboard > Settings > Environment Variables)
   ```
   NODE_ENV=production
   DATABASE_URL=your-database-connection-string
   JWT_SECRET=your-jwt-secret-key-here
   GOOGLE_CLIENT_ID=your-google-oauth-client-id
   GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
   SESSION_SECRET=your-session-secret-key-here
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

4. **Database Setup**
   - Your SQLite database won't work on Vercel (serverless)
   - Migrate to PostgreSQL using Railway, Supabase, or PlanetScale
   - Update `DATABASE_URL` environment variable

5. **Test Your API**
   - Your API will be available at: `https://your-project-name.vercel.app`
   - Test endpoints: `https://your-project-name.vercel.app/api/events`

### Part 2: Deploy the Frontend

1. **Create New Vercel Project**
   - Click "New Project" again
   - Select the same GitHub repository
   - Set **Root Directory** to: `campusnex`

2. **Configure Environment Variables**
   ```
   REACT_APP_API_BASE_URL=https://your-backend-project.vercel.app/api
   REACT_APP_FIREBASE_API_KEY=AIzaSyBG-rov_gOD4JCIZ0xyiPkZ-GSPRIbQvfk
   REACT_APP_FIREBASE_AUTH_DOMAIN=campusnex-37b2b.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=campusnex-37b2b
   REACT_APP_FIREBASE_STORAGE_BUCKET=campusnex-37b2b.firebasestorage.app
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=399142959452
   REACT_APP_FIREBASE_APP_ID=1:399142959452:web:dfcc9ecff25f7889866999
   REACT_APP_FIREBASE_MEASUREMENT_ID=G-0X1F4CHP7D
   ```

3. **Deploy Frontend**
   - Vercel will automatically detect it's a React app
   - Build and deployment will happen automatically

## Database Migration (Required for Backend)

Since Vercel doesn't support SQLite in serverless functions, you need to migrate:

### Option 1: Railway + PostgreSQL (Recommended)
1. Go to [railway.app](https://railway.app)
2. Create new project > Deploy PostgreSQL
3. Get connection string from Railway dashboard
4. Update your `DATABASE_URL` environment variable

### Option 2: Supabase (Free PostgreSQL)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy connection string
5. Update your `DATABASE_URL` environment variable

### Option 3: PlanetScale (MySQL)
1. Go to [planetscale.com](https://planetscale.com)
2. Create new database
3. Get connection string
4. Update your database configuration for MySQL

## Configuration Files Created

### Frontend (`campusnex/vercel.json`)
- Handles React SPA routing
- Sets up caching headers
- Configures static file serving

### Backend (`server/vercel.json`)
- Configures serverless function
- Sets up API routing
- Defines environment variables

## Environment Files
- `.env.vercel.template` - Template for all environment variables
- `campusnex/.env.vercel` - Frontend production environment

## Post-Deployment Checklist

### ✅ Backend Verification
- [ ] API responds at `/api/events`
- [ ] Database connection works
- [ ] Authentication endpoints work
- [ ] CORS is properly configured

### ✅ Frontend Verification  
- [ ] Site loads without errors
- [ ] API calls work from frontend
- [ ] Routing works (try refreshing on `/discovery`)
- [ ] Authentication flow works

### ✅ Integration Testing
- [ ] Login/logout functionality
- [ ] Event discovery and RSVP
- [ ] User profile updates
- [ ] Event randomization works

## Troubleshooting

### Common Issues

**1. "Cannot read package.json" Error**
- Make sure Root Directory is set correctly
- Frontend: `campusnex`
- Backend: `server`

**2. API Calls Failing**
- Check `REACT_APP_API_BASE_URL` points to your backend Vercel URL
- Verify CORS_ORIGIN in backend includes your frontend URL

**3. Database Connection Errors**
- SQLite doesn't work on Vercel - must use external database
- Verify DATABASE_URL is correct
- Check database is accessible from Vercel's servers

**4. Build Failures**
- Check build logs in Vercel dashboard
- Ensure all dependencies are listed in package.json
- Verify Node.js version compatibility

## Vercel CLI (Optional)

Install for local testing:
```bash
npm i -g vercel

# In your project directory
vercel login
vercel dev  # Test locally
vercel --prod  # Deploy to production
```

## Domain Configuration

### Custom Domain
1. Go to Vercel Dashboard > Your Project > Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update CORS_ORIGIN environment variable

### Subdomains
- Frontend: `your-domain.com`
- Backend: `api.your-domain.com`

## Cost Comparison

### Vercel vs Firebase
- **Vercel**: Free tier includes 100GB bandwidth, unlimited personal projects
- **Firebase**: Free tier includes 10GB storage, 1GB/day bandwidth
- **Database**: External hosting required (Railway ~$5/month, Supabase free tier)

## Next Steps

1. **Deploy Backend First** - Get your API URL
2. **Update Frontend Config** - Point to your API
3. **Deploy Frontend** - Get your site URL  
4. **Update CORS** - Add frontend URL to backend CORS
5. **Test Everything** - Verify full functionality

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Test API endpoints directly
3. Verify environment variables
4. Check database connectivity

The deployment should work seamlessly with your existing randomization features and user authentication system!