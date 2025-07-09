import { useEffect, useState } from 'react';
import { deleteData, postData } from '../../../../mocks/CallingAPI.js';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import './Follow.css';

export default function Follow({ ListUser, Following, Follower, FollowPopup, setFollowPopup, setRefresh }) {
    const { user } = useAuth();

    console.log('Follow');
    // console.log('FollowPopup', FollowPopup);
    // console.log('Following', Following);
    // console.log('Follower', Follower);

    const [Search, setSearch] = useState('');
    const [Follow, setFollow] = useState([]);
    const [Status, setStatus] = useState(FollowPopup);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (FollowPopup == 'Following') {
            setFollow(Following);
            setStatus('Following');
        } else if (FollowPopup == 'Follower') {
            setFollow(Follower);
            setStatus('Follower');
        } else if (FollowPopup == 'Addfriends') {
            setFollow(ListUser.filter(u => u.user?.username?.toLowerCase().includes(Search.toLowerCase()) || !Search));
            setStatus('Addfriends');
        } else {
            setFollow([]);
            setStatus('');
        }
    }, [FollowPopup, Search]);

    const handleChangeFollow = (NewStatus) => {
        if (NewStatus == 'Following') {
            setFollow(Following);
            setStatus('Following');
        } else {
            setFollow(Follower);
            setStatus('Follower');
        }
    };

    const FollowUser = async (FollowingId, UserId) => {

        const FollowData = {
            followingId: FollowingId,
            userId: UserId,
        };
        console.log('FollowData:', FollowData);

        // const token = user?.token;
        const token = '';
        try {
            setLoading(true);
            const result = await postData('api/following', FollowData, token);
            console.log('result', result);

            setRefresh(p => p + 1);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const UnfollowUser = async (UnfollowId) => {
        // const token = user?.token;
        const token = '';
        try {
            setLoading(true);
            await deleteData(`api/following/${UnfollowId}`, token);

            setFollow(Following.filter(follow => follow.id != UnfollowId));
            setRefresh(p => p + 1);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollowUser = (Id) => {
        const FollowingId = Id;
        const UserId = user?.id;
        console.log(FollowingId, UserId);
        FollowUser(FollowingId, UserId);
    };

    const handleUnfollowUser = (Id) => {
        const FollowingId = Id;
        const UserId = user?.id;
        console.log('Following', Following);
        const Unfollow = Following.find(f => f.followingId == FollowingId && f.userId == UserId);
        console.log('Unfollow', Unfollow);
        console.log('UnfollowId', Unfollow.id);
        UnfollowUser(Unfollow.id);
    };

    return (
        <div id='follow' className={`overlay ${!FollowPopup ? 'hidden' : ''}`}>
            <div className='popup'>
                <i className='fa-solid fa-xmark' onClick={() => setFollowPopup(null)}></i>
                <div className='follow-section'>
                    {(FollowPopup == 'Following' || FollowPopup == 'Follower') &&
                        <div className='tabs'>
                            <button className={`btn ${Status == 'Following' ? 'active' : ''}`} onClick={() => handleChangeFollow('Following')}>FOLLOWING</button>
                            <button className={`btn ${Status == 'Follower' ? 'active' : ''}`} onClick={() => handleChangeFollow('Follower')}>FOLLOWERS</button>
                        </div>
                    }
                    {FollowPopup == 'Addfriends' &&
                        <div className='tabs'>
                            <input type='text' name='username' placeholder='Enter username' value={Search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    }
                    <div className='list'>
                        {Follow.map((f, i) => (
                            <div key={i} className='item'>
                                <img src={f.user?.image} alt={f.user?.name} />
                                <div className='info'>
                                    <div className='name-username'>
                                        <div className='name'>{f.user?.id} - {f.user?.name}</div>
                                        <div className='username'>@{f.user?.username}</div>
                                    </div>
                                    <div className='daystreak-point-follow'>
                                        <div className='daystreak-point'>
                                            <div className='daystreak'><i className='fa-solid fa-fire'></i>{f.user?.dayStreak}</div>
                                            <div className='point'><i className='fa-solid fa-lightbulb'></i>{f.user?.point}</div>
                                        </div>
                                        {(FollowPopup == 'Addfriends' || Status == 'Follower') &&
                                            <>
                                                {Following.find(fd => fd.followingId == f.user?.id) ?
                                                    <button className='btn followed'>
                                                        Followed
                                                    </button>
                                                    :
                                                    <button className='btn follow' onClick={() => handleFollowUser(f.user?.id)} disabled={loading}>
                                                        Follow {Status == 'Follower' && 'back'}
                                                    </button>
                                                }
                                            </>
                                        }
                                        {Status == 'Following' &&
                                            <button className='btn unfollow' onClick={() => handleUnfollowUser(f.user?.id)} disabled={loading}>
                                                Unfollow?
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='addfriends'>
                        {(FollowPopup == 'Following' || FollowPopup == 'Follower') && <button className='btn find-friends' onClick={() => setFollowPopup('Addfriends')}>Find friends</button>}
                        {FollowPopup == 'Addfriends' && <button className='btn find-friends' onClick={() => setFollowPopup('Following')}>Back</button>}
                        <button className='btn close' onClick={() => setFollowPopup(null)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
