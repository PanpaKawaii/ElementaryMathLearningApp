import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubjectSample } from '../../../../mocks/subject_sample.js';
import { subjects, chapters, topics } from '../../../../mocks/DatabaseSample.js';
import Button from '../../../components/Button.jsx';
import './Progress.css';

export default function Progress() {

    // const [SUBJECTs, setSUBJECTs] = useState(Subject.filter(subject => subject.Id === SubjectIdParam));
    const [SUBJECTs, setSUBJECTs] = useState(subjects[0]);
    const [CHAPTERs, setCHAPTERs] = useState(chapters);
    const [TOPICs, setTOPICs] = useState(topics);

    const [SelectedChapter, setSelectedChapter] = useState(null);
    const [SelectedTopic, setSelectedTopic] = useState(null);

    const handleToggle = (topic, chapter) => {
        setSelectedChapter(p => chapter);
        setSelectedTopic(p => topic.Id == SelectedTopic?.Id ? null : topic);
    };

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
                <h1>{SUBJECTs.Name}</h1>
            </div>
            {CHAPTERs.filter(chapter => chapter.SubjectId === SUBJECTs.Id).map((chapter, chapter_index) => (
                <div key={chapter.Id} className='chapter'>

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
                    {TOPICs.filter(topic => topic.ChapterId === chapter.Id).length > 0 ? (
                        <div className='topics'>
                            {TOPICs.filter(topic => topic.ChapterId === chapter.Id).map((topic, topic_index) => (
                                <Button
                                    key={topic.Id}
                                    width={'80px'}
                                    height={'60px'}
                                    border={'6px'}
                                    radius={'50%'}
                                    maincolor={`${Math.round(chapter_index * (360 / 8))}`}
                                    active={topic.Id == SelectedTopic?.Id}
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
                                        Id: 'final-quiz-' + chapter.Id,
                                        Name: 'Final Quiz',
                                    },
                                        chapter
                                    )}
                                active={'final-quiz-' + chapter.Id == SelectedTopic?.Id}
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
                                        Id: 'advanced-quiz-' + chapter.Id,
                                        Name: 'Advanced Quiz',
                                    },
                                        chapter
                                    )}
                                active={'advanced-quiz-' + chapter.Id == SelectedTopic?.Id}
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
                        className={`selected-topic ${(chapter.Id == SelectedChapter?.Id && SelectedTopic) ? '' : 'hidden'}`}
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
                            {SelectedTopic?.Name ? SelectedTopic?.Name : SelectedTopic?.Id}
                        </div>
                        <Link to={`/studying/topic/${SelectedTopic?.Id}`}>
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
