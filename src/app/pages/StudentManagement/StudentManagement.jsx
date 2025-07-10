import { useEffect, useState } from 'react';
import { fetchData } from '../../../mocks/CallingAPI.js';
import Button from '../../components/Button.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import './StudentManagement.css';

export default function StudentManagement({ setUserStudyHistory }) {
    const { user } = useAuth();

    const [MyStudent, setMyStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const listuser = await fetchData('listuser', token);
                console.log('listuser', listuser);
                const myStudent = listuser.filter(u => u.curatorId == user?.id);
                console.log('myStudent', myStudent);

                setMyStudent(myStudent.sort((a, b) => b.point - a.point));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    return (
        <div className='studentmanagement-container'>
            <div className='table-container'>
                <table className='no-wrap align-middle'>
                    <tbody>
                        {MyStudent.map((student, i) => (
                            <tr key={i}>
                                <td>
                                    <div className={`index ${i === 0 ? 'top gold' : (i === 1 ? 'top silver' : i === 2 ? 'top bronze' : '')}`}>{i + 1}</div>
                                </td>
                                <td className='image-td'>
                                    {i === 0 &&
                                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#FFD700' viewBox='0 0 24 24'>
                                            <path d='M4 6l4 5 4-8 4 8 4-5 2 11H2z' />
                                        </svg>
                                    }
                                    <img src={student.image} className={`${i === 0 ? 'gold' : (i === 1 ? 'silver' : i === 2 ? 'bronze' : '')}`} />
                                </td>
                                <td className='name-icon-td'>
                                    <div className='name-icon'>
                                        <div className='name'>{student.name}</div>
                                        <div className='icon'><i className='fa-solid fa-fire'></i>{student.dayStreak}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className='icon'><i className='fa-solid fa-lightbulb'></i>{student.point}</div>
                                </td>
                                <td>
                                    <Button
                                        width={'80px'}
                                        height={'40px'}
                                        border={'6px'}
                                        radius={'12px'}
                                        maincolor={'correct'}
                                        active={false}
                                        onToggle={() => setUserStudyHistory(p => student.id == p ? null : student.id)}
                                    >
                                        <div className='text'>Detail</div>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
