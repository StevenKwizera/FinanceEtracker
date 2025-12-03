import { renderApp } from './app.js';
import { GOOGLE_CLIENT_ID, isGoogleConfigured } from './config.js';

// Icons
const icons = {
    logo: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    google: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`
};

export function renderAuth(element) {
    let isLogin = true;

    const render = () => {
        element.innerHTML = `
      <div class="auth-container">
        <!-- Left Side -->
        <div class="auth-hero">
          <div class="logo-container">
            <div class="app-logo">
              ${icons.logo}
            </div>
          </div>
          <h1>Manage Your Money</h1>
          <p>Track expenses, visualize spending patterns, and take control of your finances with our intuitive personal finance tracker.</p>
          
          <ul class="feature-list">
            <li class="feature-item">
              <div class="feature-dot"></div>
              Real-time expense tracking
            </li>
            <li class="feature-item">
              <div class="feature-dot"></div>
              Smart analytics & insights
            </li>
            <li class="feature-item">
              <div class="feature-dot"></div>
              Export & backup your data
            </li>
          </ul>
        </div>

        <!-- Right Side -->
        <div class="auth-card">
          <div class="auth-tabs">
            <button class="tab-btn ${isLogin ? 'active' : ''}" id="tab-signin">Sign In</button>
            <button class="tab-btn ${!isLogin ? 'active' : ''}" id="tab-create">Create Account</button>
          </div>

          <form id="auth-form">
            ${!isLogin ? `
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <div class="input-wrapper">
                  <div class="input-icon">${icons.user}</div>
                  <input type="text" class="form-input" placeholder="John Doe" required name="fullname">
                </div>
              </div>
            ` : ''}

            <div class="form-group">
              <label class="form-label">Email</label>
              <div class="input-wrapper">
                <div class="input-icon">${icons.mail}</div>
                <input type="email" class="form-input" placeholder="you@example.com" required name="email">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Password</label>
              <div class="input-wrapper">
                <div class="input-icon">${icons.lock}</div>
                <input type="password" class="form-input" placeholder="${isLogin ? '••••••••' : ''}" required name="password" minlength="8">
              </div>
              ${!isLogin ? `<div class="form-hint">Password must be at least 8 characters long</div>` : ''}
            </div>

            <button type="submit" class="submit-btn">
              ${isLogin ? 'Sign In' : 'Create Account'}
            </button>

            ${isLogin ? `
              <div class="divider">Or continue with</div>
              <div id="google-signin-container"></div>
            ` : `
              <div class="terms-text">
                By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </div>
            `}
          </form>
        </div>
      </div>
    `;

        // Attach Event Listeners
        document.getElementById('tab-signin').addEventListener('click', () => {
            isLogin = true;
            render();
        });

        document.getElementById('tab-create').addEventListener('click', () => {
            isLogin = false;
            render();
        });

        document.getElementById('auth-form').addEventListener('submit', handleAuth);

        // Initialize Google Sign-In
        if (isLogin) {
            initializeGoogleSignIn();
        }

        // Terms of Service and Privacy Policy links
        const termsLinks = document.querySelectorAll('.terms-text a');
        termsLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (link.textContent.includes('Terms')) {
                    alert('Terms of Service: By using this application, you agree to use it responsibly and in accordance with applicable laws.');
                } else if (link.textContent.includes('Privacy')) {
                    alert('Privacy Policy: We respect your privacy. Your data is stored locally in your browser and will not be shared with third parties.');
                }
            });
        });
    };

    const initializeGoogleSignIn = () => {
        const container = document.getElementById('google-signin-container');
        if (!container) return;

        // Wait for Google Identity Services to load
        if (typeof google === 'undefined' || !google.accounts) {
            // If Google script hasn't loaded yet, wait for it
            const checkGoogle = setInterval(() => {
                if (typeof google !== 'undefined' && google.accounts) {
                    clearInterval(checkGoogle);
                    setupGoogleSignIn(container);
                }
            }, 100);

            // Timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkGoogle);
                if (typeof google === 'undefined' || !google.accounts) {
                    showGoogleSignInFallback(container);
                }
            }, 5000);
        } else {
            setupGoogleSignIn(container);
        }
    };

    const setupGoogleSignIn = (container) => {
        if (!isGoogleConfigured) {
            showGoogleSignInFallback(container);
            return;
        }

        try {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleSignIn,
                auto_select: false,
                cancel_on_tap_outside: true
            });

            // Render the button
            google.accounts.id.renderButton(
                container,
                {
                    type: 'standard',
                    theme: 'outline',
                    size: 'large',
                    text: 'signin_with',
                    width: '100%',
                    locale: 'en'
                }
            );
        } catch (error) {
            console.error('Google Sign-In initialization error:', error);
            showGoogleSignInFallback(container);
        }
    };

    const showGoogleSignInFallback = (container) => {
        container.innerHTML = `
            <button type="button" class="google-btn" id="google-signin-fallback">
                ${icons.google}
                Google
            </button>
            ${!isGoogleConfigured ? `
                <div style="margin-top: 0.5rem; padding: 0.75rem; background-color: #FEF3C7; border: 1px solid #FCD34D; border-radius: 6px; font-size: 0.75rem; color: #92400E;">
                    <strong>Setup Required:</strong> To enable Google Sign-In, configure your Google Client ID in <code>src/config.js</code>
                </div>
            ` : ''}
        `;

        const fallbackBtn = document.getElementById('google-signin-fallback');
        if (fallbackBtn) {
            fallbackBtn.addEventListener('click', () => {
                if (!isGoogleConfigured) {
                    alert('Google Sign-In Setup:\n\n1. Go to https://console.cloud.google.com/\n2. Create a project and enable Google+ API\n3. Create OAuth 2.0 Client ID\n4. Add your Client ID to src/config.js\n\nSee README.md for detailed instructions.');
                } else {
                    // Try to trigger Google Sign-In manually
                    try {
                        google.accounts.oauth2.initTokenClient({
                            client_id: GOOGLE_CLIENT_ID,
                            scope: 'email profile',
                            callback: (response) => {
                                if (response.access_token) {
                                    fetchGoogleUserInfo(response.access_token);
                                }
                            }
                        }).requestAccessToken();
                    } catch (error) {
                        alert('Google Sign-In error. Please try again.');
                    }
                }
            });
        }
    };

    const handleGoogleSignIn = (response) => {
        if (response.credential) {
            // Decode the JWT token
            try {
                const payload = JSON.parse(atob(response.credential.split('.')[1]));
                const userData = {
                    email: payload.email,
                    fullname: payload.name || payload.given_name || 'User',
                    picture: payload.picture,
                    googleId: payload.sub
                };

                // Save user to localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const existingUser = users.find(u => u.email === userData.email);
                
                if (!existingUser) {
                    // Create new user account
                    users.push({
                        email: userData.email,
                        fullname: userData.fullname,
                        password: null, // No password for Google users
                        googleId: userData.googleId,
                        authMethod: 'google'
                    });
                    localStorage.setItem('users', JSON.stringify(users));
                }

                // Set current user
                localStorage.setItem('currentUser', JSON.stringify({
                    email: userData.email,
                    fullname: userData.fullname,
                    picture: userData.picture,
                    authMethod: 'google'
                }));

                // Redirect to app
                renderApp(document.querySelector('#app'));
            } catch (error) {
                console.error('Error processing Google Sign-In:', error);
                alert('Error signing in with Google. Please try again.');
            }
        }
    };

    const fetchGoogleUserInfo = async (accessToken) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                
                // Save user to localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const existingUser = users.find(u => u.email === userData.email);
                
                if (!existingUser) {
                    users.push({
                        email: userData.email,
                        fullname: userData.name || userData.given_name || 'User',
                        password: null,
                        googleId: userData.id,
                        authMethod: 'google'
                    });
                    localStorage.setItem('users', JSON.stringify(users));
                }

                localStorage.setItem('currentUser', JSON.stringify({
                    email: userData.email,
                    fullname: userData.name || userData.given_name || 'User',
                    picture: userData.picture,
                    authMethod: 'google'
                }));

                renderApp(document.querySelector('#app'));
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            alert('Error signing in with Google. Please try again.');
        }
    };

    const handleAuth = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (isLogin) {
            // Login Logic
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === data.email && u.password === data.password);

            // Allow demo login or valid user
            if (user || (data.email === 'clever@gmail.com' && data.password.length >= 8)) {
                localStorage.setItem('currentUser', JSON.stringify({
                    email: data.email,
                    fullname: user?.fullname || 'clever',
                    authMethod: 'email'
                }));
                renderApp(document.querySelector('#app'));
            } else {
                alert('Invalid email or password');
            }
        } else {
            // Register Logic
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === data.email)) {
                alert('Email already exists');
                return;
            }

            users.push({
                ...data,
                authMethod: 'email'
            });
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify({
                email: data.email,
                fullname: data.fullname,
                authMethod: 'email'
            }));
            alert('Account created successfully!');
            renderApp(document.querySelector('#app'));
        }
    };

    render();
}
