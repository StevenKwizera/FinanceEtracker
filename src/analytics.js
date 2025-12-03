import { getTransactions, getSummary } from './data.js';
import Chart from 'chart.js/auto';

export function renderAnalytics(element) {
    const summary = getSummary();
    const transactions = getTransactions();

    // Process data for charts
    const categories = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + parseFloat(t.amount);
    });

    // Get top category
    const topCategory = Object.keys(categories).length > 0 
        ? Object.entries(categories).sort((a, b) => b[1] - a[1])[0]
        : ['Food', 450];

    // Calculate YTD (multiply by 12 for demo, or calculate actual YTD)
    const ytdIncome = summary.totalIncome * 12;
    const ytdExpense = summary.totalExpense * 12;

    // Calculate averages
    const avgMonthlyExpense = summary.totalExpense;
    const avgMonthlyIncome = summary.totalIncome;
    const savingsRate = avgMonthlyIncome > 0 
        ? Math.round(((avgMonthlyIncome - avgMonthlyExpense) / avgMonthlyIncome) * 100)
        : 0;

    element.innerHTML = `
    <div class="header-section">
      <h2 class="header-title">Analytics</h2>
      <p class="header-subtitle">Visualize your spending patterns and financial insights</p>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Top Category</span>
          <div class="stat-icon green">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
          </div>
        </div>
        <div class="stat-value">$${topCategory[1].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Total Income (YTD)</span>
          <div class="stat-icon green">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          </div>
        </div>
        <div class="stat-value">$${ytdIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">Total Expense (YTD)</span>
          <div class="stat-icon red">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
          </div>
        </div>
        <div class="stat-value">$${ytdExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
      <!-- Income vs Expense Chart -->
      <div class="chart-section">
        <h3 class="section-title">Income vs Expense</h3>
        <div style="height: 300px;">
          <canvas id="barChart"></canvas>
        </div>
      </div>

      <!-- Spending by Category Chart -->
      <div class="chart-section">
        <h3 class="section-title">Spending by Category</h3>
        <div style="height: 300px;">
          <canvas id="pieChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Summary Card -->
    <div class="summary-card">
      <div class="summary-grid">
        <div class="summary-item">
          <div class="summary-label">Savings Rate</div>
          <div class="summary-value green">${savingsRate}%</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Average Monthly Expense</div>
          <div class="summary-value">$${avgMonthlyExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Average Monthly Income</div>
          <div class="summary-value">$${avgMonthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      </div>
    </div>
  `;

    // Bar Chart
    setTimeout(() => {
        const barCtx = document.getElementById('barChart');
        if (barCtx) {
            new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Income',
                            data: [4000, 3000, 2000, 2700, 1800, 2300],
                            backgroundColor: '#10B981',
                            borderRadius: 4
                        },
                        {
                            label: 'Expense',
                            data: [2400, 1300, 9800, 3900, 4800, 3800],
                            backgroundColor: '#EF4444',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 15
                            }
                        }
                    },
                    scales: {
                        y: { 
                            beginAtZero: true, 
                            grid: { 
                                borderDash: [5, 5],
                                color: '#E5E7EB'
                            },
                            ticks: {
                                max: 10000,
                                stepSize: 2500
                            }
                        },
                        x: { 
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // Pie Chart
        const pieCtx = document.getElementById('pieChart');
        if (pieCtx) {
            const categoryData = Object.keys(categories).length > 0 
                ? {
                    labels: Object.keys(categories),
                    values: Object.values(categories)
                }
                : {
                    labels: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Other'],
                    values: [450, 320, 280, 200, 150]
                };

            new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: categoryData.labels,
                    datasets: [{
                        data: categoryData.values,
                        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                padding: 10
                            }
                        }
                    }
                }
            });
        }
    }, 100);
}
