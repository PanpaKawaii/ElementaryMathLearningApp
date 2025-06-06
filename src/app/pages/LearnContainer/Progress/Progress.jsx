import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubjectSample } from '../../../../mocks/subject_sample.js';
import { Subject, Chapter, Topic } from '../../../../mocks/DatabaseSample.js';
import Button from '../../../components/Button.jsx';
import './Progress.css';

export default function Progress() {

    const SubjectIdParam = 1;

    // const [SUBJECTs, setSUBJECTs] = useState(Subject.filter(subject => subject.Id === SubjectIdParam));
    const [SUBJECTs, setSUBJECTs] = useState(Subject);
    const [CHAPTERs, setCHAPTERs] = useState(Chapter);
    const [TOPICs, setTOPICs] = useState(Topic);

    const [SelectedChapter, setSelectedChapter] = useState(null);
    const [SelectedTopic, setSelectedTopic] = useState(null);

    const handleToggle = (topic, chapter) => {
        setSelectedChapter(p => chapter);
        setSelectedTopic(p => topic.TopicId == SelectedTopic?.TopicId ? null : topic);
    };

    return (
        <div className='progress-container'>

            {SUBJECTs.map((subject, subject_index) => (
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
                            <div>ID {chapter.ChapterId}: {chapter.Name}</div>
                            {TOPICs.filter(topic => topic.ChapterId === chapter.ChapterId).map((topic, topic_index) => (
                                <div
                                    key={topic_index}
                                    style={{
                                        margin: '12px 0 0',
                                        padding: '12px',
                                        backgroundColor: '#dc3545',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <div>ID {topic.TopicId}: {topic.Name}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}

            <div className='hide-header'></div>
            {CHAPTERs.filter(chapter => chapter.SubjectId === SUBJECTs[0].Id).map((chapter, chapter_index) => (
                <div key={chapter.ChapterId} className='chapter'>

                    <div
                        className='chapter-heading'
                        style={{
                            backgroundColor: `hsl(${Math.round(chapter_index * (360 / 8))}, 97%, 60%)`,
                            textShadow: `1px 1px 0px hsl(${Math.round(chapter_index * (360 / 8))}, 100%, 40%)`,
                        }}
                    >
                        <h3>{chapter.Name}</h3>
                        <div className='topic-progress'>Progress: 0/10 finished topics</div>
                    </div>
                    {TOPICs.filter(topic => topic.ChapterId === chapter.ChapterId).length > 0 ? (
                        <div className='topics'>
                            {TOPICs.filter(topic => topic.ChapterId === chapter.ChapterId).map((topic, topic_index) => (
                                <Button
                                    key={topic.TopicId}
                                    width={'80px'}
                                    height={'60px'}
                                    border={'6px'}
                                    radius={'50%'}
                                    maincolor={`${Math.round(chapter_index * (360 / 8))}`}
                                    active={topic.TopicId == SelectedTopic?.TopicId}
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
                                        TopicId: 'quiz-' + chapter.ChapterId,
                                        TopicName: 'Final Quiz',
                                    },
                                        chapter
                                    )}
                                active={'quiz-' + chapter.ChapterId == SelectedTopic?.TopicId}
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
                                        TopicId: 'advanced-' + chapter.ChapterId,
                                        TopicName: 'Advanced Quiz',
                                    },
                                        chapter
                                    )}
                                active={'advanced-' + chapter.ChapterId == SelectedTopic?.TopicId}
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
                        className={`selected-topic ${(chapter.ChapterId == SelectedChapter?.ChapterId && SelectedTopic) ? '' : 'hidden'}`}
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
                            {SelectedTopic?.Name ? SelectedTopic?.Name : SelectedTopic?.TopicId}
                        </div>
                        <Link to='/'>
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


                    {/* <div>
                        <Button
                            width={'180px'}
                            height={'30px'}
                            radius={'10px'}
                            maincolor={`${Math.round(11 * (360 / 8))}`}
                        >
                            <div className='text'>TEST</div>
                        </Button>
                    </div> */}
                </div>
            ))}
        </div>
    )
}
