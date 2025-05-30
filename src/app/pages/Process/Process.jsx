import React, { useState } from 'react';
import './Process.css';
import { SubjectSample } from '../../../mocks/subject_sample';

export default function Process() {

    const [SelectedTopic, setSelectedTopic] = useState(null);

    return (
        <div className='process-container'>
            <h2>{SubjectSample.subjectName}</h2>
            {SubjectSample.chapters.map((chapter) => (
                <div key={chapter.chapterId}>
                    <h3>{chapter.chapterName}</h3>
                    <h4>Name: {SelectedTopic?.topicName}</h4>
                    {chapter.topics.length > 0 ? (
                        <div className='chapter'>
                            {chapter.topics.map((topic, index) => (
                                // <div key={topic.topicId} className='topic'>{topic.topicName}</div>
                                <div key={topic.topicId} className='topic'>
                                    <div
                                        className={`grid-card ${topic.topicId == SelectedTopic?.topicId ? 'active' : ''}`}
                                        // onMouseDown={() => setSelectedTopic(topic)}
                                        // onMouseUp={() => setSelectedTopic(null)}
                                        // onMouseLeave={() => setSelectedTopic(null)}
                                        onClick={() => setSelectedTopic(topic)}
                                    >
                                        {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p><i>No topics available</i></p>
                    )}
                </div>
            ))}
        </div>
    )
}
