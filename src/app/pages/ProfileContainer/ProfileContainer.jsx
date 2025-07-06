import React from 'react';
import './ProfileContainer.css';
import Profile from './Profile/Profile';
import DailyDetail from '../DailyDetail/DailyDetail';

export default function ProfileContainer() {
    return (
        <div className='learn-container'>
            <div className='container-2'>
                <Profile />
                <DailyDetail />
            </div>
        </div>
    )
}
