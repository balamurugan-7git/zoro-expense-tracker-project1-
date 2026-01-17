import React, { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UpcomingExpenses = ({ onAddExpense }) => {
    const [upcoming, setUpcoming] = useState(() => {
        const saved = localStorage.getItem('zoro_upcoming');
        return saved ? JSON.parse(saved) : [];
    });
    const [newUpcoming, setNewUpcoming] = useState({ amount: '', note: '' });

    const saveToLocal = (data) => {
        localStorage.setItem('zoro_upcoming', JSON.stringify(data));
        setUpcoming(data);
    };

    const addUpcoming = (e) => {
        e.preventDefault();
        if (!newUpcoming.amount) return;
        const item = { ...newUpcoming, id: Date.now(), amount: parseFloat(newUpcoming.amount) };
        saveToLocal([...upcoming, item]);
        setNewUpcoming({ amount: '', note: '' });
    };

    const removeUpcoming = (id) => {
        saveToLocal(upcoming.filter(i => i.id !== id));
    };

    const moveToExpense = (item) => {
        onAddExpense({ amount: item.amount, category: 'Unplanned', note: item.note });
        removeUpcoming(item.id);
    };

    return (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <Clock className="text-primary" />
                <h3 style={{ margin: 0 }}>Unplanned Buffer</h3>
            </div>

            <form onSubmit={addUpcoming} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input
                    type="number"
                    placeholder="₹ Amount"
                    style={{ marginBottom: 0, flex: 1 }}
                    value={newUpcoming.amount}
                    onChange={e => setNewUpcoming({ ...newUpcoming, amount: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Note..."
                    style={{ marginBottom: 0, flex: 2 }}
                    value={newUpcoming.note}
                    onChange={e => setNewUpcoming({ ...newUpcoming, note: e.target.value })}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}><Plus size={20} /></button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <AnimatePresence>
                    {upcoming.map(item => (
                        <motion.div
                            key={item.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="glass-card"
                            style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div>
                                <p style={{ fontWeight: '600' }}>₹{item.amount}</p>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>{item.note}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => moveToExpense(item)}
                                    className="btn"
                                    style={{ padding: '0.4rem 0.8rem', background: 'rgba(0, 230, 118, 0.1)', color: 'var(--success)', fontSize: '0.7rem' }}
                                >
                                    ADD
                                </button>
                                <button
                                    onClick={() => removeUpcoming(item.id)}
                                    className="btn"
                                    style={{ padding: '0.4rem', background: 'rgba(255, 23, 68, 0.1)', color: 'var(--error)' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {upcoming.length === 0 && (
                    <p style={{ textAlign: 'center', opacity: 0.4, padding: '1rem', fontSize: '0.8rem' }}>No unplanned expenses tracked</p>
                )}
            </div>
        </div>
    );
};

export default UpcomingExpenses;
