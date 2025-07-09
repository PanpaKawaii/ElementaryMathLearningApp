import DailyDetail from '../DailyDetail/DailyDetail.jsx';
import Ranking from './Ranking/Ranking.jsx';

export default function RankingContainer() {
    return (
        <div className='learn-container'>
            <div className='container-2'>
                <Ranking />
                <DailyDetail />
            </div>
        </div>
    )
}
