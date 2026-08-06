// Google Sign-In is optional. Replace the placeholder only after configuring
// an OAuth client for the deployed domain.
export const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

export const isGoogleConfigured =
  GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE' &&
  GOOGLE_CLIENT_ID.endsWith('.apps.googleusercontent.com');
