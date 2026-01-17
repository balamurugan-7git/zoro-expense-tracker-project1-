import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Minus, Calendar, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UpcomingExpenses from './UpcomingExpenses';

const Dashboard = ({ wallet, expenses, onAddExpense, onAddIncome, onUpdateBalance, onSetBalance, onReset }) => {
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [showTopupModal, setShowTopupModal] = useState(false);
    const [formData, setFormData] = useState({ amount: '', category: '🍛 Food & Dining', note: '' });

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount) return;
        onAddExpense({
            amount: parseFloat(formData.amount),
            category: formData.category,
            note: formData.note
        });
        setFormData({ amount: '', category: 'Food', note: '' });
        setShowExpenseModal(false);
    };

    const handleIncomeSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount) return;
        onAddIncome(parseFloat(formData.amount));
        setFormData({ amount: '', category: 'General', note: '' });
        setShowIncomeModal(false);
    };

    const handleTopupSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount) return;
        onSetBalance(parseFloat(formData.amount));
        setFormData({ amount: '', category: '🍛 Food & Dining', note: '' });
        setShowTopupModal(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid dashboard-grid"
        >
            {/* Total Balance Card */}
            <motion.div
                variants={itemVariants}
                className="glass-card"
                style={{ padding: '2rem', gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(157, 80, 187, 0.1), rgba(110, 72, 170, 0.1))' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ opacity: 0.7, marginBottom: '0.5rem' }}>Total Assets</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: '700', margin: 0 }}>₹{wallet.balance.toLocaleString()}</h2>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onUpdateBalance(-100)}
                                    className="btn"
                                    style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255, 23, 68, 0.1)', color: 'var(--error)', border: '1px solid rgba(255, 23, 68, 0.2)' }}
                                    title="Quick deduct ₹100"
                                >
                                    <Minus size={16} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onUpdateBalance(100)}
                                    className="btn"
                                    style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(0, 230, 118, 0.1)', color: 'var(--success)', border: '1px solid rgba(0, 230, 118, 0.2)' }}
                                    title="Quick add ₹100"
                                >
                                    <Plus size={16} />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        onClick={() => setShowTopupModal(true)}
                        className="glass-card"
                        style={{ padding: '1rem', borderRadius: '50%', background: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Manage Balance"
                    >
                        <Wallet size={32} />
                    </motion.div>
                </div>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                    <div>
                        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Income Flow</p>
                        <p style={{ color: 'var(--success)', fontWeight: '600' }}>+₹{wallet.income.toLocaleString()}</p>
                    </div>
                    <div>
                        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Expense Flow</p>
                        <p style={{ color: 'var(--error)', fontWeight: '600' }}>-₹{wallet.expenses.toLocaleString()}</p>
                    </div>
                </div>
            </motion.div>

            {/* Quick Action Cards */}
            <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setShowExpenseModal(true)}
                className="glass-card"
                style={{ padding: '1.5rem', cursor: 'pointer', borderLeft: '4px solid var(--error)' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.8rem', background: 'rgba(255, 23, 68, 0.1)', borderRadius: '12px', color: 'var(--error)' }}>
                        <TrendingDown />
                    </div>
                    <div>
                        <h3 style={{ margin: 0 }}>Expense Flow</h3>
                        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Deduct from wallet</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setShowIncomeModal(true)}
                className="glass-card"
                style={{ padding: '1.5rem', cursor: 'pointer', borderLeft: '4px solid var(--success)' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.8rem', background: 'rgba(0, 230, 118, 0.1)', borderRadius: '12px', color: 'var(--success)' }}>
                        <TrendingUp />
                    </div>
                    <div>
                        <h3 style={{ margin: 0 }}>Income Flow</h3>
                        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Add to assets</p>
                    </div>
                </div>
            </motion.div>

            {/* Recent History */}
            <motion.div
                variants={itemVariants}
                className="glass-card"
                style={{ padding: '1.5rem', gridColumn: '1 / -1' }}
            >
                <h3 style={{ marginBottom: '1.5rem' }}>Live Feed</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {expenses.length === 0 ? (
                        <p style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>No recent activities</p>
                    ) : (
                        expenses.slice().reverse().map(expense => (
                            <div key={expense.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                        <Zap size={18} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '600' }}>{expense.category}</p>
                                        <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>{expense.note || 'No notes'}</p>
                                    </div>
                                </div>
                                <p style={{ color: 'var(--error)', fontWeight: '700' }}>-₹{expense.amount}</p>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>

            {/* Upcoming / Unplanned Section */}
            <motion.div variants={itemVariants} style={{ gridColumn: '1 / -1' }}>
                <UpcomingExpenses onAddExpense={onAddExpense} />
            </motion.div>

            {/* Reset Option */}
            <motion.div variants={itemVariants} style={{ gridColumn: '1 / -1', marginTop: '1rem', marginBottom: '3rem', textAlign: 'center' }}>
                <button
                    onClick={onReset}
                    className="btn"
                    style={{ background: 'rgba(255, 23, 68, 0.05)', color: 'var(--error)', border: '1px solid rgba(255, 23, 68, 0.2)', padding: '0.8rem 2rem', fontSize: '0.8rem' }}
                >
                    Reset All Data
                </button>
            </motion.div>

            {/* Modals */}
            <AnimatePresence>
                {(showExpenseModal || showIncomeModal || showTopupModal) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                        onClick={() => { setShowExpenseModal(false); setShowIncomeModal(false); setShowTopupModal(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="glass-card"
                            style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <h2>
                                {showTopupModal ? 'Reset Total Assets' : (showExpenseModal ? 'Add Expense' : 'Add Income')}
                            </h2>
                            <form onSubmit={showTopupModal ? handleTopupSubmit : (showExpenseModal ? handleExpenseSubmit : handleIncomeSubmit)}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                                    {showTopupModal ? 'New Total Amount' : 'Amount'}
                                </label>
                                <input
                                    type="number"
                                    placeholder={showTopupModal ? wallet.balance : "0.00"}
                                    autoFocus
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                />

                                {showExpenseModal && (
                                    <>
                                        <label style={{ fontSize: '0.8rem', opacity: 0.6 }}>Category</label>
                                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                            <option>🍛 Food & Dining</option>
                                            <option>🛒 Groceries</option>
                                            <option>🚗 Transport & Fuel</option>
                                            <option>💡 Bills & Utilities</option>
                                            <option>🏠 Rent & EMI</option>
                                            <option>🎪 Entertainment</option>
                                            <option>🛍️ Shopping</option>
                                            <option>🏥 Health & Medical</option>
                                            <option>📱 Subscriptions</option>
                                            <option>🎁 Gifts & Donation</option>
                                            <option>✨ Other</option>
                                        </select>
                                    </>
                                )}

                                <label style={{ fontSize: '0.8rem', opacity: 0.6 }}>Note (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="What was this for?"
                                    value={formData.note}
                                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                                />

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="button" onClick={() => { setShowExpenseModal(false); setShowIncomeModal(false); setShowTopupModal(false); }} className="btn" style={{ flex: 1 }}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Dashboard;
