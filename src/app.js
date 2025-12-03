import { renderDashboard } from './dashboard.js';
import { renderAnalytics } from './analytics.js';
import { renderTransactions } from './transactions.js';
import { renderSettings } from './settings.js';
import { renderAuth } from './auth.js';

// Icons
const icons = {
    dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    transactions: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
    analytics: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    logout: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`
};

export function renderApp(element) {
    let currentRoute = 'dashboard';
    let shouldOpenTransactionModal = false;

    const render = () => {
        element.innerHTML = `
      <div class="app-container">
        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="sidebar-logo">
            <div class="logo-main">Finance</div>
            <div class="logo-sub">Personal Tracker</div>
          </div>
          
          <ul class="nav-menu">
            <li class="nav-item ${currentRoute === 'dashboard' ? 'active' : ''}" data-route="dashboard">
              ${icons.dashboard}
              Dashboard
            </li>
            <li class="nav-item ${currentRoute === 'transactions' ? 'active' : ''}" data-route="transactions">
              ${icons.transactions}
              Transactions
            </li>
            <li class="nav-item ${currentRoute === 'analytics' ? 'active' : ''}" data-route="analytics">
              ${icons.analytics}
              Analytics
            </li>
            <li class="nav-item ${currentRoute === 'settings' ? 'active' : ''}" data-route="settings">
              ${icons.settings}
              Settings
            </li>
          </ul>

          <button class="sign-out-btn" id="sign-out">
            ${icons.logout}
            Sign Out
          </button>
        </aside>

        <!-- Main Content -->
        <main class="main-content" id="main-content">
          <!-- Dynamic Content -->
        </main>
      </div>
    `;

        // Attach Event Listeners
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                currentRoute = item.dataset.route;
                shouldOpenTransactionModal = false;
                render(); // Re-render sidebar active state
                renderContent();
            });
        });

        document.getElementById('sign-out').addEventListener('click', () => {
            // Show confirmation modal
            showSignOutModal();
        });

        renderContent();
    };

    const showSignOutModal = () => {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay open';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px;">
                <h3 class="modal-title">Sign Out?</h3>
                <p style="color: #6B7280; margin: 1rem 0 1.5rem 0; font-size: 0.95rem;">
                    Are you sure you want to sign out? You'll need to sign in again to access your account.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button id="cancel-signout" style="padding: 0.75rem 1.5rem; background-color: white; color: #374151; border: 1px solid #E5E7EB; border-radius: 8px; font-weight: 500; cursor: pointer;">Cancel</button>
                    <button id="confirm-signout" style="padding: 0.75rem 1.5rem; background-color: #DC2626; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Sign Out</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('cancel-signout').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        document.getElementById('confirm-signout').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            document.body.removeChild(modal);
            renderAuth(document.querySelector('#app'));
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    };

    const renderContent = () => {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear previous content

        switch (currentRoute) {
            case 'dashboard':
                renderDashboard(mainContent);
                break;
            case 'transactions':
                renderTransactions(mainContent);
                if (shouldOpenTransactionModal) {
                    setTimeout(() => {
                        const addBtn = document.getElementById('add-transaction-btn');
                        if (addBtn) {
                            addBtn.click();
                        }
                        shouldOpenTransactionModal = false;
                    }, 100);
                }
                break;
            case 'analytics':
                renderAnalytics(mainContent);
                break;
            case 'settings':
                renderSettings(mainContent);
                break;
            default:
                renderDashboard(mainContent);
        }
    };

    // Export function to navigate to transactions and open modal
    window.navigateToTransactionsWithModal = () => {
        currentRoute = 'transactions';
        shouldOpenTransactionModal = true;
        render();
    };

    render();
}
