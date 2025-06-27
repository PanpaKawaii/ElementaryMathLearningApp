import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../../../mocks/CallingAPI.js'
import './Subject.css';

export default function Subject() {
    const navigate = useNavigate();

    const [SUBJECTs, setSUBJECTs] = useState([]);
    const [BOUGHTSUBJECTs, setBOUGHTSUBJECTs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const UserId = 1;
        const fetchDataAPI = async () => {
            try {
                const subjectData = await fetchData('api/subject', token);
                console.log('subjectData', subjectData);
                setSUBJECTs(subjectData);

                const boughtSubjectData = await fetchData(`api/boughtsubject/user/${UserId}`, token);
                console.log('boughtSubjectData', boughtSubjectData);
                setBOUGHTSUBJECTs(boughtSubjectData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAPI();
        // }, [user]);
    }, []);

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

    return (
        <div className='subject-container learn-container'>
            <div className='subjects my-subject'>
                <div className='heading'>MY SUBJECTS</div>
                <div className='row'>
                    {BoughtSubjectInformation.map((subject, i) => (
                        <div key={i} className='col' onClick={() => handleNavigate(subject.subjectId)}>
                            <div className='card'>
                                <div className='img'></div>
                                {/* <div>subjectId: {subject.subjectId}</div> */}
                                <div className='name'>{subject.subjectInfo.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='subjects buy-subject'>
                <div className='heading'>LET'S START LEARNING A NEW SUBJECT!</div>
                <div className='row'>
                    {SUBJECTs.map((subject, i) => (
                        <div to='./detail' key={i} className='col'>
                            <div className='card'>
                                <Link>
                                    <div className='img'></div>
                                    <div className='name'>{subject.name}</div>
                                    <div className='price'>{subject.price.toLocaleString('vi-VN')} VND</div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
