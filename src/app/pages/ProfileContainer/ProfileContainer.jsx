import { useEffect, useState } from 'react';
import { fetchData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import DailyDetail from '../DailyDetail/DailyDetail.jsx';
import Follow from './Follow/Follow.jsx';
import StudyHistory from './StudyHistory/StudyHistory.jsx';
import Profile from './Profile/Profile.jsx';

export default function ProfileContainer() {
    const { user } = useAuth();

    const [FollowPopup, setFollowPopup] = useState(null);
    const [Following, setFollowing] = useState([]);
    const [Follower, setFollower] = useState([]);
    const [ListUser, setListUser] = useState([]);
    const [Refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [UserStudyHistory, setUserStudyHistory] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const listuser = await fetchData('listuser', token);
                const following = await fetchData(`api/following/user/${user.id}`, token);
                const follower = await fetchData(`api/following/following/${user.id}`, token);
                console.log('listuser', listuser);
                console.log('following', following);
                console.log('follower', follower);
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
                // const FilterListUser = listuser.filter(u =>
                //     !following.some(f => f.followingId === u.id) && u.id !== user?.id
                // )
                //     .map(u => ({ user: u }));
                const FilterListUser = listuser.filter(u => u.id !== user?.id && u.role === 'Student').map(u => ({ user: u }));

                console.log('FilterListUser', FilterListUser);
                console.log('mergedListFollowing', mergedListFollowing);
                console.log('mergedListFollower', mergedListFollower);
                setListUser(FilterListUser);
                setFollowing(mergedListFollowing);
                setFollower(mergedListFollower);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user, Refresh]);

    return (
        <div className='learn-container'>
            <div className='container-2'>
                <Profile Following={Following} Follower={Follower} setFollowPopup={setFollowPopup} UserStudyHistory={UserStudyHistory} setUserStudyHistory={setUserStudyHistory} />
                {user?.role == 'Student' &&
                    (UserStudyHistory ? <StudyHistory UserStudyHistory={UserStudyHistory} /> : <DailyDetail />)
                }
                {user?.role == 'Parent' && <StudyHistory UserStudyHistory={UserStudyHistory} />}
            </div>
            <Follow ListUser={ListUser} Following={Following} Follower={Follower} FollowPopup={FollowPopup} setFollowPopup={setFollowPopup} setRefresh={setRefresh} />
        </div>
    )
}
