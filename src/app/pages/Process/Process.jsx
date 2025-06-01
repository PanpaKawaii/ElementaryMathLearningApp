import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubjectSample } from '../../../mocks/subject_sample';
import Button from '../../components/Button.jsx';
import './Process.css';

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
                                onToggle={() =>
                                    handleToggle({
                                        topicId: 'quiz-' + chapter.chapterId,
                                        topicName: 'Final Quiz',
                                    },
                                        chapter
                                    )}
                                active={'quiz-' + chapter.chapterId == SelectedTopic?.topicId}
                            >
                                <i className='fa-solid fa-book'></i>
                            </Button>

                            <Button
                                width={'80px'}
                                height={'60px'}
                                border={'6px'}
                                radius={'50%'}
                                onToggle={() =>
                                    handleToggle({
                                        topicId: 'advanced-' + chapter.chapterId,
                                        topicName: 'Advanced Quiz',
                                    },
                                        chapter
                                    )}
                                active={'advanced-' + chapter.chapterId == SelectedTopic?.topicId}
                            >
                                <i className='fa-solid fa-trophy'></i>
                            </Button>
                        </div>
                    ) : (
                        <p><i>No topics available</i></p>
                    )}

                    <div className='please-select'>
                        Please select a topic
                    </div>

                    <div className={`selected-topic ${(chapter.chapterId == SelectedChapter?.chapterId && SelectedTopic) ? '' : 'hidden'}`}>
                        {/* <div className='chapter-title'>{SelectedChapter?.chapterName}</div> */}
                        <div className='topic-title'>
                            {SelectedTopic?.topicName ? SelectedTopic?.topicName : SelectedTopic?.topicId}
                        </div>
                        <Link to='/'>
                            <Button
                                width={'180px'}
                                height={'40px'}
                                radius={'12px'}
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
                        >
                            <div className='text'>TEST</div>
                        </Button>
                    </div> */}
                </div>
            ))}
        </div>
    )
}
