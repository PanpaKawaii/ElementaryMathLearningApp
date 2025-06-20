import React from 'react';
import './Button.css';

// export default function Button({ border, radius, active, onToggle, children }) {
export default function Button(props) {

    let ButtonStyle;
    if (props.maincolor == 'gold') {
        ButtonStyle = {
            width: `${props.width}`,
            height: `${props.height}`,
            borderRadius: `${props.radius}`,
            border: `${props.border} solid hsl(47, 100%, 50%)`,
            color: `hsl(42, 100%, 43%)`,
            textShadow: `0px 0px 2px hsl(51, 100%, 40%)`,
            backgroundColor: `hsl(52, 100%, 58%)`,
            boxShadow: `${props.active ? 'none' : `0px 8px 0px 0px hsl(42, 100%, 43%)`}`,
        };
    } else if (props.maincolor == 'locked') {
        ButtonStyle = {
            width: `${props.width}`,
            height: `${props.height}`,
            borderRadius: `${props.radius}`,
            border: `${props.border} solid hsl(0, 0%, 84%)`,
            color: `hsl(0, 0%, 70%)`,
            textShadow: `1px 1px 1px hsl(0, 0%, 40%)`,
            backgroundColor: `hsl(0, 0%, 89%)`,
            boxShadow: `${props.active ? 'none' : `0px 8px 0px 0px hsl(0, 0%, 76%)`}`,
        };
    } else if (props.maincolor == 'white') {
        ButtonStyle = {
            width: `${props.width}`,
            height: `${props.height}`,
            borderRadius: `${props.radius}`,
            border: `${props.border} solid hsl(0, 0%, 94%)`,
            color: `hsl(0, 0%, 60%)`,
            textShadow: `1px 1px 1px hsl(0, 0%, 30%)`,
            backgroundColor: `hsl(0, 0%, 99%)`,
            boxShadow: `${props.active ? 'none' : `0px 8px 0px 0px hsl(0, 0%, 88%)`}`,
        };
    } else if (props.maincolor == 'black') {
        ButtonStyle = {
            width: `${props.width}`,
            height: `${props.height}`,
            borderRadius: `${props.radius}`,
            border: `${props.border} solid hsl(0, 0%, 35%)`,
            color: `hsl(0, 0%, 10%)`,
            textShadow: `1px 1px 1px hsl(0, 0%, 40%)`,
            backgroundColor: `hsl(0, 0%, 45%)`,
            boxShadow: `${props.active ? 'none' : `0px 8px 0px 0px hsl(0, 0%, 25%)`}`,
        };
    } else if (props.maincolor == 'correct') {
        ButtonStyle = {
            width: `${props.width}`,
            height: `${props.height}`,
            borderRadius: `${props.radius}`,
            border: `${props.border} solid hsl(94, 98%, 40%)`,
            color: `hsl(0, 0%, 100%)`,
            textShadow: `none`,
            backgroundColor: `hsl(95, 100%, 42%)`,
            boxShadow: `${props.active ? '0px 0px 0px 10px hsla(95, 100%, 40%, 0.4)' : `0px 8px 0px 0px hsl(134, 61%, 41%)`}`,
        };
    } else if (props.maincolor == 'incorrect') {
        ButtonStyle = {
            width: `${props.width}`,
            height: `${props.height}`,
            borderRadius: `${props.radius}`,
            border: `${props.border} solid hsl(0, 98%, 50%)`,
            color: `hsl(0, 0%, 100%)`,
            textShadow: `none`,
            backgroundColor: `hsl(0, 100%, 60%)`,
            boxShadow: `${props.active ? '0px 0px 0px 10px hsla(0, 100%, 50%, 0.4)' : `0px 8px 0px 0px hsl(0, 61%, 41%)`}`,
        };
    } else {
        ButtonStyle = {
            width: `${props.width}`,
            height: `${props.height}`,
            borderRadius: `${props.radius}`,
            border: `${props.border} solid hsl(${props.maincolor}, 92%, 84%)`,
            color: `hsl(${props.maincolor}, 97%, 70%)`,
            textShadow: `1px 1px 1px hsl(${props.maincolor}, 100%, 40%)`,
            backgroundColor: `hsl(${props.maincolor}, 84%, 89%)`,
            boxShadow: `${props.active ? 'none' : `0px 8px 0px 0px hsl(${props.maincolor}, 83%, 76%)`}`,
        };
    }

    let ShadowStyle;
    if (props.maincolor == 'gold') {
        ShadowStyle = {
            width: `${props.width}`,
            top: `${8 + parseInt(props.height.replace('px', '')) / 2}px`,
            backgroundColor: `hsl(42, 100%, 43%)`,
        };
    } else if (props.maincolor == 'locked') {
        ShadowStyle = {
            width: `${props.width}`,
            top: `${8 + parseInt(props.height.replace('px', '')) / 2}px`,
            backgroundColor: `hsl(0, 0%, 76%)`,
        };
    } else if (props.maincolor == 'white') {
        ShadowStyle = {
            width: `${props.width}`,
            top: `${8 + parseInt(props.height.replace('px', '')) / 2}px`,
            backgroundColor: `hsl(0, 0%, 88%)`,
        };
    } else if (props.maincolor == 'black') {
        ShadowStyle = {
            width: `${props.width}`,
            top: `${8 + parseInt(props.height.replace('px', '')) / 2}px`,
            backgroundColor: `hsl(0, 0%, 25%)`,
        };
    } else if (props.maincolor == 'correct') {
        ShadowStyle = {
            width: `${props.width}`,
            top: `${8 + parseInt(props.height.replace('px', '')) / 2}px`,
            backgroundColor: `hsl(134, 61%, 41%)`,
        };
    } else if (props.maincolor == 'incorrect') {
        ShadowStyle = {
            width: `${props.width}`,
            top: `${8 + parseInt(props.height.replace('px', '')) / 2}px`,
            backgroundColor: `hsl(0, 61%, 41%)`,
        };
    } else {
        ShadowStyle = {
            width: `${props.width}`,
            top: `${8 + parseInt(props.height.replace('px', '')) / 2}px`,
            backgroundColor: `hsl(${props.maincolor}, 83%, 76%)`,
        };
    }

    return (
        <>
            <div className='special-button'>
                <div
                    className={`grid-card ${props.active ? 'active' : ''}`}
                    style={ButtonStyle}
                    // style={{
                    //     width: `${props.width}`,
                    //     height: `${props.height}`,
                    //     borderRadius: `${props.radius}`,
                    //     border: `${props.border} solid hsl(${props.maincolor}, 92%, 84%)`,
                    //     color: `hsl(${props.maincolor}, 97%, 70%)`,
                    //     textShadow: `1px 1px 1px hsl(${props.maincolor}, 100%, 40%)`,
                    //     backgroundColor: `hsl(${props.maincolor}, 84%, 89%)`,
                    //     boxShadow: `${props.active ? 'none' : `0px 8px 0px 0px hsl(${props.maincolor}, 83%, 76%)`}`,
                    // }}

                    // onMouseDown={props.onToggle}
                    // onMouseUp={() => setSelectedTopic(null)}
                    // onMouseLeave={() => setSelectedTopic(null)}
                    // onClick={() => setSelectedTopic(topic)}
                    onClick={props.onToggle}
                >
                    {props.children}
                </div>

                <div
                    className={`${(props.active || !props.radius.includes('%')) ? 'no-shadow' : 'shadow'}`}
                    style={ShadowStyle}
                ></div>
            </div>
        </>
    )
}
