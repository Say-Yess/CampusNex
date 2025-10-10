# 🚀 Railway + Firebase/Netlify Deployment Guide

## Step 1: Deploy Backend to Railway

### A. Create Railway Account & Project
1. Go to **https://railway.app/**
2. Sign up with GitHub account
3. Click **"Deploy from GitHub repo"**
4. Select your **CampusNex** repository
5. **CRITICAL**: Choose **"Deploy from a folder"** → Type exactly: `server`
   - ⚠️ **Important**: Type `server` (not `./server` or `/server`)
   - This tells Railway to look in the server folder where your Node.js app is

### B. Add PostgreSQL Database
1. In Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will automatically create database and provide connection URL

### C. Configure Environment Variables
In Railway project → **Variables** tab, add:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
CORS_ORIGIN=https://your-frontend-domain.netlify.app
BCRYPT_ROUNDS=12
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

### D. Database Connection
Railway automatically provides `DATABASE_URL` - no need to set it manually!

### E. Deploy
- Railway will automatically deploy when you push to GitHub
- Your backend URL will be: `https://your-project-name.up.railway.app`

---

## Step 2A: Deploy Frontend to Firebase Hosting

### Prerequisites
```powershell
# Install Firebase CLI
npm install -g firebase-tools
```

### Deploy Steps
```powershell
# Navigate to frontend
cd "d:\For study\major2\Major Project2_ KNEA\WEB_Campus\campusnex"

# Login to Firebase
firebase login

# Initialize hosting (if not done)
firebase init hosting
# Select: Use existing project
# Select: campusnex-37b2b (or your Firebase project)
# Public directory: build
# Single-page app: Yes
# Overwrite index.html: No

# Build and deploy
npm run build
firebase deploy
```

### Your frontend will be live at:
`https://campusnex-37b2b.web.app` or `https://campusnex-37b2b.firebaseapp.com`

---

## Step 2B: Alternative - Deploy Frontend to Netlify

### Option 1: Drag & Drop (Easiest)
1. Go to **https://netlify.com/**
2. Drag your `campusnex/build` folder to the deploy area
3. Done! You'll get a URL like `https://amazing-name-123456.netlify.app`

### Option 2: GitHub Integration
1. In Netlify, click **"Add new site"** → **"Import from Git"**
2. Select your GitHub repository
3. Configure:
   - **Base directory**: `campusnex`
   - **Build command**: `npm run build`
   - **Publish directory**: `campusnex/build`
4. Deploy!

---

## Step 3: Connect Frontend to Backend

### Update Frontend API Configuration

1. **Create environment file** in `campusnex` folder:

```env
# campusnex/.env.production
REACT_APP_API_URL=https://your-railway-backend-url.up.railway.app/api
GENERATE_SOURCEMAP=false
```

2. **Update CORS in Railway**:
   - Go to Railway project → Variables
   - Update `CORS_ORIGIN` to your frontend URL:
     - Firebase: `https://campusnex-37b2b.web.app`
     - Netlify: `https://your-site-name.netlify.app`

3. **Rebuild and redeploy frontend**:
```powershell
# For Firebase
npm run build && firebase deploy

# For Netlify (if using GitHub integration, just push to GitHub)
npm run build
# Then drag new build folder to Netlify
```

---

## 🎯 Quick Deployment Commands

### Backend (Railway)
```bash
# Railway deploys automatically from GitHub
# Just push your changes:
git add .
git commit -m "Deploy to Railway"
git push origin main
```

### Frontend (Firebase)
```powershell
cd campusnex
npm run build
firebase deploy
```

### Frontend (Netlify)
```powershell
cd campusnex
npm run build
# Then drag build folder to netlify.com
```

---

## ✅ Final Checklist

- [ ] Railway backend deployed and running
- [ ] PostgreSQL database connected
- [ ] Environment variables configured
- [ ] Frontend deployed (Firebase or Netlify)
- [ ] API endpoints working
- [ ] CORS configured correctly
- [ ] Authentication system working
- [ ] File uploads working

---

## 🆘 Troubleshooting

### Railway Build Issues
**Error: "Script start.sh not found" or "Railpack could not determine how to build"**
- **Cause**: Railway is looking at wrong directory (root instead of server folder)
- **Fix**: Delete project and redeploy with "Deploy from folder" → `server`
- **Alternative**: In project Settings → Source → Set Root Directory to `server`

### CORS Issues
- Make sure `CORS_ORIGIN` in Railway exactly matches your frontend URL
- Include `https://` in the URL

### API Connection Issues
- Verify `REACT_APP_API_URL` points to your Railway backend
- Check Railway logs for errors

### Database Issues
- Railway provides DATABASE_URL automatically
- Check if migrations ran successfully

---

## 📱 Your Live URLs

**Backend API**: `https://your-project.up.railway.app/api`
**Frontend**: 
- Firebase: `https://campusnex-37b2b.web.app`
- Netlify: `https://your-site.netlify.app`

Ready to start? Let me know if you need help with any specific step!