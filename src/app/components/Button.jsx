import React from 'react';
import './Button.css';

// export default function Button({ border, radius, active, onToggle, children }) {
export default function Button(props) {
    return (
        <>
            <div className='special-button'>
                <div
                    className={`grid-card ${props.active ? 'active' : ''}`}
                    style={{
                        width: `${props.width}`,
                        height: `${props.height}`,
                        borderRadius: `${props.radius}`,
                        border: `${props.border} solid #fec2d6`,
                    }}
                    // onMouseDown={props.onToggle}
                    // onMouseUp={() => setSelectedTopic(null)}
                    // onMouseLeave={() => setSelectedTopic(null)}
                    // onClick={() => setSelectedTopic(topic)}
                    onClick={props.onToggle}
                >
                    {props.children}
                </div>

                <div className={`${props.active ? 'no-shadow' : 'shadow'}`}></div>
            </div>
        </>
    )
}
