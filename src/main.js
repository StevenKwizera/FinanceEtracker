import './style.css'
import { renderAuth } from './auth.js'
import { renderApp } from './app.js'

// Check if user is logged in
const currentUser = localStorage.getItem('currentUser');

if (currentUser) {
    renderApp(document.querySelector('#app'));
} else {
    document.querySelector('#app').innerHTML = `
        <div id="auth-root"></div>
    `;
    renderAuth(document.querySelector('#auth-root'));
}
