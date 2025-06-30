import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import './NavigationBar.css';

export default function NavigationBar() {
    const { user } = useAuth();
    const location = useLocation();
    console.log(location.pathname);

    const menuItems = [
        { name: 'LEARN', icon: 'house', path: '/learn' },
        { name: 'SUBJECT', icon: 'book', path: '/subject' },
        { name: 'COMMENT', icon: 'comment', path: '/comment' },
        { name: 'PROFILE', icon: 'user', path: '/profile' },
        { name: 'LOGIN-REGISTER', icon: 'right-to-bracket', path: '/login-register' },
    ];

    return (
        <>
            <div className='navigation-bar-container'>
                <Link to='/'>
                    <div className='logo'>Smath</div>
                </Link>
                <div className='items'>
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {((item.path !== '/profile' && item.path !== '/login-register') || (item.path === '/profile' && user) || (item.path === '/login-register' && !user)) &&
                                <div className={`item ${location.pathname == item.path ? 'located' : ''}`}>
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
