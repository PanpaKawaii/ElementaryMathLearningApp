import './Crown.css';

export default function Crown() {
    return (
        <>
            <div className='scene-crown'>
                <div className='crown'>
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}
                            className='face'
                            style={{
                                transform: `rotateY(${360 / 12 * (index + 1)}deg) translateZ(${185.7}px)`,
                            }}
                        >
                            <svg width='100' height='140' viewBox='0 0 100 100'>
                                <polygon
                                    points='50,30 70,60 50,90 30,60'
                                    fill='red'
                                    stroke='black'
                                    strokeWidth='2'
                                />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
