import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { subjects, topics } from '../../../../mocks/DatabaseSample.js';
import { fetchData } from '../../../../mocks/CallingAPI.js'
import Button from '../../../components/Button.jsx';
import Loading from '../../../layouts/Loading/Loading.jsx';
import './Progress.css';

export default function Progress() {
    const navigate = useNavigate();
    const SubjectId = localStorage.getItem('SubjectId');
    if (!SubjectId) navigate('/subject');

    // const [SUBJECTs, setSUBJECTs] = useState(Subject.filter(subject => subject.Id === SubjectIdParam));
    const [SUBJECTs, setSUBJECTs] = useState(null);
    const [BOUGHTSUBJECTs, setBOUGHTSUBJECTs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const subjectData = await fetchData(`api/subject/${SubjectId}`, token);
                console.log('subjectData', subjectData);
                setSUBJECTs(subjectData);

                const boughtSubjectData = await fetchData(`api/boughtsubject/user/${1}`, token);
                console.log('boughtSubjectData', boughtSubjectData);
                setBOUGHTSUBJECTs(boughtSubjectData.filter(bs => bs.id === SubjectId));
                console.log('boughtSubjectDataFilter', boughtSubjectData.filter(bs => bs.id == SubjectId));

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAPI();
        // }, [user]);
    }, []);

    const [SelectedChapter, setSelectedChapter] = useState(null);
    const [SelectedTopic, setSelectedTopic] = useState(null);

    const handleToggle = (topic, chapter) => {
        setSelectedChapter(p => chapter);
        setSelectedTopic(p => topic.id == SelectedTopic?.id ? null : topic);
    };
    console.log('SelectedTopic', SelectedTopic);


    if (loading) return <Loading />

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
                <h1>{SUBJECTs.name}</h1>
            </div>
            {SUBJECTs.chapters.map((chapter, chapter_index) => (
                <div key={chapter.id} className='chapter'>

                    <div
                        className='chapter-heading'
                        style={{
                            backgroundColor: `hsl(${Math.round(chapter_index * (360 / 8))}, 97%, 60%)`,
                            textShadow: `1px 1px 0px hsl(${Math.round(chapter_index * (360 / 8))}, 100%, 40%)`,
                        }}
                    >
                        <h3>{chapter.name}</h3>
                        <div className='topic-progress'>Progress: 0/{chapter.topics?.length} finished topics</div>
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
                                    maincolor={`${Math.round(chapter_index * (360 / 8))}`}
                                    active={topic.id == SelectedTopic?.id}
                                    onToggle={() => handleToggle(topic, chapter)}
                                >
                                    <div className='text'>{topic_index + 1}</div>
                                </Button>
                            ))}

                            <Button
                                width={'80px'}
                                height={'60px'}
                                border={'6px'}
                                radius={'50%'}
                                maincolor={'locked'}
                                onToggle={() =>
                                    handleToggle({
                                        id: (chapter.topics?.length + 1) + '-' + chapter.id,
                                        name: 'Final Quiz',
                                    },
                                        chapter
                                    )}
                                active={(chapter.topics?.length + 1) + '-' + chapter.id == SelectedTopic?.id}
                            >
                                <i className='fa-solid fa-book'></i>
                            </Button>

                            <Button
                                width={'80px'}
                                height={'60px'}
                                border={'6px'}
                                radius={'50%'}
                                maincolor={'gold'}
                                onToggle={() =>
                                    handleToggle({
                                        id: (chapter.topics?.length + 2) + '+' + chapter.id,
                                        name: 'Advanced Quiz',
                                    },
                                        chapter
                                    )}
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
                        <Link to={
                            `${(SelectedTopic?.id + '').includes('-') ? `/studying/chapter/${SelectedTopic?.id?.split('-')[1]}` :
                                (
                                    (SelectedTopic?.id + '').includes('+') ? `/studying/chapter/${SelectedTopic?.id?.split('+')[1]}` :
                                        `/studying/topic/${SelectedTopic?.id}`
                                )}`
                        }
                        >
                            <Button
                                width={'180px'}
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
