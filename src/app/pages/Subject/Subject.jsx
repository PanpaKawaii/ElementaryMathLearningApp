import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Subject.css';

export default function Subject() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        localStorage.setItem('SubjectId', 1);/////////////////////////////////////////////////////////////////////////////////////////////
        navigate('/learn');
    }

    return (
        <div className='subject-container learn-container'>
            <div className='subjects my-subject'>
                <div className='heading'>MY SUBJECTS</div>
                <div className='row'>
                    <div className='col' onClick={() => handleNavigate()}></div>
                </div>
            </div>
            <div className='subjects buy-subject'>
                <div className='heading'>LET'S LEARN A NEW SUBJECT!</div>
                <div className='row'>
                    <div className='col'></div>
                </div>
            </div>
        </div>
    )
}
