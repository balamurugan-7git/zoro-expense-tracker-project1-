import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, PieChart, Info } from 'lucide-react';

const Analytics = ({ wallet, expenses }) => {
    const stats = useMemo(() => {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0)).getTime();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).getTime();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

        const daily = expenses.filter(e => new Date(e.date).getTime() >= startOfDay)
            .reduce((sum, e) => sum + e.amount, 0);

        const weekly = expenses.filter(e => new Date(e.date).getTime() >= startOfWeek)
            .reduce((sum, e) => sum + e.amount, 0);

        const monthly = expenses.filter(e => new Date(e.date).getTime() >= startOfMonth)
            .reduce((sum, e) => sum + e.amount, 0);

        return { daily, weekly, monthly };
    }, [expenses]);

    const comparison = useMemo(() => {
        const total = wallet.income + wallet.expenses;
        if (total === 0) return { incomePct: 50, expensePct: 50 };
        return {
            incomePct: (wallet.income / total) * 100,
            expensePct: (wallet.expenses / total) * 100
        };
    }, [wallet]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid"
            style={{ gap: '1.5rem' }}
        >
            <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <BarChart3 className="text-primary" />
                    <h2 style={{ margin: 0 }}>Smart Insights</h2>
                </div>

                <div className="grid dashboard-grid" style={{ gap: '1rem' }}>
                    {[
                        { label: 'Today', value: stats.daily, icon: <TrendingDown size={14} />, color: 'var(--accent)' },
                        { label: 'This Week', value: stats.weekly, icon: <TrendingDown size={14} />, color: 'var(--primary)' },
                        { label: 'This Month', value: stats.monthly, icon: <TrendingDown size={14} />, color: 'var(--secondary)' }
                    ].map(item => (
                        <motion.div
                            key={item.label}
                            whileHover={{ y: -5 }}
                            className="glass-card"
                            style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}
                        >
                            <p style={{ opacity: 0.6, fontSize: '0.8rem' }}>{item.label}</p>
                            <h3 style={{ margin: '0.5rem 0', color: item.color }}>₹{item.value.toLocaleString()}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem' }}>
                                {item.icon} <span>Total Spent</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <PieChart className="text-primary" />
                    <h3 style={{ margin: 0 }}>Income vs Expenses</h3>
                </div>

                <div style={{ position: 'relative', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden', display: 'flex' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${comparison.incomePct}%` }}
                        transition={{ type: 'spring', damping: 15 }}
                        style={{ height: '100%', background: 'var(--success)', boxShadow: '0 0 15px var(--success)' }}
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${comparison.expensePct}%` }}
                        transition={{ type: 'spring', damping: 15 }}
                        style={{ height: '100%', background: 'var(--error)', boxShadow: '0 0 15px var(--error)' }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--success)' }} />
                        <span style={{ fontSize: '0.9rem' }}>Income ({comparison.incomePct.toFixed(0)}%)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--error)' }} />
                        <span style={{ fontSize: '0.9rem' }}>Expenses ({comparison.expensePct.toFixed(0)}%)</span>
                    </div>
                </div>

                <div className="glass-card" style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(157, 80, 187, 0.05)', border: '1px solid rgba(157, 80, 187, 0.2)', display: 'flex', gap: '1rem' }}>
                    <Info className="text-primary" size={20} style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, lineHeight: '1.4' }}>
                        {wallet.balance > 0
                            ? `You are currently saving ${((wallet.balance / (wallet.income || 1)) * 100).toFixed(0)}% of your total income. Great job, Zoro!`
                            : "Careful! Your expenses are matching your income. Time to activate Quest Mode?"}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Analytics;
