import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI.js';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../../layouts/Loading/Loading.jsx';
import BuySubject from './BuySubject/BuySubject.jsx';
import Feedback from './Feedback/Feedback.jsx';
import './SubjectDetail.css';

export default function SubjectDetail() {
    const { user } = useAuth();
    const Params = useParams();

    const SubjectId = Params.subject;
    console.log('SubjectId', SubjectId);

    const [USERs, setUSERs] = useState([]);
    const [SUBJECT, setSUBJECT] = useState(null);
    const [BOUGHTSUBJECTs, setBOUGHTSUBJECTs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                setLoading(true);
                const userData = await fetchData('listuser', token);
                setUSERs(userData);

                const boughtSubjectsData = await fetchData('api/boughtsubject', token);
                console.log('boughtSubjectsData', boughtSubjectsData);

                setBOUGHTSUBJECTs(boughtSubjectsData);

                const subjectData = await fetchData(`api/subject/${SubjectId}`, token);
                const related = boughtSubjectsData.filter(b => b.subjectId == subjectData.id);
                const boughtCount = related.length;
                const rated = related.filter(b => b.rating > 0);
                const avg = rated.length === 0 ? 0 : parseFloat((rated.reduce((sum, b) => sum + b.rating, 0) / rated.length).toFixed(1));

                const ratedSubjects = {
                    ...subjectData,
                    rating: avg,
                    boughtCount: boughtCount,
                };

                setSUBJECT(ratedSubjects);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    const FeedbackComment = BOUGHTSUBJECTs
        .filter(fb => fb.subjectId == SubjectId && fb.rating != 0)
        .map(fb => {
            const user = USERs.find(u => u.id == fb.userId);
            return {
                ...fb,
                user: user || null,
            };
        })
        .sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));

    if (loading) return <Loading Size={'Large'} />
    return (
        <div className='subjectdetail-container learn-container'>
            <div className='container-2'>
                <div>
                    <img src={SUBJECT?.image} alt={SUBJECT?.name} />
                </div>
                <div>
                    <div className='name'>{SUBJECT?.name}</div>
                    <div className='price'>
                        <div>{SUBJECT?.price?.toLocaleString('vi-VN')} VND</div>
                        {BOUGHTSUBJECTs.find(b => b.subjectId == SUBJECT?.id) && <div className='bought'>Bought</div>}
                    </div>
                    <div className='rating-boughtcount'>
                        <div className='rating'><div>{SUBJECT?.rating}</div><i className='fa-solid fa-star'></i></div>
                        <div className='boughtcount'>Sold: {SUBJECT?.boughtCount}</div>
                    </div>
                    <div className='upload'>Uploaded: {SUBJECT?.uploadDate}</div>

                    <BuySubject SubjectId={SubjectId} USERs={USERs} />
                </div>
            </div>

            <Feedback FeedbackComment={FeedbackComment} />
        </div>
    )
}
