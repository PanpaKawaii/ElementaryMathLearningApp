import React, { useState } from 'react';
import './Process.css';
import { Link } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import { SubjectSample } from '../../../mocks/subject_sample';

export default function Process() {

    const [SelectedChapter, setSelectedChapter] = useState(null);
    const [SelectedTopic, setSelectedTopic] = useState(null);

    const handleToggle = (topic, chapter) => {
        setSelectedChapter(p => chapter);
        setSelectedTopic(p => topic.topicId == SelectedTopic?.topicId ? null : topic);
    };

    return (
        <div className='process-container'>
            <h2>{SubjectSample.subjectName}</h2>
            {SubjectSample.chapters.map((chapter) => (
                <div key={chapter.chapterId} className='chapter'>

                    <div className='chapter-heading'>
                        <h3>{chapter.chapterName}</h3>
                        <div>Process: <b>0/10</b> Finished Topics</div>
                    </div>
                    {chapter.topics.length > 0 ? (
                        <div className='topics'>
                            {chapter.topics.map((topic, index) => (
                                <Button
                                    key={topic.topicId}
                                    width={'80px'}
                                    height={'60px'}
                                    border={'6px'}
                                    radius={'50%'}
                                    active={topic.topicId == SelectedTopic?.topicId}
                                    onToggle={() => handleToggle(topic, chapter)}
                                >
                                    <div className='text'>{index + 1}</div>
                                </Button>
                            ))}

                            <Button
                                width={'80px'}
                                height={'60px'}
                                border={'6px'}
                                radius={'50%'}
                                onToggle={() => handleToggle({ topicId: chapter.chapterId })}
                                active={chapter.chapterId == SelectedTopic?.topicId}
                            >
                                <i className='fa-solid fa-trophy'></i>
                            </Button>
                        </div>
                    ) : (
                        <p><i>No topics available</i></p>
                    )}

                    <div className={`selected-topic ${(chapter.chapterId == SelectedChapter?.chapterId && SelectedTopic) ? '' : 'hidden'}`}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        >
                            <div>{SelectedChapter?.chapterName}</div>
                            <div>{SelectedTopic?.topicName}</div>
                        </div>
                        <Link to='/6'>
                            <Button
                                width={'180px'}
                                height={'40px'}
                                radius={'12px'}
                            >
                                <div className='text'>STUDY</div>
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
