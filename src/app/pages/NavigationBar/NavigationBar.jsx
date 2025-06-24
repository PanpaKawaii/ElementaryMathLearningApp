import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './NavigationBar.css';

export default function NavigationBar() {

    const location = useLocation();
    console.log(location.pathname);

    const menuItems = [
        { name: 'LEARN', icon: 'house', path: '/learn' },
        { name: 'SUBJECT', icon: '', path: '/subject' },
        { name: 'COMMENT', icon: '', path: '/comment' },
        { name: 'PROFILE', icon: '', path: '/profile' },
    ];

    return (
        <>
            <div className='navigation-bar-container'>
                <Link to='/'>
                    <div className='logo'>Smath</div>
                </Link>
                <div className='items'>
                    {menuItems.map((item, index) => (
                        <div key={index} className={`item ${location.pathname == item.path ? 'located' : ''}`}>
                            <Link to={`${item.path}`}>
                                <i className={`fa-solid fa-${item.icon}`}></i>
                                <span>{item.name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Outlet />
        </>
    )
}
