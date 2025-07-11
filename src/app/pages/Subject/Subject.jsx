import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
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
                const subjectData = await fetchData('api/subject', token);
                console.log('subjectData', subjectData);
                setSUBJECTs(subjectData);

                const boughtSubjectData = await fetchData(`api/boughtsubject/user/${user.id}`, token);
                console.log('boughtSubjectData', boughtSubjectData);
                setBOUGHTSUBJECTs(boughtSubjectData);

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
    console.log('BoughtSubjectInformation', BoughtSubjectInformation);


    const handleNavigate = (SubjectId) => {
        localStorage.setItem('SubjectId', SubjectId);
        navigate('/learn');
    }

    return (
        <div className='subject-container learn-container'>
            {BoughtSubjectInformation?.length > 0 ?
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
                : <p><i>You didn't buy any subject</i></p>
            }
            {SUBJECTs?.length > 0 ?
                <div className='subjects buy-subject'>
                    <div className='heading'>LET'S START LEARNING A NEW SUBJECT!</div>
                    <div className='row'>
                        {SUBJECTs.map((subject, i) => (
                            <div to='./detail' key={i} className='col'>
                                <div className='card'>
                                    <Link>
                                        <img src={subject.image} alt={subject.name} />
                                        <div className='name'>{subject.name}</div>
                                        <div className='price'>{subject.price.toLocaleString('vi-VN')} VND</div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                : <p><i>No subjects available</i></p>
            }
        </div >
    )
}
