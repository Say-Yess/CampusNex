# CampusNex Hosting Guide

## Firebase Hosting (Recommended - Easy & Free)

### 1. Frontend Hosting:
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting in your project
cd campusnex
firebase init hosting

# Build your React app
npm run build

# Deploy to Firebase
firebase deploy
```

### 2. Your live URL will be:
https://campusnex-37b2b.web.app

### 3. Custom Domain (Optional):
- Go to Firebase Console > Hosting
- Add custom domain (e.g., campusnex.com)

---

## Alternative Hosting Options

### 1. Netlify (Frontend Only - Great for React):
```bash
# Build your app
npm run build

# Drag & drop 'build' folder to netlify.com
# Or connect your GitHub repo for auto-deployment
```

### 3. Traditional Hosting (Frontend + Backend):

#### VPS Hosting (DigitalOcean, Linode, AWS EC2):
```bash
# Server setup (Ubuntu):
sudo apt update
sudo apt install nginx nodejs npm mysql-server

# Setup PM2 for Node.js process management
npm install -g pm2

# Configure Nginx reverse proxy
sudo nano /etc/nginx/sites-available/campusnex

# SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

#### Shared Hosting (cPanel):
- Upload built React files to public_html
- Use subdomain for API (api.yourdomain.com)

---

## Cost Comparison

### Firebase (Google):
- ✅ FREE tier: 1GB storage, 10GB transfer/month
- ✅ Automatic scaling
- ✅ Built-in CDN
- 💰 Pay-as-you-scale

### Netlify:
- ✅ FREE tier: 100GB bandwidth/month
- ✅ Easy GitHub integration
- ❌ Frontend only

### VPS (DigitalOcean):
- 💰 $5-20/month
- ✅ Full control
- ❌ Need to manage server

### Recommended for You:
**Start with Firebase** - It's free, scalable, and you're already set up!