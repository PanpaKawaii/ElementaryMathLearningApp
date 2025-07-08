import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI.js';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../../layouts/Loading/Loading.jsx';
import Crown from './Crown/Crown.jsx';
import './Ranking.css';

export default function Ranking() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [Friend, setFriend] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) navigate('/login-register');
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const me = await fetchData(`api/user/${user?.id}`, token);
                const listuser = await fetchData('listuser', token);
                const following = await fetchData(`api/following/user/${user.id}`, token);
                const follower = await fetchData(`api/following/following/${user.id}`, token);

                const friendIds = following.filter(f1 => follower.some(f2 => f2.userId === f1.followingId && f2.followingId === f1.userId)).map(f => f.followingId);
                console.log('friendIds', friendIds);
                const friends = listuser.filter(user => friendIds.includes(user.id));
                console.log('friends', friends);

                setFriend([...friends, me].sort((a, b) => b.point - a.point));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    if (loading) return <Loading Size={'Average'} />
    return (
        <div className='ranking-container'>
            <div className='crown-component'><Crown /></div>
            <div className='table-container'>
                <table className='no-wrap align-middle'>
                    <tbody>
                        {Friend.map((item, i) => (
                            <tr key={item.id || i} className={`${item.id == user?.id ? 'me' : ''}`}>
                                <td>
                                    <div className={`index ${i === 0 ? 'top gold' : (i === 1 ? 'top silver' : i === 2 ? 'top bronze' : '')}`}>{i + 1}</div>
                                </td>
                                <td className='image-td'>
                                    {i === 0 &&
                                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#FFD700' viewBox='0 0 24 24'>
                                            <path d='M4 6l4 5 4-8 4 8 4-5 2 11H2z' />
                                        </svg>
                                    }
                                    <img src={item.image} className={`${i === 0 ? 'gold' : (i === 1 ? 'silver' : i === 2 ? 'bronze' : '')}`} />
                                </td>
                                <td className='name-icon-td'>
                                    <div className='name-icon'>
                                        <div className='name'>{item.name}</div>
                                        <div className='icon'><i className='fa-solid fa-fire'></i>{item.dayStreak}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className='icon'><i className='fa-solid fa-lightbulb'></i>{item.point}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
