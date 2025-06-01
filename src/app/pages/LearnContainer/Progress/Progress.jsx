import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubjectSample } from '../../../../mocks/subject_sample.js';
import Button from '../../../components/Button.jsx';
import './Progress.css';

export default function Progress() {

    const [SelectedChapter, setSelectedChapter] = useState(null);
    const [SelectedTopic, setSelectedTopic] = useState(null);

    const handleToggle = (topic, chapter) => {
        setSelectedChapter(p => chapter);
        setSelectedTopic(p => topic.topicId == SelectedTopic?.topicId ? null : topic);
    };

    return (
        <div className='progress-container'>
            {/* <h2>{SubjectSample.subjectName}</h2> */}
            <div className='hide-header'></div>
            {SubjectSample.chapters.map((chapter, chapter_index) => (
                <div key={chapter.chapterId} className='chapter'>

                    <div
                        className='chapter-heading'
                        style={{
                            backgroundColor: `hsl(${Math.round(chapter_index * (360 / 8))}, 97%, 70%)`,
                            textShadow: `1px 1px 1px hsl(${Math.round(chapter_index * (360 / 8))}, 100%, 40%)`,
                        }}
                    >
                        <h3>{chapter.chapterName}</h3>
                        <div>Progress: <b>0/10</b> Finished Topics</div>
                    </div>
                    {chapter.topics.length > 0 ? (
                        <div className='topics'>
                            {chapter.topics.map((topic, topic_index) => (
                                <Button
                                    key={topic.topicId}
                                    width={'80px'}
                                    height={'60px'}
                                    border={'6px'}
                                    radius={'50%'}
                                    maincolor={`${Math.round(chapter_index * (360 / 8))}`}
                                    active={topic.topicId == SelectedTopic?.topicId}
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
                                // maincolor={`${Math.round(chapter_index * (360 / 8))}`}
                                maincolor={'locked'}
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
                                maincolor={'gold'}
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

                    <div
                        className='please-select'
                        style={{
                            color: `hsl(${Math.round(chapter_index * (360 / 8))}, 83%, 76%)`,
                            border: `8px solid hsl(${Math.round(chapter_index * (360 / 8))}, 84%, 89%)`,
                        }}
                    >
                        Please select a topic
                    </div>

                    <div
                        className={`selected-topic ${(chapter.chapterId == SelectedChapter?.chapterId && SelectedTopic) ? '' : 'hidden'}`}
                        style={{
                            color: `hsl(${Math.round(chapter_index * (360 / 8))}, 97%, 70%)`,
                            backgroundColor: `hsl(${Math.round(chapter_index * (360 / 8))}, 92%, 84%)`,
                        }}
                    >
                        {/* <div className='chapter-title'>{SelectedChapter?.chapterName}</div> */}
                        <div
                            className='topic-title'
                            style={{
                                textShadow: `1px 1px 1px hsl(${Math.round(chapter_index * (360 / 8))}, 100%, 40%)`,
                            }}
                        >
                            {SelectedTopic?.topicName ? SelectedTopic?.topicName : SelectedTopic?.topicId}
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
