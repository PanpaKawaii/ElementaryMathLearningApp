import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../mocks/CallingAPI';
import { comments } from '../../../mocks/DatabaseSample';
import './ProfilePage.css';

// Mock user data as backup
const mockUser = {
    id: 1,
    name: 'John Doe',
    username: 'jdoe',
    password: 'pass123',
    role: 'Student',
    curatorId: null,
    email: 'jdoe@example.com',
    point: 100,
    joinedDate: '2024-06-01',
    dayStreak: 5,
    highestDayStreak: 10
};

const mockAchievements = [
    {
        id: 1,
        name: 'Wildfire',
        description: 'Reach a 3 day streak',
        icon: '🔥',
        level: 1,
        progress: 1,
        goal: 3,
        color: '#FF5B5B'
    },
    {
        id: 2,
        name: 'Sage',
        description: 'Earn 500 XP',
        icon: '🧙‍♂️',
        level: 3,
        progress: 451,
        goal: 500,
        color: '#7ED957'
    },
    {
        id: 3,
        name: 'Scholar',
        description: 'Learn 50 new words in a single course',
        icon: '📜',
        level: 1,
        progress: 2,
        goal: 50,
        color: '#FFD966'
    }
];

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace with your actual token logic
        const token = localStorage.getItem('token') || '';
        fetchData('/api/user', token)
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setUser(mockUser); // fallback to mock data
                setLoading(false);
            });
        // Fetch achievements
        fetchData('achievement', token)
            .then(data => {
                setAchievements(Array.isArray(data) ? data : [data]);
            })
            .catch(() => {
                setAchievements(mockAchievements); // fallback to mock achievements
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error && !user) return <div>Error: {error}</div>;
    if (!user) return <div>No user data</div>;

    return (
        <div className="profile-page-container">
            <div className="profile-header">
                <div className="profile-avatar-section">
                    <div className="profile-avatar-placeholder">
                        <span className="profile-avatar-icon">+</span>
                    </div>
                    <button className="profile-edit-btn">✎</button>
                </div>
                <div className="profile-info">
                    <h2 className="profile-username">{user.name}</h2>
                    <div className="profile-userid">{user.username}</div>
                    <div className="profile-joined">Joined {user.joinedDate}</div>
                    <div className="profile-country-flag">🇨🇳</div>
                </div>
            </div>
            <div className="profile-main-content">
                <div className="profile-stats-achievements">
                    <div className="profile-stats">
                        <h3>Statistics</h3>
                        <div className="profile-stat-row">
                            <div className="profile-stat-box">
                                <span className="profile-stat-value">{user.dayStreak}</span>
                                <span className="profile-stat-label">Day streak</span>
                            </div>
                            <div className="profile-stat-box">
                                <span className="profile-stat-value">{user.point}</span>
                                <span className="profile-stat-label">Total XP</span>
                            </div>
                        </div>
                        <div className="profile-stat-row">
                            <div className="profile-stat-box">
                                <span className="profile-stat-value">{user.highestDayStreak}</span>
                                <span className="profile-stat-label">Highest streak</span>
                            </div>
                            <div className="profile-stat-box">
                                <span className="profile-stat-value">0</span>
                                <span className="profile-stat-label">Top 3 finishes</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-achievements">
                        <h3>Achievements <a href="#" className="profile-view-all">VIEW ALL</a></h3>
                        <div className="profile-achievement-list styled-achievement-list">
                            {achievements.map(a => (
                                <div className="styled-achievement-item" key={a.id} style={{ borderColor: a.color || '#333' }}>
                                    <div className="styled-achievement-icon" style={{ background: a.color || '#333' }}>
                                        <span>{a.icon || '🏆'}</span>
                                        <div className="styled-achievement-level">LEVEL {a.level || 1}</div>
                                    </div>
                                    <div className="styled-achievement-content">
                                        <div className="styled-achievement-header">
                                            <span className="styled-achievement-title">{a.name}</span>
                                            {a.progress !== undefined && a.goal !== undefined && (
                                                <span className="styled-achievement-progress-label">{a.progress}/{a.goal}</span>
                                            )}
                                        </div>
                                        <div className="styled-achievement-bar-bg">
                                            <div className="styled-achievement-bar" style={{ width: a.progress && a.goal ? `${Math.min(100, Math.round((a.progress / a.goal) * 100))}%` : '0%', background: a.color || '#FFD966' }}></div>
                                        </div>
                                        <div className="styled-achievement-desc">{a.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="profile-social-addfriends">
                    <div className="profile-follow-section">
                        <div className="profile-follow-tabs">
                            <span className="profile-follow-tab active">FOLLOWING</span>
                            <span className="profile-follow-tab">FOLLOWERS</span>
                        </div>
                        <div className="profile-follow-info">
                            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/empty-followers.svg" alt="Followers" className="profile-follow-img" />
                            <div className="profile-follow-desc">Learning is more fun and effective when you connect with others.</div>
                        </div>
                    </div>
                    <div className="profile-add-friends">
                        <h4>Add friends</h4>
                        <button className="profile-find-friends-btn">Find friends</button>
                        <button className="profile-invite-friends-btn">Invite friends</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Add styles for styled-achievement-list and styled-achievement-item in ProfilePage.css:
/*
.styled-achievement-list {
    background: #19212a;
    border-radius: 16px;
    border: 2px solid #222c36;
    padding: 16px 0;
    margin-top: 8px;
}
.styled-achievement-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #222c36;
    padding: 16px 0;
    border-left: 8px solid #333;
    background: #222c36;
    border-radius: 12px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.styled-achievement-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
}
.styled-achievement-icon {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    color: #fff;
    margin-right: 20px;
    position: relative;
}
.styled-achievement-level {
    font-size: 0.85rem;
    font-weight: bold;
    margin-top: 4px;
    color: #fff;
    background: rgba(0,0,0,0.15);
    border-radius: 6px;
    padding: 2px 8px;
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
}
.styled-achievement-content {
    flex: 1;
}
.styled-achievement-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1rem;
    font-weight: bold;
    color: #fff;
}
.styled-achievement-title {
    font-size: 1.1rem;
    font-weight: bold;
}
.styled-achievement-progress-label {
    font-size: 1rem;
    color: #aaa;
    margin-left: 12px;
}
.styled-achievement-bar-bg {
    width: 100%;
    height: 10px;
    background: #2c3642;
    border-radius: 6px;
    margin: 8px 0 4px 0;
    overflow: hidden;
}
.styled-achievement-bar {
    height: 100%;
    border-radius: 6px;
    background: #FFD966;
    transition: width 0.4s;
}
.styled-achievement-desc {
    color: #b0b8c1;
    font-size: 1rem;
    margin-top: 2px;
}
*/