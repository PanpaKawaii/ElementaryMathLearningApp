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
        { name: 'GAME', icon: 'futbol', path: '/game', role: 'Guest Student' },
        { name: 'RANK', icon: 'star', path: '/ranking', role: 'Student' },
        { name: 'PROFILE', icon: 'user', path: '/profile/' + user?.id, role: 'Student Parent Admin' },
        { name: 'LOGIN-REGISTER', icon: 'right-to-bracket', path: '/login-register', role: 'Guest' },
        { name: 'SUBJECT', icon: 'book', path: '/management-subject/subject', role: 'Admin' },
        { name: 'USER', icon: 'id-card', path: '/management-user/user', role: 'Admin' },
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
                                <div className={`item ${location.pathname.split('/')[1] == item.path.split('/')[1] ? 'located' : ''}`}>
                                    <Link to={`${item.path}`} className={`${item.path.includes('management') ? 'management' : ''}`}>
                                        <i className={`fa-solid fa-${item.icon}`}></i>
                                        <span>{item.name}</span>
                                        {item.path.includes('management') && <i className='fa-solid fa-gear'></i>}
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
