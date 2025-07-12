import { useState } from 'react';
import './SimpleButton.css';

export default function Button(props) {

    const [IsClicked, setIsClicked] = useState(false);
    const handleChangeState = (state) => {
        setIsClicked(p => state);
    }

    let ButtonStyle = {
        width: `${props.width}`,
        height: `${props.height}`,
        borderRadius: `${props.radius}`,
        color: `${props.textcolor || '#888'}`,
        backgroundColor: `${props.bgcolor || '#eee'}`,
        boxShadow: `${(IsClicked || props.active) ? 'none' : '3px 3px 2px #00000040, -3px -3px 2px #ffffffbf'}`,
        // boxShadow: `${(IsClicked || props.active) ? 'inset 3px 3px 2px #00000040, inset -3px -3px 2px #ffffffbf' : '3px 3px 2px #00000040, -3px -3px 2px #ffffffbf'}`,
    };

    return (
        <>
            <div className='simple-button'>
                <div
                    id='GridCard'
                    className={`grid-card ${(IsClicked || props.active) && 'active'}`}
                    style={ButtonStyle}

                    onMouseDown={() => handleChangeState(true)}
                    onMouseUp={() => handleChangeState(false)}
                    onMouseLeave={() => handleChangeState(false)}
                    onClick={props.onToggle}
                >
                    {props.children}
                </div>
            </div>
        </>
    )
}
