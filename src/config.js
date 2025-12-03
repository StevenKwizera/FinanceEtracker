// ============================================
// GOOGLE SIGN-IN CONFIGURATION
// ============================================
// 
// QUICK SETUP (5 minutes):
// 1. Go to: https://console.cloud.google.com/
// 2. Create a project → OAuth consent screen → Credentials
// 3. Create OAuth 2.0 Client ID (Web application)
// 4. Add authorized origin: http://localhost:5173
// 5. Copy the Client ID and paste it below
//
// DETAILED GUIDE: See QUICK_SETUP.md or GOOGLE_SIGNIN_SETUP.md
//
// Example format: '123456789-abcdefghijklmnop.apps.googleusercontent.com'
// ============================================

export const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

// Don't modify this line - it checks if Client ID is configured
export const isGoogleConfigured = GOOGLE_CLIENT_ID !== '319131567186-oa4ri2m91o14t33o42pt8hj9a56jn6p4.apps.googleusercontent.com';

