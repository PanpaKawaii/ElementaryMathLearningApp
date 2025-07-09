import './Loading.css';

export default function Loading({ Size }) {
    return (
        <div className='loadingcircle-container'
            style={{
                width:
                    Size === 'Large' ? '100%'
                        : (Size === 'Average' ? '600px'
                            : 'fit-content')
            }}>
            <div className='container'>
                <div className='arrow'></div>
                <div className='white'></div>
            </div>
        </div>
    )
}
