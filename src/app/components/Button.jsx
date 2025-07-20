import React, { useEffect, useState } from 'react';
import './Button.css';

export default function Button(props) {

    const [IsClicked, setIsClicked] = useState(false);
    const handleChangeState = (state) => {
        setIsClicked(state);
        if (state) setShowIcon(p => p + 1);
    }

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
            boxShadow: `${(IsClicked || props.active) ? 'none' : `0px 8px 0px 0px hsl(42, 100%, 43%)`}`,
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
            boxShadow: `${(IsClicked || props.active) ? 'none' : `0px 8px 0px 0px hsl(0, 0%, 76%)`}`,
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
            boxShadow: `${(IsClicked || props.active) ? 'none' : `0px 8px 0px 0px hsl(0, 0%, 88%)`}`,
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
            boxShadow: `${(IsClicked || props.active) ? 'none' : `0px 8px 0px 0px hsl(0, 0%, 25%)`}`,
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
            boxShadow: `${(IsClicked || props.active) ? '0px 0px 0px 10px hsla(95, 100%, 40%, 0.4)' : `0px 8px 0px 0px hsl(134, 61%, 41%)`}`,
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
            boxShadow: `${(IsClicked || props.active) ? '0px 0px 0px 10px hsla(0, 100%, 50%, 0.4)' : `0px 8px 0px 0px hsl(0, 61%, 41%)`}`,
        };
    } else if (props.maincolor == 'edit') {
        ButtonStyle = {
            width: `${props.width}`,
            height: `${props.height}`,
            borderRadius: `${props.radius}`,
            border: `${props.border} solid hsl(39, 98%, 50%)`,
            color: `hsl(0, 0%, 100%)`,
            textShadow: `none`,
            backgroundColor: `hsl(39, 100%, 60%)`,
            boxShadow: `${(IsClicked || props.active) ? '0px 0px 0px 10px hsla(39, 100%, 50%, 0.4)' : `0px 8px 0px 0px hsl(39, 61%, 41%)`}`,
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
            boxShadow: `${(IsClicked || props.active) ? 'none' : `0px 8px 0px 0px hsl(${props.maincolor}, 83%, 76%)`}`,
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
    } else if (props.maincolor == 'edit') {
        ShadowStyle = {
            width: `${props.width}`,
            top: `${8 + parseInt(props.height.replace('px', '')) / 2}px`,
            backgroundColor: `hsl(39, 61%, 41%)`,
        };
    } else {
        ShadowStyle = {
            width: `${props.width}`,
            top: `${8 + parseInt(props.height.replace('px', '')) / 2}px`,
            backgroundColor: `hsl(${props.maincolor}, 83%, 76%)`,
        };
    }

    let IconStyle;
    if (props.maincolor == 'gold') {
        IconStyle = {
            color: `hsl(42, 100%, 43%)`,
            textShadow: `0px 0px 2px hsl(51, 100%, 40%)`,
        };
    } else if (props.maincolor == 'locked') {
        IconStyle = {
            color: `hsl(0, 0%, 70%)`,
            textShadow: `1px 1px 1px hsl(0, 0%, 40%)`,
        };
    } else if (props.maincolor == 'white') {
        IconStyle = {
            color: `hsl(0, 0%, 60%)`,
            textShadow: `1px 1px 1px hsl(0, 0%, 30%)`,
        };
    } else if (props.maincolor == 'black') {
        IconStyle = {
            color: `hsl(0, 0%, 10%)`,
            textShadow: `1px 1px 1px hsl(0, 0%, 40%)`,
        };
    } else if (props.maincolor == 'correct') {
        IconStyle = {
            color: `hsl(134, 61%, 41%)`,
            textShadow: `none`,
        };
    } else if (props.maincolor == 'incorrect') {
        IconStyle = {
            color: `hsl(0, 61%, 41%)`,
            textShadow: `none`,
        };
    } else if (props.maincolor == 'edit') {
        IconStyle = {
            color: `hsl(39, 61%, 41%)`,
            textShadow: `none`,
        };
    } else {
        IconStyle = {
            color: `hsl(${props.maincolor}, 97%, 70%)`,
            textShadow: `1px 1px 1px hsl(${props.maincolor}, 100%, 40%)`,
        };
    }

    // const MouseDown = () => {
    //     const btn = document.getElementById('GridCard');
    //     btn.style.backgroundColor = 'red';
    //     // btn.classList.add('active');
    // };

    // const MouseLeave = () => {
    //     const btn = document.getElementById('GridCard');
    //     btn.classList.remove('active');
    // };

    const [showIcon, setShowIcon] = useState(0);

    useEffect(() => {
        if (showIcon > 0) {
            const timer = setTimeout(() => {
                setShowIcon(0);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [showIcon]);

    const getIcons = (clickCount) => {
        const options = ['heart', 'star', 'moon'];
        const numIcons = clickCount % options.length;
        return Array.from({ length: 1 }, (_, i) => (
            <React.Fragment key={`${clickCount}-${i}`}>
                {clickCount != 0 &&
                    <div className='icon-animating-container'>
                        <i className={`fa-solid fa-${options[(clickCount + 1) % options.length]} animating animating-${i + 1}`} style={IconStyle}></i>
                        <i className={`fa-solid fa-${options[(clickCount + 2) % options.length]} animating animating-${i + 2}`} style={IconStyle}></i>
                        <i className={`fa-solid fa-${options[(clickCount + 3) % options.length]} animating animating-${i + 3}`} style={IconStyle}></i>
                        <i className={`fa-solid fa-${options[(clickCount + 4) % options.length]} animating animating-${i + 4}`} style={IconStyle}></i>
                        <i className={`fa-solid fa-${options[(clickCount + 5) % options.length]} animating animating-${i + 5}`} style={IconStyle}></i>
                        <i className={`fa-solid fa-${options[(clickCount + 6) % options.length]} animating animating-${i + 6}`} style={IconStyle}></i>
                        <i className={`fa-solid fa-${options[(clickCount + 7) % options.length]} animating animating-${i + 7}`} style={IconStyle}></i>
                        <i className={`fa-solid fa-${options[(clickCount + 8) % options.length]} animating animating-${i + 8}`} style={IconStyle}></i>
                    </div>
                }
            </React.Fragment>
        ));
    };

    return (
        <>
            <div className='special-button'>
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

                <div
                    className={`${(IsClicked || props.active) ? 'no-shadow' : 'shadow'}`}
                    style={ShadowStyle}
                ></div>

                {getIcons(showIcon)}
            </div>
        </>
    )
}
