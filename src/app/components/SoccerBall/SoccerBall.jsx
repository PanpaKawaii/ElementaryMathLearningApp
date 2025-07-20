import { useState } from 'react';
import './SoccerBall.css';

export default function SoccerBall() {
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

    const handleChange = (axis, value) => {
        setRotation(prev => ({ ...prev, [axis]: parseInt(value) }));
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    // const Distance = 143.4;
    const Distance = 163.4;
    const SubDistance = -5.02;
    const Angle = -116.565;

    // const DistanceWhite = 139.2;
    const DistanceWhite = 159.2;
    const AngleWhite1 = 37.5;
    const AngleWhite2 = 42;

    return (
        <div className='ball-container'>
            <div className='scene-ball'>
                <div
                    className='ball'
                    style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)` }}
                >
                    {[...Array(12)].map((_, index5) => (
                        <div
                            key={index5}
                            className={`face f${index5 + 1}`}
                            style={{
                                background: `#333`,
                                transform: `
                                rotateZ(${index5 === 6 ? 180 : index5 * 72}deg)
                                rotateX(${(index5 !== 0 && index5 !== 6) ? (index5 < 6 ? Angle : 180 + Angle) : 0}deg)
                                rotateY(${index5 === 0 ? 0 : 180}deg)
                                translateY(${SubDistance}px)
                                translateZ(${Distance}px)
                                `,
                            }}
                        >
                            Face{index5 + 1}
                        </div>
                    ))}
                    {[...Array(20)].map((_, index6) => (
                        <div
                            key={index6}
                            className={`face face-white f${index6 + 13}`}
                            style={{
                                background: `#ccc`,
                                transform: `
                                rotateZ(${(index6 % 5) * 72 + 36}deg)
                                rotateX(${index6 < 10 ? (index6 < 5 ? AngleWhite1 : AngleWhite1 + 180) : (index6 < 15 ? AngleWhite1 + AngleWhite2 : AngleWhite1 + AngleWhite2 + 180)}deg)
                                rotateY(${index6 < 10 ? 0 : 180}deg)
                                translateZ(${DistanceWhite}px)
                                `,
                            }}
                        >
                            Face{index6 + 13}
                        </div>
                    ))}
                    {/* <div className='line line-x'>X</div>
                    <div className='line line-x x-2'>X</div>
                    <div className='line line-y'>Y</div>
                    <div className='line line-y y-2'>Y</div>
                    <div className='line line-z'>Z</div>
                    <div className='line line-z z-2'>Z</div> */}
                </div>
            </div>
            {/* <form className='rotation-form'>
                {['x', 'y', 'z'].map(axis => (
                    <div key={axis} className='slider-group'>
                        <label htmlFor={axis}>{axis.toUpperCase()}: {rotation[axis]}°</label>
                        <input
                            type='range'
                            id={axis}
                            name={axis}
                            min='0'
                            max='360'
                            value={rotation[axis]}
                            onChange={(e) => handleChange(axis, e.target.value)}
                        />
                    </div>
                ))}
            </form> */}
        </div>
    )
}
