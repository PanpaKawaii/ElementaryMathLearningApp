import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../../mocks/CallingAPI.js';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../../layouts/Loading/Loading.jsx';
import './StudyHistory.css';

export default function StudyHistory({ UserStudyHistory }) {
    const { user } = useAuth();

    const [UserTopicChapterProgress, setUserTopicChapterProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const topicprogress = await fetchData('api/topicprogress', token);
                console.log('topicprogress', topicprogress);
                const usertopicprogress = topicprogress.filter(tpp => tpp.userId == UserStudyHistory);
                console.log('usertopicprogress', usertopicprogress);

                const topic = await fetchData('api/topic', token);
                console.log('topic', topic);

                const mergedTopicProgresses = usertopicprogress.map(tp => ({
                    ...tp,
                    relateId: topic.find(t => t.id == tp.topicId)
                }));
                console.log('mergedTopicProgresses', mergedTopicProgresses);


                const chapterprogress = await fetchData('api/chapterprogress', token);
                console.log('chapterprogress', chapterprogress);
                const userchapterprogress = chapterprogress.filter(ctp => ctp.userId == UserStudyHistory);
                console.log('userchapterprogress', userchapterprogress);

                const chapters = await fetchData('api/chapter', token);
                console.log('chapters', chapters);

                const mergedChapterProgresses = userchapterprogress.map(ct => ({
                    ...ct,
                    relateId: chapters.find(c => c.id == ct.chapterId)
                }));
                console.log('mergedChapterProgresses', mergedChapterProgresses);


                const combined = [...mergedTopicProgresses, ...mergedChapterProgresses].sort(
                    (a, b) => new Date(a.startDate) - new Date(b.startDate)
                );
                console.log('combined', combined);
                setUserTopicChapterProgress(combined);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (UserStudyHistory) {
            fetchDataAPI();
        } else {
            setUserTopicChapterProgress([]);
        }
    }, [user, UserStudyHistory]);

    if (loading) return <Loading Size={'Small'} />
    else if (!UserStudyHistory) return <div className='notification please-select'>Please select a student</div>
    else if (UserTopicChapterProgress.length == 0) return <div className='notification no-data'>No data</div>
    return (
        <div className='studyhistory-container'>
            <div className='table-container'>
                <table className='no-wrap align-middle'>
                    <tbody>
                        {UserTopicChapterProgress.map((progress, i) => (
                            <React.Fragment key={i}>
                                <tr>
                                    <td rowSpan={2}>
                                        <div className={`index`}>{i + 1}</div>
                                    </td>
                                    <td colSpan={4}>
                                        <div className='name-date'>
                                            <div>{progress.relateId?.name}</div>
                                            <div>{progress.startDate}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='note'>{progress.note}</div>
                                    </td>
                                    <td>
                                        <div className='score'>{progress.score}%</div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
