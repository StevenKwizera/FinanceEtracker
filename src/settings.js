import { getTransactions } from './data.js';

export function renderSettings(element) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"fullname": "clever", "email": "clever@gmail.com"}');
    const preferences = JSON.parse(localStorage.getItem('preferences') || '{"currency": "US Dollar (USD)", "emailNotifications": true}');
    
    element.innerHTML = `
    <div class="header-section">
      <h2 class="header-title">Settings</h2>
      <p class="header-subtitle">Manage your account preferences and settings</p>
    </div>

    <div class="settings-section">
      <h3 class="settings-title">Profile Settings</h3>
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input type="text" class="form-input" value="${currentUser.fullname || 'clever'}" readonly style="background-color: #F3F4F6; cursor: not-allowed;">
      </div>
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" class="form-input" value="${currentUser.email || 'clever@gmail.com'}" readonly style="background-color: #F3F4F6; cursor: not-allowed;">
      </div>
      <button class="submit-btn" id="change-password-btn" style="width: auto; background-color: white; color: #374151; border: 1px solid #E5E7EB; display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        Change Password
      </button>
    </div>

    <div class="settings-section">
      <h3 class="settings-title">Preferences</h3>
      <div class="form-group">
        <label class="form-label">Currency</label>
        <select class="form-input" id="currency-select" style="padding-left: 1rem;">
          <option value="US Dollar (USD)" ${preferences.currency === 'US Dollar (USD)' ? 'selected' : ''}>US Dollar (USD)</option>
          <option value="Euro (EUR)" ${preferences.currency === 'Euro (EUR)' ? 'selected' : ''}>Euro (EUR)</option>
          <option value="British Pound (GBP)" ${preferences.currency === 'British Pound (GBP)' ? 'selected' : ''}>British Pound (GBP)</option>
          <option value="Japanese Yen (JPY)" ${preferences.currency === 'Japanese Yen (JPY)' ? 'selected' : ''}>Japanese Yen (JPY)</option>
        </select>
        <div class="form-hint">This will be used to format all currency values</div>
      </div>
      
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem;">
        <div>
          <div style="font-weight: 600; color: #111827; display: flex; align-items: center; gap: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            Email Notifications
          </div>
          <div style="font-size: 0.875rem; color: #6B7280; margin-top: 0.25rem;">Receive updates about your finances</div>
        </div>
        <input type="checkbox" id="email-notifications-checkbox" ${preferences.emailNotifications ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--primary-color); cursor: pointer;">
      </div>
    </div>

    <div class="settings-section">
      <h3 class="settings-title">Data Management</h3>
      <button class="submit-btn" id="export-csv-btn" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: auto;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Export Transactions as CSV
      </button>
      <div class="form-hint" style="margin-top: 0.5rem;">Download all your transaction data in CSV format for backup or analysis.</div>
    </div>

    <div class="settings-section">
      <h3 class="settings-title">Security</h3>
      <button class="submit-btn" id="two-factor-btn" style="background-color: white; color: #374151; border: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: auto;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        Enable Two-Factor Authentication
      </button>
      <div class="form-hint" style="margin-top: 0.5rem;">Add an extra layer of security to your account</div>
    </div>

    <div class="settings-section danger-zone">
      <h3 class="settings-title">Danger Zone</h3>
      <p style="color: #991B1B; font-size: 0.875rem; margin-bottom: 1rem;">These actions cannot be undone. Please proceed with caution.</p>
      <button class="danger-btn" id="delete-account-btn">Delete Account</button>
    </div>
  `;

    // Currency preference
    const currencySelect = document.getElementById('currency-select');
    currencySelect.addEventListener('change', (e) => {
        preferences.currency = e.target.value;
        localStorage.setItem('preferences', JSON.stringify(preferences));
        alert(`Currency preference saved: ${e.target.value}`);
    });

    // Email notifications preference
    const emailNotificationsCheckbox = document.getElementById('email-notifications-checkbox');
    emailNotificationsCheckbox.addEventListener('change', (e) => {
        preferences.emailNotifications = e.target.checked;
        localStorage.setItem('preferences', JSON.stringify(preferences));
    });

    // Export CSV functionality
    const exportBtn = document.getElementById('export-csv-btn');
    exportBtn.addEventListener('click', () => {
        const transactions = getTransactions();
        if (transactions.length === 0) {
            alert('No transactions to export');
            return;
        }
        
        const csv = [
            ['Date', 'Description', 'Category', 'Type', 'Amount'],
            ...transactions.map(t => [
                t.date,
                `"${t.title}"`,
                t.category,
                t.type,
                t.amount
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        alert('Transactions exported successfully!');
    });

    // Delete account button
    const deleteBtn = document.getElementById('delete-account-btn');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently deleted.')) {
            if (confirm('This is your last chance. Are you absolutely sure?')) {
                localStorage.clear();
                alert('Account deleted. Redirecting to login...');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }
    });

    // Change password button - show modal
    const changePasswordBtn = document.getElementById('change-password-btn');
    changePasswordBtn.addEventListener('click', () => {
        showChangePasswordModal();
    });

    // Two-factor auth button - show modal
    const twoFactorBtn = document.getElementById('two-factor-btn');
    twoFactorBtn.addEventListener('click', () => {
        showTwoFactorModal();
    });
}

function showChangePasswordModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay open';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 450px;">
            <div class="modal-header">
                <div>
                    <h3 class="modal-title">Change Password</h3>
                    <p style="color: #6B7280; margin-top: 0.5rem; font-size: 0.9rem;">Update your account password</p>
                </div>
                <button class="close-btn" id="close-password-modal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <form id="change-password-form">
                <div class="form-group">
                    <label class="form-label">Current Password *</label>
                    <div class="input-wrapper">
                        <div class="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <input type="password" class="form-input" placeholder="Enter current password" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">New Password *</label>
                    <div class="input-wrapper">
                        <div class="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <input type="password" class="form-input" placeholder="Enter new password" required minlength="8">
                    </div>
                    <div class="form-hint">Password must be at least 8 characters long</div>
                </div>
                <div class="form-group">
                    <label class="form-label">Confirm New Password *</label>
                    <div class="input-wrapper">
                        <div class="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <input type="password" class="form-input" placeholder="Confirm new password" required minlength="8">
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button type="button" class="submit-btn" style="background-color: white; color: #374151; border: 1px solid #E5E7EB; flex: 1;" id="cancel-password-btn">Cancel</button>
                    <button type="submit" class="submit-btn" style="flex: 1;">Update Password</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => {
        document.body.removeChild(modal);
    };

    document.getElementById('close-password-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-password-btn').addEventListener('click', closeModal);

    document.getElementById('change-password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = e.target.querySelectorAll('input');
        const currentPassword = inputs[0].value;
        const newPassword = inputs[1].value;
        const confirmPassword = inputs[2].value;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        // In a real app, this would verify current password and update it
        alert('Password change functionality will be fully implemented with Firebase authentication');
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showTwoFactorModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay open';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 450px;">
            <div class="modal-header">
                <div>
                    <h3 class="modal-title">Enable Two-Factor Authentication</h3>
                    <p style="color: #6B7280; margin-top: 0.5rem; font-size: 0.9rem;">Add an extra layer of security to your account</p>
                </div>
                <button class="close-btn" id="close-2fa-modal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div style="padding: 1rem 0;">
                <p style="color: #6B7280; margin-bottom: 1.5rem; line-height: 1.6;">
                    Two-factor authentication (2FA) adds an additional layer of security to your account. 
                    After enabling 2FA, you'll need to enter a verification code from your authenticator app 
                    in addition to your password when signing in.
                </p>
                <div style="background-color: #F3F4F6; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <p style="font-weight: 600; color: #111827; margin-bottom: 0.5rem;">How it works:</p>
                    <ol style="color: #6B7280; padding-left: 1.5rem; line-height: 1.8;">
                        <li>Download an authenticator app (Google Authenticator, Authy, etc.)</li>
                        <li>Scan the QR code that will be displayed</li>
                        <li>Enter the verification code to confirm</li>
                    </ol>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button type="button" class="submit-btn" style="background-color: white; color: #374151; border: 1px solid #E5E7EB; flex: 1;" id="cancel-2fa-btn">Cancel</button>
                    <button type="button" class="submit-btn" style="flex: 1;" id="enable-2fa-btn">Enable 2FA</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => {
        document.body.removeChild(modal);
    };

    document.getElementById('close-2fa-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-2fa-btn').addEventListener('click', closeModal);

    document.getElementById('enable-2fa-btn').addEventListener('click', () => {
        alert('Two-factor authentication setup will be fully implemented with Firebase authentication');
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}
