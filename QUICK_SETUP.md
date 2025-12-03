# Quick Google Sign-In Setup (5 Minutes)

## Step 1: Go to Google Cloud Console
👉 [Click here to open Google Cloud Console](https://console.cloud.google.com/)

## Step 2: Create a Project
1. Click the project dropdown at the top
2. Click **"New Project"**
3. Name it: `Finance Tracker` (or any name)
4. Click **"Create"**
5. Wait a few seconds, then select your new project

## Step 3: Configure OAuth Consent Screen
1. In the left menu, click **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** → Click **"Create"**
3. Fill in:
   - **App name**: `Personal Finance Tracker`
   - **User support email**: (your email)
   - **Developer contact**: (your email)
4. Click **"Save and Continue"** (3 times to skip scopes and test users)
5. Click **"Back to Dashboard"**

## Step 4: Create OAuth Client ID
1. Click **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. If prompted, configure consent screen (just click through)
4. Choose **"Web application"**
5. Name: `Finance Tracker Web`
6. Under **"Authorized JavaScript origins"**, click **"+ ADD URI"**:
   - Add: `http://localhost:5173`
   - Add: `http://localhost:3000` (if you use different port)
7. Click **"Create"**
8. **COPY THE CLIENT ID** (looks like: `123456789-abc.apps.googleusercontent.com`)

## Step 5: Add to Your App
1. Open `src/config.js` in your project
2. Find this line:
   ```javascript
   export const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';
   ```
3. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your copied Client ID:
   ```javascript
   export const GOOGLE_CLIENT_ID = '123456789-abc.apps.googleusercontent.com';
   ```
4. Save the file

## Step 6: Test It!
1. Restart your dev server (if running):
   ```bash
   npm run dev
   ```
2. Go to Sign In page
3. Click the Google button
4. Sign in with your Google account! 🎉

---

## ⚠️ Troubleshooting

**"redirect_uri_mismatch" error?**
- Make sure `http://localhost:5173` is in Authorized JavaScript origins
- Check the port matches your dev server

**Button still shows setup message?**
- Make sure you saved `src/config.js`
- Check that Client ID doesn't have quotes around it in the code
- Restart dev server

**Need more help?**
- See detailed guide: `GOOGLE_SIGNIN_SETUP.md`
- Check browser console (F12) for errors

