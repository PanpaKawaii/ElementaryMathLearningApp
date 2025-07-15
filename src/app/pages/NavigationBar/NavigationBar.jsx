import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import './NavigationBar.css';

export default function NavigationBar() {
    const { user } = useAuth();
    const location = useLocation();
    console.log('NavigationBar', location.pathname);

    const menuItems = [
        { name: 'LEARN', icon: 'house', path: '/learn', role: 'Student' },
        { name: 'SUBJECT', icon: 'book', path: '/subject', role: 'Guest Student Parent' },
        { name: 'RANK', icon: 'star', path: '/ranking', role: 'Student' },
        { name: 'PROFILE', icon: 'user', path: '/profile', role: 'Student Parent Admin' },
        { name: 'LOGIN-REGISTER', icon: 'right-to-bracket', path: '/login-register', role: 'Guest' },
        { name: 'MANAGEMENT', icon: 'book', path: '/management/subject', role: 'Admin' },
    ];

    return (
        <>
            <div className={`navigation-bar-container ${user?.role == 'Admin' ? 'simple-navigation-bar-container' : ''}`}>
                <Link to='/'>
                    <div className='logo'>Smath</div>
                </Link>
                <div className='items'>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {
                                // (
                                // (item.path !== '/profile' && item.path !== '/login-register' && item.path !== '/comment' && item.path !== '/ranking') ||
                                // (item.path === '/profile' && user) ||
                                // (item.path === '/ranking' && user) ||
                                // (item.path === '/login-register' && !user)
                                // (item.role.includes(user?.role) || (!user && item.role.includes('Guest')))
                                // )
                                // &&
                                <div className={`item ${location.pathname.split('/')[1].includes(item.path.split('/')[1]) ? 'located' : ''}`}>
                                    <Link to={`${item.path}`}>
                                        <i className={`fa-solid fa-${item.icon}`}></i>
                                        <span>{item.name}</span>
                                    </Link>
                                </div>
                            }
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <Outlet />
        </>
    )
}
