import { useEffect, useRef, useState } from 'react';
import { deleteData, fetchData, postData } from '../../../mocks/CallingAPI.js';
import Button from '../../components/Button.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../layouts/Loading/Loading.jsx';
import './Forum.css';

export default function Forum({ SelectedQuestion }) {
    const { user } = useAuth();

    const refTextarea = useRef(null);

    console.log('SelectedQuestion', SelectedQuestion);

    const [COMMENTs, setCOMMENTs] = useState([]);
    const [InputComment, setInputComment] = useState(null);
    const [YourText, setYourText] = useState('');
    const [Refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token; // === FIX ===
        const token = '';
        const fetchDataAdvancedAPI = async () => {
            try {
                const listuser = await fetchData('listuser', token);
                const commentData = await fetchData(`api/comment/question/${SelectedQuestion?.id}`, token);
                console.log('commentData', commentData);

                const mergedListComment = commentData.map(comment => {
                    const matchedUser = listuser.find(user => user.id == comment.userId);
                    return {
                        ...comment,
                        user: matchedUser
                    };
                });

                setCOMMENTs(mergedListComment);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (SelectedQuestion) fetchDataAdvancedAPI();
    }, [user, SelectedQuestion, Refresh]);

    const SubmitComment = async (Content, Answer) => {

        const CommentData = {
            content: Content,
            answer: Answer,
            questionId: SelectedQuestion?.id,
            userId: user?.id
        };
        console.log('CommentData:', CommentData);

        // const token = user?.token;
        const token = '';
        try {
            // setLoading(true);
            const result = await postData('api/comment', CommentData, token);
            console.log('result', result);

            setRefresh(p => p + 1);
        } catch (error) {
            setError(error);
        } finally {
            // setLoading(false);
        }
    };

    const TakeDownComment = async (CommentId) => {

        // const token = user?.token;
        const token = '';
        try {
            // setLoading(true);
            const result = await deleteData(`api/comment/${CommentId}`, token);
            console.log('result', result);

            setRefresh(p => p + 1);
        } catch (error) {
            setError(error);
        } finally {
            // setLoading(false);
        }
    };

    const handleSubmitComment = () => {
        const Content = refTextarea.current.value;
        const Answer = InputComment;
        console.log({
            Content,
            Answer,
        });
        SubmitComment(Content, Answer);
        setInputComment(null);
    }

    const handleTakeDownComment = (CommentId) => {
        TakeDownComment(CommentId);
    }

    function getChildrenComment(Id, num) {
        const ChildrenComment = COMMENTs.filter(comment => comment.answer == Id);
        return (
            <>
                {ChildrenComment.map((comment, i) => (
                    <div key={i} className='questions'>
                        {num <= 2 && num > 0 &&
                            <div className='head-block'>
                                <div className={`vertical-line ${i + 1 == ChildrenComment.length ? 'no-line' : 'line-full'}`}></div>
                                <div className='horizon-line'></div>
                            </div>
                        }
                        <div style={{ width: `calc(100% - ${40 * num}px)` }}>
                            <div key={i} className='content'>
                                <div className='image head-block'>
                                    <img src={comment.user?.image} alt={comment.user?.name} />
                                    {/* <div className={`vertical-line ${(ChildrenComment.length == 1 || num == 2) ? ((ChildrenComment.length == 1 && num == 2) ? 'line-full' : 'no-line') : 'line-full'}`}></div> */}
                                    <div className={`vertical-line ${(COMMENTs.filter(c => c.answer == comment.id)?.length != 0 || comment.id == InputComment) ? 'line-img' : 'no-line'}`}></div>
                                </div>
                                <div>
                                    <div className='name-comment'>
                                        <div className='name'>{comment.user?.name}---CMT:{comment.id}</div>
                                        <div>{comment.content}</div>
                                    </div>
                                    <div className='commentdate-btn'>
                                        <div className='commentdate'>{comment.commentDate?.split('T')[0]}</div>
                                        <button className='btn' onClick={() => setInputComment(comment.id)}>Reply</button>
                                        {comment.user?.id == user?.id && <button className='btn btn-takedown' onClick={() => handleTakeDownComment(comment.id)}>Take down</button>}
                                    </div>
                                </div>
                            </div>
                            {comment.id == InputComment &&
                                <div className='content input-comment'>
                                    <div className='image head-block'>
                                        <img src={user?.image} alt={user?.name} />
                                        {/* <div className={`vertical-line ${(ChildrenComment.length == 1 || num == 2) ? ((ChildrenComment.length == 1 && num == 2) ? 'line-full' : 'no-line') : 'line-full'}`}></div> */}
                                        <div className={`vertical-line ${(COMMENTs.filter(c => c.answer == comment.id)?.length == 0) ? 'no-line' : 'line-img'}`}></div>
                                    </div>
                                    <form className='comment-area'>
                                        <textarea
                                            ref={refTextarea}
                                            placeholder={`Answer ${comment.user?.name}`}
                                            rows={2}
                                        />
                                        <Button
                                            width={'80px'}
                                            height={'40px'}
                                            border={'6px'}
                                            radius={'12px'}
                                            maincolor={'correct'}
                                            active={false}
                                            onToggle={() => handleSubmitComment()}
                                        >
                                            <div className='text'>Submit</div>
                                        </Button>
                                    </form>
                                </div>
                            }
                            <div>
                                {getChildrenComment(comment.id, num + 1)}
                            </div>
                        </div>
                    </div>
                ))}
            </>
        )
    }

    if (loading) return <Loading Size={'Large'} />
    return (
        <div className='forum-container'>
            <div className='forum-content'>
                {getChildrenComment(null, 0)}
            </div>
        </div>
    )
}
