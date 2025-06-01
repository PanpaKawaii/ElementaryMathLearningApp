import React from 'react';
import './LearnContainer.css';
import Progress from './Progress/Progress';
import DailyDetail from '../DailyDetail/DailyDetail';

export default function LearnContainer() {
    return (
        <div className='learn-container'>
            <div className='container-2'>
                <Progress />
                <DailyDetail />
            </div>
        </div>
    )
}
