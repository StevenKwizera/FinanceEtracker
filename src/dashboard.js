import { getTransactions, getSummary } from './data.js';
import Chart from 'chart.js/auto';

export function renderDashboard(element) {
    const summary = getSummary();
    const transactions = getTransactions().slice(0, 5); // Get recent 5
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"fullname": "clever"}');
    const userName = currentUser.fullname || 'clever';

    element.innerHTML = `
    <div class="header-section">
      <h2 class="header-title">Welcome back, ${userName}!</h2>
      <p class="header-subtitle">Here's your financial overview for this month</p>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Total Balance</span>
          <div class="stat-icon green">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>
        <div class="stat-value">$${summary.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">This Month Income</span>
          <div class="stat-icon green">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          </div>
        </div>
        <div class="stat-value">$${summary.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">This Month Expense</span>
          <div class="stat-icon red">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
          </div>
        </div>
        <div class="stat-value">$${summary.totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>
    </div>

    <!-- Balance Trend Chart -->
    <div class="chart-section">
      <h3 class="section-title">Balance Trend</h3>
      <div style="height: 300px;">
        <canvas id="balanceChart"></canvas>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h3 class="section-title" style="margin: 0;">Recent Transactions</h3>
      <button class="add-btn" id="dash-add-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Add Transaction
      </button>
    </div>

    <div class="transactions-list">
      ${transactions.map(t => `
        <div class="transaction-item">
          <div class="t-left">
            <div class="t-icon ${t.category.toLowerCase()}">
              ${getCategoryIcon(t.category, t.type)}
            </div>
            <div class="t-info">
              <h4>${t.title}</h4>
              <p>${t.category}</p>
            </div>
          </div>
          <div class="t-right">
            <span class="t-amount ${t.type === 'income' ? 'positive' : 'negative'}">
              ${t.type === 'income' ? '+' : '-'}$${parseFloat(t.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span class="t-date">${formatDate(t.date)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

    // Initialize Chart
    setTimeout(() => {
        const ctx = document.getElementById('balanceChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Today'],
                    datasets: [{
                        label: 'Balance',
                        data: [2250, 2200, 2750, 2000, 2200, 2500, summary.totalBalance],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 0,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { 
                            beginAtZero: false,
                            grid: { 
                                borderDash: [5, 5],
                                color: '#E5E7EB'
                            },
                            ticks: {
                                max: 3000,
                                stepSize: 750
                            }
                        },
                        x: { 
                            grid: { display: false }
                        }
                    }
                }
            });
        }
    }, 100);

    // Add Transaction Button Logic
    document.getElementById('dash-add-btn').addEventListener('click', () => {
        // Use the global navigation function if available
        if (window.navigateToTransactionsWithModal) {
            window.navigateToTransactionsWithModal();
        } else {
            // Fallback: Trigger navigation to transactions tab and open modal
            const transactionsNav = document.querySelector('[data-route="transactions"]');
            if (transactionsNav) {
                transactionsNav.click();
                // Wait for transactions page to render, then open modal
                setTimeout(() => {
                    const addBtn = document.getElementById('add-transaction-btn');
                    if (addBtn) {
                        addBtn.click();
                    }
                }, 200);
            }
        }
    });
}

function getCategoryIcon(category, type) {
    const categoryLower = category.toLowerCase();
    
    if (type === 'income') {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`;
    }
    
    if (categoryLower === 'food') {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l8-4v18"></path><path d="M19 21V11l-6-4"></path><rect x="9" y="9" width="4" height="4"></rect><rect x="9" y="13" width="4" height="4"></rect></svg>`;
    }
    
    if (categoryLower === 'entertainment') {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
    }
    
    if (categoryLower === 'transportation') {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon></svg>`;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
}
