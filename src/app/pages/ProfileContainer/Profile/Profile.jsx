import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI.js';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../../layouts/Loading/Loading.jsx';
import './Profile.css';

// Mock user data as backup
const mockUser = {
    id: 1,
    name: 'John Doe',
    username: 'jdoe',
    password: 'pass123',
    role: 'Student',
    curatorId: null,
    email: 'jdoe@example.com',
    point: 100,
    joinedDate: '2024-06-01',
    dayStreak: 5,
    highestDayStreak: 10
};

const mockAchievements = [
    {
        id: 1,
        name: 'Wildfire',
        description: 'Reach a 3 day streak',
        icon: '🔥',
        level: 1,
        progress: 1,
        goal: 3,
        color: '#FF5B5B'
    },
    {
        id: 2,
        name: 'Sage',
        description: 'Earn 500 XP',
        icon: '🧙‍♂️',
        level: 3,
        progress: 451,
        goal: 500,
        color: '#7ED957'
    },
    {
        id: 3,
        name: 'Scholar',
        description: 'Learn 50 new words in a single course',
        icon: '📜',
        level: 1,
        progress: 2,
        goal: 50,
        color: '#FFD966'
    },
    {
        id: 4,
        name: 'Scholar',
        description: 'Learn 50 new words in a single course',
        icon: '📜',
        level: 1,
        progress: 2,
        goal: 50,
        color: '#FFD966'
    },
    {
        id: 5,
        name: 'Scholar',
        description: 'Learn 50 new words in a single course',
        icon: '📜',
        level: 1,
        progress: 2,
        goal: 50,
        color: '#FFD966'
    }
];

export default function Profile({ Following, Follower, setFollowPopup }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [USER, setUSER] = useState(null);
    const [PerfectLesson, setPerfectLesson] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) navigate('/login-register');
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const topicprogressData = await fetchData(`api/topicprogress`, token);
                const chapterprogressData = await fetchData(`api/chapterprogress`, token);
                console.log('Topic, Chapter', topicprogressData, chapterprogressData);
                const PerfectTopic = topicprogressData.filter(topic => topic.userId == user.id && topic.score == 100);
                const PerfectChapter = chapterprogressData.filter(chapter => chapter.userId == user.id && chapter.score == 100);
                console.log('PerfectTopic, PerfectChapter', PerfectTopic, PerfectChapter);
                setPerfectLesson(PerfectTopic.length + PerfectChapter.length);

                const userData = await fetchData(`api/user/${user?.id}`, token);
                // const following = await fetchData(`api/following/user/${user.id}`, token);
                // const follower = await fetchData(`api/following/following/${user.id}`, token);
                // console.log('following', following);
                // console.log('follower', follower);
                // setFollowing(following);
                // setFollower(follower);
                // const userWithMoreDetail = { ...userData, following: following };
                // const userWithMoreDetail = { ...userData, following: Following, follower: Follower };
                // console.log('userWithMoreDetail', userWithMoreDetail);
                // setUSER(userWithMoreDetail);
                setUSER(userData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();

        // Fetch achievements
        fetchData('achievement', token)
            .then(data => {
                setAchievements(Array.isArray(data) ? data : [data]);
            })
            .catch(() => {
                setAchievements(mockAchievements); // fallback to mock achievements
            });
    }, [user]);

    const handleOpenFollow = (Status) => {
        setFollowPopup(Status);
        // window.location.href = '#follow';
        // navigate('#follow');
    }

    if (loading) return <Loading Size={'Average'} />
    return (
        <div className='profile-container'>
            <div className='profile-box'>
                <div className='header'>
                    {USER?.image ?
                        <img src={USER?.image} alt={USER.name} />
                        :
                        <div className='avatar'>
                            <i className='fa-solid fa-plus'></i>
                            <i className='fa-solid fa-pencil'></i>
                        </div>}
                    <div className='info'>
                        <div className='up-info'>
                            <div className='name'>{USER?.name}</div>
                            <div className='username'>@{USER?.username}</div>
                            <div className='joined'>Joined {USER?.joinedDate}</div>
                        </div>
                        <div className='down-info'>
                            <div className='follow'>
                                <button className='btn following' onClick={() => handleOpenFollow('Following')}>{Following?.length || 0} {Following?.length == 1 ? 'following' : 'followings'}</button>
                                <button className='btn following' onClick={() => handleOpenFollow('Follower')}>{Follower?.length || 0} {Follower?.length == 1 ? 'follower' : 'followers'}</button>
                            </div>
                            <button className='btn' onClick={() => logout()}>Logout</button>
                        </div>
                    </div>
                </div>
                <div className='line'></div>
                <div className='main-content'>
                    <div className='statistics-achievements'>
                        <div className='statistics'>
                            <div className='title'>Statistics</div>
                            <div className='row'>
                                <div className='box'>
                                    <span className='value'>{USER?.dayStreak}</span>
                                    <span className='label'>Day streak</span>
                                </div>
                                <div className='box'>
                                    <span className='value'>{USER?.point}</span>
                                    <span className='label'>Total point</span>
                                </div>
                                <div className='box'>
                                    <span className='value'>{USER?.highestDayStreak}</span>
                                    <span className='label'>Highest day streak</span>
                                </div>
                                <div className='box'>
                                    <span className='value'>{PerfectLesson}</span>
                                    <span className='label'>Perfect lessons</span>
                                </div>
                            </div>
                        </div>
                        <div className='achievements'>
                            <div className='title'>Achievements</div>
                            <div className='list'>
                                {achievements.map(a => (
                                    <div className='item' key={a.id}>
                                        <i className='fa-solid fa-trophy'></i>
                                        <div className='content'>
                                            <div className='header'>
                                                <div className='achievements-title'>{a.name}</div>
                                                {a.progress !== undefined && a.goal !== undefined && (
                                                    <div className='progress-label'>{a.progress}/{a.goal}</div>
                                                )}
                                            </div>
                                            <div className='bar-bg'>
                                                <div className='bar' style={{ width: a.progress && a.goal ? `${Math.min(100, Math.round((a.progress / a.goal) * 100))}%` : '0%', background: a.color || '#FFD966' }}></div>
                                            </div>
                                            <div className='desc'>{a.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
