# Personal Finance Tracker

A modern, full-featured personal finance tracker application with authentication, transaction management, analytics, and settings.

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Running

1. **Install Dependencies** (First time only)
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The terminal will show a URL like: `http://localhost:5173`
   - Open this URL in your web browser
   - The app will automatically reload when you make changes

### 📝 Default Login Credentials

You can sign in with:
- **Email:** `clever@gmail.com`
- **Password:** Any password with 8+ characters

Or create a new account using the "Create Account" tab.

**Google Sign-In** is also available! See [Google Sign-In Setup Guide](./GOOGLE_SIGNIN_SETUP.md) for configuration instructions.

## 🎯 Features

- ✅ User Authentication (Sign In / Sign Up)
- ✅ **Google Sign-In** (OAuth 2.0) - See setup guide below
- ✅ Dashboard with financial overview
- ✅ Transaction Management (Add, View, Categorize)
- ✅ Analytics with Charts (Income vs Expense, Spending by Category)
- ✅ Settings & Preferences
- ✅ CSV Export functionality
- ✅ Local Storage (Data persists in browser)

## 📁 Project Structure

```
FinanceEtracker/
├── src/
│   ├── main.js          # Entry point
│   ├── auth.js          # Authentication page
│   ├── app.js           # Main app layout & navigation
│   ├── dashboard.js     # Dashboard page
│   ├── transactions.js  # Transactions page
│   ├── analytics.js     # Analytics page
│   ├── settings.js      # Settings page
│   ├── data.js          # Data management (localStorage)
│   └── style.css        # All styles
├── index.html
└── package.json
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📱 Usage

1. **Sign In / Create Account**
   - Use the authentication page to sign in or create a new account
   - All data is stored locally in your browser

2. **Add Transactions**
   - Click "Add Transaction" button
   - Choose Expense or Income
   - Fill in amount, category, date, and description
   - Optionally upload a receipt

3. **View Analytics**
   - Navigate to Analytics page
   - View income vs expense charts
   - See spending breakdown by category

4. **Manage Settings**
   - Change currency preference
   - Toggle email notifications
   - Export transactions as CSV
   - Change password (UI ready, Firebase integration pending)

## 🔄 When to Run

- **Now**: You can run it immediately! Everything is set up and ready.
- **After making changes**: The dev server will auto-reload
- **To test**: Run anytime to test all features

## 💾 Data Storage

Currently using **localStorage** (browser storage):
- Data persists between sessions
- Data is stored locally on your device
- To clear data: Use browser's "Clear Site Data" or Delete Account in Settings

## 🔐 Google Sign-In Setup

Google Sign-In is implemented and ready to use! To enable it:

1. Follow the detailed setup guide: [GOOGLE_SIGNIN_SETUP.md](./GOOGLE_SIGNIN_SETUP.md)
2. Get your Google OAuth Client ID from [Google Cloud Console](https://console.cloud.google.com/)
3. Add it to `src/config.js`

**Note:** The app works without Google Sign-In configured - you'll see a setup message. Once configured, users can sign in with their Google accounts!

## 🔮 Future Firebase Integration

The app is structured to easily integrate Firebase:
- Authentication ready for Firebase Auth
- Google Sign-In can be migrated to Firebase Auth
- Data structure compatible with Firestore
- File upload ready for Firebase Storage

## 🐛 Troubleshooting

**Port already in use?**
- Vite will automatically try the next available port
- Check the terminal for the actual URL

**Dependencies not installing?**
- Delete `node_modules` folder
- Run `npm install` again

**App not loading?**
- Check browser console for errors
- Ensure all files are saved
- Try refreshing the page

## 📞 Support

If you encounter any issues:
1. Check browser console (F12)
2. Verify all dependencies are installed
3. Ensure Node.js version is 14+

---

**Ready to go!** Just run `npm install` (if first time) then `npm run dev` and start tracking your finances! 🎉

