import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import QuestMode from './components/QuestMode';
import Analytics from './components/Analytics';
import './index.css';

function App() {
  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem('zoro_wallet');
    return saved ? JSON.parse(saved) : { balance: 50000, income: 0, expenses: 0 };
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('zoro_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState('dashboard'); // dashboard, history, quests

  useEffect(() => {
    localStorage.setItem('zoro_wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('zoro_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now(), date: new Date().toISOString() }]);
    setWallet(prev => ({
      ...prev,
      balance: prev.balance - expense.amount,
      expenses: prev.expenses + expense.amount
    }));
  };

  const addIncome = (amount) => {
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount,
      income: prev.income + amount
    }));
  };

  const setBalance = (amount) => {
    setWallet(prev => ({
      ...prev,
      balance: amount
    }));
  };

  const resetAllData = () => {
    if (window.confirm("Are you sure you want to reset EVERYTHING? This cannot be undone.")) {
      localStorage.clear();
      setWallet({ balance: 50000, income: 0, expenses: 0 });
      setExpenses([]);
      window.location.reload(); // Simplest way to ensure all sub-components (like Upcoming) reset their local state
    }
  };

  const updateBalance = (amount) => {
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #ff007c, #9d50bb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ZORO
          </h1>
          <p style={{ opacity: 0.7 }}>Ultimate Expense Tracker</p>
        </div>
        <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setView('dashboard')} className={`btn ${view === 'dashboard' ? 'btn-primary' : ''}`} style={{ background: view === 'dashboard' ? '' : 'transparent', padding: '0.5rem 1rem' }}>Dashboard</button>
          <button onClick={() => setView('analytics')} className={`btn ${view === 'analytics' ? 'btn-primary' : ''}`} style={{ background: view === 'analytics' ? '' : 'transparent', padding: '0.5rem 1rem' }}>Analytics</button>
          <button onClick={() => setView('quests')} className={`btn ${view === 'quests' ? 'btn-primary' : ''}`} style={{ background: view === 'quests' ? '' : 'transparent', padding: '0.5rem 1rem' }}>Quests</button>
        </div>
      </header>

      {view === 'dashboard' && (
        <Dashboard
          wallet={wallet}
          expenses={expenses}
          onAddExpense={addExpense}
          onAddIncome={addIncome}
          onUpdateBalance={updateBalance}
          onSetBalance={setBalance}
          onReset={resetAllData}
        />
      )}

      {view === 'analytics' && (
        <Analytics wallet={wallet} expenses={expenses} />
      )}

      {view === 'quests' && (
        <QuestMode balance={wallet.balance} />
      )}
    </div>
  );
}

export default App;
