// Initial Mock Data
const initialTransactions = [
    { id: 1, title: 'Monthly Salary', category: 'Salary', amount: 5000.00, date: '2025-11-29', type: 'income' },
    { id: 2, title: 'Coffee Shop', category: 'Food', amount: 4.50, date: '2025-11-30', type: 'expense' },
    { id: 3, title: 'Grocery Store', category: 'Food', amount: 89.32, date: '2025-12-01', type: 'expense' },
    { id: 4, title: 'Netflix Subscription', category: 'Entertainment', amount: 15.99, date: '2025-12-01', type: 'expense' },
    { id: 5, title: 'Freelance Project', category: 'Freelance', amount: 1200.00, date: '2025-11-26', type: 'income' },
    { id: 6, title: 'Gas Station', category: 'Transportation', amount: 45.00, date: '2025-11-28', type: 'expense' }
];

export const getTransactions = () => {
    const stored = localStorage.getItem('transactions');
    if (!stored) {
        localStorage.setItem('transactions', JSON.stringify(initialTransactions));
        return initialTransactions;
    }
    return JSON.parse(stored);
};

export const addTransaction = (transaction) => {
    const transactions = getTransactions();
    const newTransaction = { 
        ...transaction, 
        id: Date.now(),
        amount: parseFloat(transaction.amount)
    };
    transactions.unshift(newTransaction); // Add to beginning
    localStorage.setItem('transactions', JSON.stringify(transactions));
    return newTransaction;
};

export const getSummary = () => {
    const transactions = getTransactions();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Filter transactions for current month
    const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });
    
    const totalIncome = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    const totalExpense = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    return {
        totalBalance: totalIncome - totalExpense,
        totalIncome,
        totalExpense
    };
};
