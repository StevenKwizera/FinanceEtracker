# Google Sign-In Setup Guide

This guide will help you set up Google Sign-In for your Personal Finance Tracker application.

## 📋 Prerequisites

- A Google account
- Access to Google Cloud Console

## 🚀 Step-by-Step Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click **"New Project"**
4. Enter a project name (e.g., "Finance Tracker")
5. Click **"Create"**

### Step 2: Configure OAuth Consent Screen

1. In the left sidebar, go to **"APIs & Services"** > **"OAuth consent screen"**
2. Select **"External"** (unless you have a Google Workspace)
3. Click **"Create"**
4. Fill in the required information:
   - **App name**: Personal Finance Tracker
   - **User support email**: Your email
   - **Developer contact information**: Your email
5. Click **"Save and Continue"**
6. On the "Scopes" page, click **"Save and Continue"** (default scopes are fine)
7. On the "Test users" page, you can add test users or skip for now
8. Click **"Save and Continue"**
9. Review and click **"Back to Dashboard"**

### Step 3: Create OAuth 2.0 Client ID

1. In the left sidebar, go to **"APIs & Services"** > **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**
4. Choose **"Web application"** as the application type
5. Give it a name (e.g., "Finance Tracker Web Client")
6. Under **"Authorized JavaScript origins"**, click **"+ ADD URI"** and add:
   - `http://localhost:5173` (for development)
   - `http://localhost:3000` (if you use a different port)
   - Your production domain (when deploying)
7. Under **"Authorized redirect URIs"**, you can leave this empty for now (Google Identity Services handles this automatically)
8. Click **"Create"**
9. **Copy the Client ID** (you'll need this in the next step)

### Step 4: Configure Your Application

1. Open `src/config.js` in your project
2. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID:

```javascript
export const GOOGLE_CLIENT_ID = '123456789-abcdefghijklmnop.apps.googleusercontent.com';
```

3. Save the file

### Step 5: Test Google Sign-In

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and go to `http://localhost:5173`
3. Click on the **"Sign In"** tab
4. You should see a Google Sign-In button
5. Click it and test the sign-in flow

## ✅ Verification

If everything is set up correctly:
- The Google Sign-In button will appear on the Sign In page
- Clicking it will open Google's sign-in popup
- After signing in, you'll be redirected to the dashboard
- Your Google account info will be saved in localStorage

## 🐛 Troubleshooting

### Button doesn't appear
- Check browser console for errors
- Verify the Google script is loading (check Network tab)
- Ensure `src/config.js` has a valid Client ID

### "Error 400: redirect_uri_mismatch"
- Make sure `http://localhost:5173` is added to Authorized JavaScript origins
- Check that the port matches your dev server port

### "Error 403: access_denied"
- Your OAuth consent screen might need to be published
- For testing, add your email as a test user in OAuth consent screen

### Button shows setup message
- This means `GOOGLE_CLIENT_ID` is still set to the placeholder
- Update `src/config.js` with your actual Client ID

## 🔒 Security Notes

- **Never commit your Client ID to public repositories** (it's okay for client-side, but be cautious)
- For production, add your production domain to Authorized JavaScript origins
- Consider using environment variables for production deployments

## 📚 Additional Resources

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 Setup Guide](https://developers.google.com/identity/protocols/oauth2)

## 🎉 You're Done!

Once configured, users can sign in with their Google accounts seamlessly!

