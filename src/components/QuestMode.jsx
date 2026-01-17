import React, { useState } from 'react';
import { Trophy, Target, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const QuestMode = ({ balance }) => {
    const [quests, setQuests] = useState([
        { id: 1, title: 'Survivalist', goal: 10000, description: 'Maintain a balance above ₹10k', icon: <Target className="text-primary" /> },
        { id: 2, title: 'Wealth Builder', goal: 50000, description: 'Reach ₹50k total assets', icon: <Star style={{ color: '#ffd700' }} /> },
        { id: 3, title: 'Legendary Saver', goal: 100000, description: 'Reach ₹100k total assets', icon: <Trophy style={{ color: '#ff007c' }} /> }
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255, 0, 124, 0.1), rgba(157, 80, 187, 0.1))' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Active Quests</h2>
                <p style={{ opacity: 0.7 }}>Complete objectives to unlock premium themes</p>
            </div>

            <div className="grid dashboard-grid">
                {quests.map(quest => {
                    const progress = Math.min((balance / quest.goal) * 100, 100);
                    return (
                        <motion.div
                            key={quest.id}
                            whileHover={{ scale: 1.03 }}
                            className="glass-card"
                            style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    height: '4px',
                                    width: `${progress}%`,
                                    background: progress === 100 ? 'var(--success)' : 'var(--primary)',
                                    boxShadow: '0 0 10px var(--primary)',
                                    transition: 'width 1s ease-out'
                                }}
                            />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                    {quest.icon}
                                </div>
                                {progress === 100 && (
                                    <span style={{ fontSize: '0.7rem', background: 'var(--success)', color: 'black', padding: '0.2rem 0.6rem', borderRadius: '10px', fontWeight: '800' }}>COMPLETED</span>
                                )}
                            </div>

                            <h3 style={{ margin: '0 0 0.5rem 0' }}>{quest.title}</h3>
                            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1rem' }}>{quest.description}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                                <span style={{ fontWeight: '600' }}>{progress.toFixed(0)}%</span>
                                <span style={{ opacity: 0.5 }}>Target: ₹{quest.goal.toLocaleString()}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '0.8rem', background: 'rgba(110, 72, 170, 0.2)', borderRadius: '12px' }}>
                        <Trophy className="text-primary" />
                    </div>
                    <div>
                        <h4 style={{ margin: 0 }}>Leaderboard</h4>
                        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Compete with friends</p>
                    </div>
                </div>
                <ChevronRight opacity={0.5} />
            </div>
        </div>
    );
};

export default QuestMode;
