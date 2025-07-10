import { useEffect, useState } from 'react';
import { fetchData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import './DailyDetail.css';
import { Link } from 'react-router-dom';

export default function DailyDetail() {
    const { user } = useAuth();

    const [USER, setUSER] = useState(null);
    const [PerfectLesson, setPerfectLesson] = useState(null);
    const [StudyToday, setStudyToday] = useState(false);
    const [Friend, setFriend] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const topicprogressData = await fetchData(`api/topicprogress`, token);
                const chapterprogressData = await fetchData(`api/chapterprogress`, token);
                // console.log('Topic, Chapter', topicprogressData, chapterprogressData);
                const PerfectTopic = topicprogressData.filter(topic => topic.userId == user.id && topic.score == 100);
                const PerfectChapter = chapterprogressData.filter(chapter => chapter.userId == user.id && chapter.score == 100);
                // console.log('PerfectTopic, PerfectChapter', PerfectTopic, PerfectChapter);
                setPerfectLesson(PerfectTopic.length + PerfectChapter.length);

                const UserData = await fetchData(`api/user/${user?.id}`, token);
                const lastOnline = new Date(UserData.lastOnline);
                const today = new Date();
                lastOnline.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
                const diffDays = Math.floor((today - lastOnline) / (1000 * 60 * 60 * 24));
                if (diffDays >= 1) {
                    setStudyToday(false);
                } else {
                    setStudyToday(true);
                }
                setUSER(UserData);

                const listuser = await fetchData('listuser', token);
                const following = await fetchData(`api/following/user/${user.id}`, token);
                const follower = await fetchData(`api/following/following/${user.id}`, token);
                const mergedListFollowing = following.map(follow => {
                    const matchedUser = listuser.find(user => user.id == follow.followingId);
                    return {
                        ...follow,
                        user: matchedUser
                    };
                });
                const mergedListFollower = follower.map(follow => {
                    const matchedUser = listuser.find(user => user.id == follow.userId);
                    return {
                        ...follow,
                        user: matchedUser
                    };
                });
                const mutualFollows = mergedListFollowing.filter(f1 =>
                    mergedListFollower.some(f2 => f2.userId === f1.followingId && f2.followingId === f1.userId)
                );
                console.log('mutualFollows', mutualFollows);
                setFriend(mutualFollows);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    const Rank = Friend.filter(fr => fr.user?.point >= USER?.point).length + 1;
    console.log('Rank', Rank);

    return (
        <div className='dailydetail-container'>
            <div className='achievement'>
                <div><i className={`fa-solid fa-fire ${StudyToday ? 'studytoday' : 'notstudytoday'}`}></i>{USER?.dayStreak}</div>
                <div><i className='fa-solid fa-lightbulb'></i>{USER?.point}</div>
                <div><i className='fa-solid fa-star'></i>{PerfectLesson}</div>
            </div>

            <section>
                <div className='title'>Friends Rank</div>
                <div className='rank'>
                    <Link to='/ranking' className={`number ${loading ? '' : (Rank == 1 ? 'gold' : (Rank == 2 ? 'silver' : (Rank == 3 ? 'bronze' : '')))}`}>
                        {loading ? '?' : Rank}
                    </Link>
                    <div className='text'>You're ranked <b>#{Rank}</b> among your friends</div>
                </div>
            </section>

            <section>
                <div className='title'>Daily Quests</div>
                <div className='quests'>
                    <div className='detail'>
                        <i className='fa-solid fa-lightbulb'></i>
                        <div className='text'>
                            <div>Earn 300 points</div>
                            <div
                                className='progress'
                                style={{
                                    background: `linear-gradient(to right, #ffd700 ${140 * 100 / 300}%, #ddd ${140 * 100 / 300}%)`
                                }}
                            >
                                140/300
                            </div>
                        </div>
                    </div>
                    <div className='detail'>
                        <i className='fa-solid fa-bolt'></i>
                        <div className='text'>
                            <div>Finish 4 topics</div>
                            <div
                                className='progress'
                                style={{
                                    background: `linear-gradient(to right, #ffd700 ${2 * 100 / 4}%, #ddd ${2 * 100 / 4}%)`
                                }}
                            >
                                2/4
                            </div>
                        </div>
                    </div>
                    <div className='detail'>
                        <i className='fa-solid fa-star'></i>
                        <div className='text'>
                            <div>Finish 4 perfect topics</div>
                            <div
                                className='progress'
                                style={{
                                    background: `linear-gradient(to right, #ffd700 ${1 * 100 / 4}%, #ddd ${1 * 100 / 4}%)`
                                }}
                            >
                                1/4
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
