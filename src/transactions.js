import { getTransactions, addTransaction } from './data.js';

let currentTransactionType = 'expense';

export function renderTransactions(element) {
    const transactions = getTransactions();

    element.innerHTML = `
    <div class="header-section">
      <div class="transactions-header">
        <div>
          <h2 class="header-title">Transactions</h2>
          <p class="header-subtitle">View and manage your financial transactions</p>
        </div>
        <button class="add-btn" id="add-transaction-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Transaction
        </button>
      </div>
    </div>

    <div class="transactions-list">
      ${transactions.length > 0 ? transactions.map(t => `
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
      `).join('') : '<p style="text-align: center; color: #6B7280; padding: 2rem;">No transactions yet. Add your first transaction!</p>'}
    </div>

    <!-- Add Transaction Modal -->
    <div class="modal-overlay" id="transaction-modal">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">Add Transaction</h3>
            <p style="color: #6B7280; margin-top: 0.5rem; font-size: 0.9rem;">Record a new income or expense transaction</p>
          </div>
          <button class="close-btn" id="close-modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <form id="add-transaction-form">
          <div class="type-toggle">
            <button type="button" class="type-btn active" data-type="expense" id="type-expense">Expense</button>
            <button type="button" class="type-btn" data-type="income" id="type-income">Income</button>
          </div>
          <input type="hidden" name="type" id="transaction-type" value="expense">

          <div class="form-group">
            <label class="form-label">Amount *</label>
            <div class="input-wrapper">
              <span style="position: absolute; left: 1rem; color: #9CA3AF; z-index: 1;">$</span>
              <input type="number" step="0.01" min="0" class="form-input" placeholder="0.00" required name="amount" id="amount-input" style="padding-left: 2rem;">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Category *</label>
            <select class="form-input" style="padding-left: 1rem;" name="category" required id="category-select">
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Date *</label>
            <div class="input-wrapper">
              <input type="date" class="form-input" style="padding-left: 1rem;" required name="date" id="date-input" value="${new Date().toISOString().split('T')[0]}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Description *</label>
            <input type="text" class="form-input" style="padding-left: 1rem;" placeholder="e.g., Grocery shopping, Monthly rent..." required name="title" id="title-input">
          </div>

          <div class="form-group">
            <label class="form-label">Receipt (Optional)</label>
            <div style="border: 2px dashed #E5E7EB; border-radius: 8px; padding: 2rem; text-align: center; color: #6B7280; cursor: pointer; background-color: #F9FAFB; transition: background-color 0.2s;" id="receipt-upload">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              <div style="font-size: 0.875rem;">Click to upload receipt image</div>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <button type="button" class="submit-btn" style="background-color: white; color: #374151; border: 1px solid #E5E7EB; flex: 1;" id="cancel-modal-btn">Cancel</button>
            <button type="submit" class="submit-btn" style="flex: 1;">Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  `;

    // Modal Logic
    const modal = document.getElementById('transaction-modal');
    const openBtn = document.getElementById('add-transaction-btn');
    const closeBtn = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-modal-btn');
    const form = document.getElementById('add-transaction-form');
    const typeExpenseBtn = document.getElementById('type-expense');
    const typeIncomeBtn = document.getElementById('type-income');
    const typeInput = document.getElementById('transaction-type');
    const categorySelect = document.getElementById('category-select');

    const resetModal = () => {
        currentTransactionType = 'expense';
        typeInput.value = 'expense';
        typeExpenseBtn.classList.add('active');
        typeIncomeBtn.classList.remove('active');
        form.reset();
        document.getElementById('date-input').value = new Date().toISOString().split('T')[0];
        updateCategoryOptions();
    };

    const updateCategoryOptions = () => {
        if (currentTransactionType === 'income') {
            categorySelect.innerHTML = `
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
                <option value="Other">Other</option>
            `;
        } else {
            categorySelect.innerHTML = `
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
            `;
        }
    };

    const openModal = () => {
        resetModal();
        modal.classList.add('open');
    };
    
    const closeModal = () => {
        modal.classList.remove('open');
        resetModal();
    };

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Type Toggle Logic
    typeExpenseBtn.addEventListener('click', () => {
        currentTransactionType = 'expense';
        typeInput.value = 'expense';
        typeExpenseBtn.classList.add('active');
        typeIncomeBtn.classList.remove('active');
        updateCategoryOptions();
    });

    typeIncomeBtn.addEventListener('click', () => {
        currentTransactionType = 'income';
        typeInput.value = 'income';
        typeIncomeBtn.classList.add('active');
        typeExpenseBtn.classList.remove('active');
        updateCategoryOptions();
    });

    // Receipt upload
    const receiptUpload = document.getElementById('receipt-upload');
    receiptUpload.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                receiptUpload.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <div style="font-size: 0.875rem;">${file.name}</div>
                `;
                receiptUpload.style.backgroundColor = '#ECFDF5';
                receiptUpload.style.color = '#10B981';
            }
        };
        input.click();
    });

    receiptUpload.addEventListener('mouseenter', () => {
        receiptUpload.style.backgroundColor = '#F3F4F6';
    });

    receiptUpload.addEventListener('mouseleave', () => {
        if (!receiptUpload.textContent.includes('.')) {
            receiptUpload.style.backgroundColor = '#F9FAFB';
        }
    });

    // Form Submit Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.type = currentTransactionType;

        if (!data.amount || parseFloat(data.amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        addTransaction(data);
        closeModal();
        // Re-render by calling the function again
        setTimeout(() => {
            renderTransactions(element);
        }, 100);
    });

    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
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

// Export function to open modal from other pages
export function openTransactionModal() {
    const btn = document.getElementById('add-transaction-btn');
    if (btn) {
        btn.click();
    }
}
