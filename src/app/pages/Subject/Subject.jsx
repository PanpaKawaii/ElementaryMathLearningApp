import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../layouts/Loading/Loading.jsx';
import './Subject.css';

export default function Subject() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [SUBJECTs, setSUBJECTs] = useState([]);
    const [BOUGHTSUBJECTs, setBOUGHTSUBJECTs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const boughtSubjectData = await fetchData(`api/boughtsubject/user/${user?.id}`, token);
                setBOUGHTSUBJECTs(boughtSubjectData);

                const boughtSubjectsData = await fetchData('api/boughtsubject', token);
                const subjectData = await fetchData('api/subject', token);

                const ratedSubjects = subjectData.map(subject => {
                    const related = boughtSubjectsData.filter(b => b.subjectId == subject.id);
                    const boughtCount = related.length;
                    const rated = related.filter(b => b.rating > 0);
                    const avg = rated.length === 0 ? 0 : parseFloat((rated.reduce((sum, b) => sum + b.rating, 0) / rated.length).toFixed(1));

                    return {
                        ...subject,
                        rating: avg,
                        boughtCount: boughtCount,
                    };
                });

                setSUBJECTs(ratedSubjects);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    const BoughtSubjectInformation = BOUGHTSUBJECTs.map(bought => {
        const subject = SUBJECTs.find(sub => sub.id === bought.subjectId);
        return {
            ...bought,
            subjectInfo: subject || {}
        };
    });

    const handleNavigate = (SubjectId) => {
        localStorage.setItem('SubjectId', SubjectId);
        navigate('/learn');
    }

    if (loading) return <Loading Size={'Large'} />
    return (
        <div className='subject-container learn-container'>
            {BoughtSubjectInformation?.length > 0 &&
                <div className='subjects my-subject'>
                    <div className='heading'>MY SUBJECTS</div>
                    <div className='row'>
                        {BoughtSubjectInformation.map((subject, i) => (
                            <div key={i} className='col' onClick={() => handleNavigate(subject.subjectId)}>
                                <div className='card'>
                                    <img src={subject.subjectInfo.image} alt={subject.subjectInfo.name} />
                                    <div className='name'>{subject.subjectInfo.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {SUBJECTs?.length > 0 ?
                <div className='subjects buy-subject'>
                    <div className='heading'>LET'S START LEARNING A NEW SUBJECT!</div>
                    <div className='row'>
                        {SUBJECTs.map((subject, i) => (
                            <div to='./detail' key={i} className='col'>
                                <Link to={`./${subject.id}`} className='card'>
                                    <img src={subject.image} alt={subject.name} />
                                    <div className='name'>{subject.name}</div>
                                    <div className='price'>
                                        <div>{subject.price?.toLocaleString('vi-VN')} VND</div>
                                        {BOUGHTSUBJECTs.find(b => b.subjectId == subject.id) && <div className='bought'>Bought</div>}
                                    </div>
                                    <div className='badge boughtcount'>Sold: {subject.boughtCount}</div>
                                    <div className='badge rating'><div>{subject.rating}</div><i className='fa-solid fa-star'></i></div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                : <p><i>No subjects available</i></p>
            }
        </div >
    )
}
