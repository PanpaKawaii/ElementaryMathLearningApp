import React from 'react';
import { SubjectSample } from '../../../mocks/subject_sample.js';
import './DailyDetail.css';

export default function DailyDetail() {
    return (
        <div className='dailydetail-container'>
            <h1>{SubjectSample.subjectName}</h1>

            <div>
                <div><i className='fa-solid fa-fire'></i>856</div>
                <div><i className='fa-solid fa-lightbulb'></i>5620</div>
                <div><i className='fa-solid fa-trophy'></i>43</div>
            </div>

            <section>
                <div className='title'>Friends Rank</div>
                <div className='detail'>
                    <div>Medal Image</div>
                    <div className='text'>You're ranked #1 among your friends</div>
                </div>
            </section>
            <section>
                <div className='title'>Daily Quests</div>
                <div className='quests'>
                    <div className='detail'>
                        <div>Medal Image</div>
                        <div className='text'>You're ranked #1 among your friends</div>
                    </div>
                    <div className='detail'>
                        <div>Medal Image</div>
                        <div className='text'>You're ranked #1 among your friends</div>
                    </div>
                    <div className='detail'>
                        <div>Medal Image</div>
                        <div className='text'>You're ranked #1 among your friends</div>
                    </div>
                </div>
            </section>
        </div>
    )
}
