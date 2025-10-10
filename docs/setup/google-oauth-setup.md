# Google OAuth Setup Instructions

This guide will help you set up Google OAuth authentication for your CampusNex application.

## Prerequisites

1. A Google account
2. Access to Google Cloud Console
3. Your application running locally

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top
3. Click "New Project"
4. Enter "CampusNex" as project name
5. Click "Create"

## Step 2: Enable Google+ API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google+ API" 
3. Click on it and press "Enable"
4. Also enable "Google Identity" API

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" (unless you have a Google Workspace account)
3. Fill in the required information:
   - Application name: CampusNex
   - User support email: your email
   - Developer contact information: your email
4. Click "Save and Continue"
5. Skip "Scopes" for now (click "Save and Continue")
6. Add test users if needed (add your email)

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Set the name to "CampusNex Web Client"
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (for development)
   - Add your production URL when deploying
6. Click "Create"
7. Copy the Client ID and Client Secret

## Step 5: Configure Environment Variables

Create a `.env` file in your server directory with:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
SESSION_SECRET=your_random_session_secret_here
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:3000
```

## Step 6: Test the Integration

1. Start your backend server: `npm run dev`
2. Start your frontend: `npm start`
3. Go to http://localhost:3000/login
4. Click the "Continue with Google" button
5. You should be redirected to Google's login page

## Troubleshooting

### Common Issues:

1. **"OAuth2Strategy requires a clientID option"**
   - Make sure your `.env` file has `GOOGLE_CLIENT_ID` set
   - Restart your server after adding environment variables

2. **"redirect_uri_mismatch"**
   - Check that your redirect URI in Google Console matches exactly: `http://localhost:5000/api/auth/google/callback`

3. **"This app isn't verified"**
   - This is normal for development. Click "Advanced" → "Go to CampusNex (unsafe)"
   - For production, you'll need to verify your app with Google

### Testing Checklist:

- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 credentials created
- [ ] Environment variables set in `.env`
- [ ] Server restarts without errors
- [ ] Google login button redirects to Google
- [ ] After Google login, redirects back to your app
- [ ] User is logged in successfully

## Production Deployment

When deploying to production:

1. Update redirect URIs in Google Console to include your production URLs
2. Set `FRONTEND_URL` to your production frontend URL
3. Consider verifying your app with Google to remove security warnings
4. Use environment variables for all sensitive credentials

## Security Notes

- Never commit your `.env` file to version control
- Use strong, random values for `SESSION_SECRET` and `JWT_SECRET`
- In production, ensure HTTPS is enabled
- Regularly rotate your secrets