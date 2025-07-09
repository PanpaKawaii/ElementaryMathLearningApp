import DailyDetail from '../DailyDetail/DailyDetail.jsx';
import './LearnContainer.css';
import Progress from './Progress/Progress.jsx';

export default function LearnContainer() {
    return (
        <div className='learn-container'>
            <div className='container-2'>
                <Progress />
                <DailyDetail />
            </div>
        </div>
    )
}
