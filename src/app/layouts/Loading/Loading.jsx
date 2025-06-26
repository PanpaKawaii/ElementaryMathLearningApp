import React from 'react';
import './Loading.css';

export default function Loading() {
    return (
        <div className='loadingcircle-container'>
            <div className='arrow-container'>
                <div className='arrow'></div>
                <div className='white'></div>
            </div>
        </div>
    )
}
