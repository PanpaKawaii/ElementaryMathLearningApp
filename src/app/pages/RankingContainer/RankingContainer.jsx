import DailyDetail from '../DailyDetail/DailyDetail';
import Ranking from './Ranking/Ranking';

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
