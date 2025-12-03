# How to Find Your OAuth 2.0 Client ID

You're in the right place! I can see you have an OAuth 2 Client ID: `102274315392066632454`

## Step 1: Get the Full Client ID String

The number you see (`102274315392066632454`) is just part of it. You need the full string.

1. In Google Cloud Console, go to: **APIs & Services** → **Credentials**
2. Look for **"OAuth 2.0 Client IDs"** section (not Service Accounts)
3. Click on your OAuth client (or create one if you don't see it)
4. You'll see the full Client ID that looks like:
   ```
   102274315392066632454-abcdefghijklmnop.apps.googleusercontent.com
   ```
5. **Copy this entire string**

## Step 2: Create OAuth Client ID (If You Don't Have One)

If you only see the service account and need to create an OAuth Client ID:

1. In **APIs & Services** → **Credentials**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**
4. If prompted about OAuth consent screen:
   - Select **"External"**
   - Fill in app name: `Personal Finance Tracker`
   - Add your email
   - Click through the steps
5. Choose **"Web application"**
6. Name it: `Finance Tracker Web`
7. Under **"Authorized JavaScript origins"**, click **"+ ADD URI"**:
   - Add: `http://localhost:5173`
8. Click **"Create"**
9. **Copy the Client ID** (the full string)

## Step 3: Add to Your Config

Open `src/config.js` and replace:

```javascript
export const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';
```

With:

```javascript
export const GOOGLE_CLIENT_ID = '102274315392066632454-xxxxx.apps.googleusercontent.com';
```

(Use your actual full Client ID string)

## Important Notes

- ✅ **OAuth 2.0 Client ID** = What you need (for user sign-in)
- ❌ **Service Account** = Not what you need (for server-to-server)

The Client ID should end with `.apps.googleusercontent.com`

