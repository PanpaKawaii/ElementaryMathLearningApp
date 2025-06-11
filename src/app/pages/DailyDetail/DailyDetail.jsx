import React from 'react';
import { Subject } from '../../../mocks/DatabaseSample.js';
import './DailyDetail.css';

export default function DailyDetail() {
    return (
        <div className='dailydetail-container'>
            <h1>{Subject[0].Name}</h1>

            <div className='achievement'>
                <div><i className='fa-solid fa-fire'></i>856</div>
                <div><i className='fa-solid fa-lightbulb'></i>5620</div>
                <div><i className='fa-solid fa-star'></i>43</div>
            </div>

            <section>
                <div className='title'>Friends Rank</div>
                <div className='rank'>
                    <div
                        className={`number gold`}
                    >
                        #123
                    </div>
                    <div className='text'>You're ranked <b>#123</b> among your friends</div>
                </div>
            </section>

            <section>
                <div className='title'>Daily Quests</div>
                <div className='quests'>
                    <div className='detail'>
                        <i className='fa-solid fa-lightbulb'></i>
                        <div className='text'>
                            <div>Earn 300 points</div>
                            <div
                                className='progress'
                                style={{
                                    background: `linear-gradient(to right, #ffd700 ${140 * 100 / 300}%, #ddd ${140 * 100 / 300}%)`
                                }}
                            >
                                140/300
                            </div>
                        </div>
                    </div>
                    <div className='detail'>
                        <i className='fa-solid fa-bolt'></i>
                        <div className='text'>
                            <div>Finish 4 topics</div>
                            <div
                                className='progress'
                                style={{
                                    background: `linear-gradient(to right, #ffd700 ${2 * 100 / 4}%, #ddd ${2 * 100 / 4}%)`
                                }}
                            >
                                2/4
                            </div>
                        </div>
                    </div>
                    <div className='detail'>
                        <i className='fa-solid fa-star'></i>
                        <div className='text'>
                            <div>Finish 4 perfect topics</div>
                            <div
                                className='progress'
                                style={{
                                    background: `linear-gradient(to right, #ffd700 ${1 * 100 / 4}%, #ddd ${1 * 100 / 4}%)`
                                }}
                            >
                                1/4
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
