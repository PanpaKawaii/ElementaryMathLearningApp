import React, { useState } from 'react';
import './Button.css';

export default function Button({ active, onToggle, children }) {

    const [SelectedTopic, setSelectedTopic] = useState(null);

    return (
        <>
            <div className='topic'>
                <div
                    className={`grid-card ${active ? 'active' : ''}`}
                    // onMouseDown={() => setSelectedTopic(topic)}
                    // onMouseUp={() => setSelectedTopic(null)}
                    // onMouseLeave={() => setSelectedTopic(null)}
                    // onClick={() => setSelectedTopic(topic)}
                    onClick={onToggle}
                >
                    {children}
                </div>

                <div className={`${active ? 'no-shadow' : 'shadow'}`}></div>
            </div>
        </>
    )
}
