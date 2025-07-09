import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../../../../mocks/CallingAPI.js';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import Button from '../../../components/Button.jsx';
import Loading from '../../../layouts/Loading/Loading.jsx';
import './Progress.css';

export default function Progress() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const SubjectId = localStorage.getItem('SubjectId');

    const [SUBJECTs, setSUBJECTs] = useState(null);
    const [PROGRESSes, setPROGRESSes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!SubjectId) navigate('/subject');
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const subjectData = await fetchData(`api/subject/${SubjectId}`, token);
                console.log('subjectData', subjectData);
                setSUBJECTs(subjectData);

                const boughtSubjectData = await fetchData(`api/boughtsubject/user/${user.id}`, token);
                console.log('boughtSubjectData', boughtSubjectData);

                console.log('Id', boughtSubjectData.find(bs => bs.subjectId == SubjectId).id);
                const progressData = await fetchData(`api/progress/boughtsubject/${boughtSubjectData.find(bs => bs.subjectId == SubjectId).id}`, token);
                console.log('progressData', progressData);

                setPROGRESSes(progressData);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user]);

    const [SelectedChapter, setSelectedChapter] = useState(null);
    const [SelectedTopic, setSelectedTopic] = useState(null);

    const handleToggle = (topic, chapter) => {
        setSelectedChapter(p => chapter);
        setSelectedTopic(p => topic.id == SelectedTopic?.id ? null : topic);
    };

    const LearnableTopic = (ChapterNumber, TopicNumber) => {
        if (ChapterNumber < PROGRESSes?.chapter) {
            return true;
        } else if (TopicNumber <= PROGRESSes?.topic && ChapterNumber == PROGRESSes?.chapter) {
            return true;
        } else return false;
    }
    const LearnableQuiz = (ChapterNumber, ChapterTopicsLength) => {
        if (ChapterNumber < PROGRESSes?.chapter) {
            return true;
        } else if (ChapterTopicsLength + 1 <= PROGRESSes?.topic && ChapterNumber == PROGRESSes?.chapter) {
            return true;
        } else return false;
    }
    const LearnableAdvanced = (ChapterNumber) => {
        if (ChapterNumber < PROGRESSes?.chapter) {
            return true;
        } else return false;
    }

    if (loading) return <Loading Size={'Average'} />
    return (
        <div className='progress-container'>

            {/* {subjects.map((subject, subject_index) => (
                <div
                    key={subject_index}
                    style={{
                        margin: '12px 0 0',
                        padding: '12px',
                        backgroundColor: '#28a745',
                        borderRadius: '12px',
                    }}
                >
                    <div>ID {subject.Id}: {subject.Name}</div>
                    {CHAPTERs.filter(chapter => chapter.SubjectId === subject.Id).map((chapter, chapter_index) => (
                        <div
                            key={chapter_index}
                            style={{
                                margin: '12px 0 0',
                                padding: '12px',
                                backgroundColor: '#ffc107',
                                borderRadius: '12px',
                            }}
                        >
                            <div>ID {chapter.Id}: {chapter.Name}</div>
                            {TOPICs.filter(topic => topic.ChapterId === chapter.Id).map((topic, topic_index) => (
                                <div
                                    key={topic_index}
                                    style={{
                                        margin: '12px 0 0',
                                        padding: '12px',
                                        backgroundColor: '#dc3545',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <div>ID {topic.Id}: {topic.Name}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))} */}

            <div className='subject-name'>
                <h1>{SUBJECTs?.name}</h1>
            </div>
            {SUBJECTs?.chapters.map((chapter, chapter_index) => (
                <div key={chapter.id} className='chapter'>

                    <div
                        className='chapter-heading'
                        style={{
                            backgroundColor: `hsl(${Math.round(chapter_index * (360 / 8))}, 97%, 60%)`,
                            textShadow: `1px 1px 0px hsl(${Math.round(chapter_index * (360 / 8))}, 100%, 40%)`,
                        }}
                    >
                        <div className='heading'>{chapter.name}</div>
                        <div className='topic-progress'>
                            Progress: {
                                PROGRESSes ? (chapter.number < PROGRESSes?.chapter ? chapter.topics?.length :
                                    (chapter.number > PROGRESSes?.chapter ? 0 :
                                        (chapter.topics?.length < PROGRESSes?.topic ? chapter.topics?.length :
                                            PROGRESSes?.topic))) : 0
                            }
                            /{chapter.topics?.length}
                        </div>
                    </div>
                    {chapter.topics?.length > 0 ? (
                        <div className='topics'>
                            {chapter.topics.map((topic, topic_index) => (
                                <Button
                                    key={topic.id}
                                    width={'80px'}
                                    height={'60px'}
                                    border={'6px'}
                                    radius={'50%'}
                                    // maincolor={
                                    //     `${chapter.number < PROGRESSes?.chapter ?
                                    //         Math.round(chapter_index * (360 / 8))
                                    //         : ((topic.number <= PROGRESSes?.topic && chapter.number == PROGRESSes?.chapter) ?
                                    //             Math.round(chapter_index * (360 / 8))
                                    //             : 'locked')}`}
                                    maincolor={LearnableTopic(chapter.number, topic.number) ? Math.round(chapter_index * (360 / 8)) : 'locked'}
                                    active={topic.id == SelectedTopic?.id}
                                    onToggle={() => { if (LearnableTopic(chapter.number, topic.number)) { handleToggle(topic, chapter) } }}
                                >
                                    {/* <div>Topic: {topic.number}</div>
                                    <div>Chapter: {chapter.number}</div>
                                    <div>P.Topic: {PROGRESSes?.chapter}</div>
                                    <div>P.Chapter: {PROGRESSes?.topic}</div> */}
                                    <div className='text'>{topic_index + 1}</div>
                                </Button>
                            ))}

                            <Button
                                width={'80px'}
                                height={'60px'}
                                border={'6px'}
                                radius={'50%'}
                                // maincolor={
                                //     `${chapter.number < PROGRESSes?.chapter ? 'correct' :
                                //         ((chapter.topics?.length + 1 <= PROGRESSes?.topic && chapter.number == PROGRESSes?.chapter) ? 'correct' :
                                //             'locked')}`}
                                maincolor={LearnableQuiz(chapter.number, chapter.topics?.length) ? Math.round(chapter_index * (360 / 8)) : 'locked'}
                                onToggle={() => {
                                    if (LearnableQuiz(chapter.number, chapter.topics?.length)) {
                                        handleToggle({
                                            id: (chapter.topics?.length + 1) + '-' + chapter.id,
                                            name: 'Final Quiz',
                                        },
                                            chapter
                                        )
                                    }
                                }}
                                active={(chapter.topics?.length + 1) + '-' + chapter.id == SelectedTopic?.id}
                            >
                                <i className='fa-solid fa-book'></i>
                            </Button>

                            <Button
                                width={'80px'}
                                height={'60px'}
                                border={'6px'}
                                radius={'50%'}
                                // maincolor={`${chapter.number < PROGRESSes?.chapter ? 'gold' : 'locked'}`}
                                maincolor={LearnableAdvanced(chapter.number) ? 'gold' : 'locked'}
                                onToggle={() => {
                                    if (LearnableAdvanced(chapter.number)) {
                                        handleToggle({
                                            id: (chapter.topics?.length + 2) + '+' + chapter.id,
                                            name: 'Advanced Quiz',
                                        },
                                            chapter
                                        )
                                    }
                                }}
                                active={(chapter.topics?.length + 2) + '+' + chapter.id == SelectedTopic?.id}
                            >
                                <i className='fa-solid fa-trophy'></i>
                            </Button>
                        </div>
                    ) : (
                        <p><i>No topics available</i></p>
                    )}

                    <div
                        className='please-select'
                        style={{
                            color: `hsl(${Math.round(chapter_index * (360 / 8))}, 83%, 71%)`,
                            border: `8px solid hsl(${Math.round(chapter_index * (360 / 8))}, 84%, 89%)`,
                        }}
                    >
                        Please select a topic
                    </div>

                    <div
                        className={`selected-topic ${(chapter.id == SelectedChapter?.id && SelectedTopic) ? '' : 'hidden'}`}
                        style={{
                            backgroundColor: `hsl(${Math.round(chapter_index * (360 / 8))}, 92%, 79%)`,
                        }}
                    >
                        {/* <div className='chapter-title'>{SelectedChapter?.Name}</div> */}
                        <div
                            className='topic-title'
                            style={{
                                textShadow: `1px 1px 0px hsl(${Math.round(chapter_index * (360 / 8))}, 100%, 40%)`,
                            }}
                        >
                            {SelectedTopic?.name ? SelectedTopic?.name : SelectedTopic?.id}
                        </div>

                        {(SelectedTopic?.id + '').includes('+') &&
                            <Link
                                to={`/forum/chapter/${SelectedTopic?.id?.split('+')[1]}`}
                                state={SelectedTopic?.id}
                            >
                                <Button
                                    width={'100px'}
                                    height={'40px'}
                                    radius={'12px'}
                                    maincolor={`${Math.round(chapter_index * (360 / 8))}`}
                                >
                                    <div className='text'>FORUM</div>
                                </Button>
                            </Link>
                        }

                        <Link
                            to={`${(SelectedTopic?.id + '').includes('-') ? `/studying/quiz/chapter/${SelectedTopic?.id?.split('-')[1]}` :
                                ((SelectedTopic?.id + '').includes('+') ? `/studying/advanced/chapter/${SelectedTopic?.id?.split('+')[1]}` :
                                    `/studying/chapter/${SelectedChapter?.id}/topic/${SelectedTopic?.id}`)}`}
                            state={SelectedTopic?.id}
                        >
                            <Button
                                width={'160px'}
                                height={'40px'}
                                radius={'12px'}
                                maincolor={`${Math.round(chapter_index * (360 / 8))}`}
                            >
                                <div className='text'>LET'S STUDY</div>
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
