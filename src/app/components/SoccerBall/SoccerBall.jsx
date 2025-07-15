import { useState } from 'react';
import './SoccerBall.css';

export default function SoccerBall() {
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

    const handleChange = (axis, value) => {
        setRotation(prev => ({ ...prev, [axis]: parseInt(value) }));
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const moveTriangle5 = (p) => {
        const triangle = document.getElementsByClassName(`p5-${p + 1}`);
        for (let i = 0; i < triangle.length; i++) {
            triangle[i].style.transition = 'all 0.5s ease';
            triangle[i].style.transform = `translateY(${5.136}px) rotateZ(${i % 5 * 72}deg) translateY(${-5.136}px) translateY(40px)`;
            // triangle[i].style.clipPath = 'polygon(35% 70%, 65% 70%, 100% 100%, 0% 100%)';
        }
        // const signin = document.getElementById('card-login');
        // signin.classList.remove('card-appear');
        // signin.classList.add('card-disappear');
        // const signup = document.getElementById('card-register');
        // signup.classList.remove('card-disappear');
        // signup.classList.add('card-appear');
    };

    const returnTriangle5 = async (p) => {
        await sleep(500);
        const triangle = document.getElementsByClassName(`p5-${p + 1}`);
        for (let i = 0; i < triangle.length; i++) {
            triangle[i].style.transition = 'all 2s ease';
            triangle[i].style.transform = `translateY(${5.136}px) rotateZ(${i % 5 * 72}deg) translateY(${-5.136}px) translateY(0)`;
            // triangle[i].style.clipPath = 'polygon(50% 55.4%, 100% 100%, 0% 100%)';
        }
    };

    const moveTriangle6 = (p) => {
        const triangle = document.getElementsByClassName(`p6-${p + 1}`);
        for (let i = 0; i < triangle.length; i++) {
            triangle[i].style.transition = 'all 0.5s ease';
            triangle[i].style.transform = `rotateZ(${i % 6 * 60}deg) translateY(${-9.517}px) translateY(40px)`;
        }
    };

    const returnTriangle6 = async (p) => {
        const triangle = document.getElementsByClassName(`p6-${p + 1}`);
        await sleep(500);
        for (let i = 0; i < triangle.length; i++) {
            triangle[i].style.transition = 'all 2s ease';
            triangle[i].style.transform = `rotateZ(${i % 6 * 60}deg) translateY(${-9.517}px)`;
        }
    };

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
                                // background: `#333`,
                                transform: `
                                rotateZ(${index5 === 6 ? 180 : index5 * 72}deg)
                                rotateX(${(index5 !== 0 && index5 !== 6) ? (index5 < 6 ? Angle : 180 + Angle) : 0}deg)
                                rotateY(${index5 === 0 ? 0 : 180}deg)
                                translateY(${SubDistance}px)
                                translateZ(${Distance}px)
                                `,
                            }}
                            onMouseEnter={() => moveTriangle5(index5)}
                            onMouseLeave={() => returnTriangle5(index5)}
                        >
                            {/* Face{index5 + 1} */}
                            {[...Array(5)].map((_, index3) => (
                                <div
                                    key={index3}
                                    className={`triangle f${index3 + 1} p5-${index5 + 1}`}
                                    style={{
                                        background: `#333`,
                                        transform: `translateY(${5.136}px) rotateZ(${index3 % 5 * 72}deg) translateY(${-5}px)`,
                                    }}
                                >
                                    {/* Face{index3 + 1} */}
                                </div>
                            ))}
                        </div>
                    ))}
                    {[...Array(20)].map((_, index6) => (
                        <div
                            key={index6}
                            className={`face face-white f${index6 + 13}`}
                            style={{
                                // background: `#ccc`,
                                transform: `
                                rotateZ(${(index6 % 5) * 72 + 36}deg)
                                rotateX(${index6 < 10 ? (index6 < 5 ? AngleWhite1 : AngleWhite1 + 180) : (index6 < 15 ? AngleWhite1 + AngleWhite2 : AngleWhite1 + AngleWhite2 + 180)}deg)
                                rotateY(${index6 < 10 ? 0 : 180}deg)
                                translateZ(${DistanceWhite}px)
                                `,
                            }}
                            onMouseEnter={() => moveTriangle6(index6)}
                            onMouseLeave={() => returnTriangle6(index6)}
                        >
                            {/* Face{index6 + 13} */}
                            {[...Array(6)].map((_, index3) => (
                                <div
                                    key={index3}
                                    className={`triangle f${index3 + 1} p6-${index6 + 1}`}
                                    style={{
                                        background: `#ccc`,
                                        transform: `rotateZ(${index3 % 6 * 60}deg) translateY(${-9.517}px)`,
                                    }}
                                >
                                    {/* Face{index3 + 1} */}
                                </div>
                            ))}
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
