import React, { useState } from 'react';
import './Process.css';
import Button from '../../components/Button.jsx';
import { SubjectSample } from '../../../mocks/subject_sample';

export default function Process() {

    const [SelectedTopic, setSelectedTopic] = useState(null);

    const handleToggle = (topic) => {
        setSelectedTopic(p => topic.topicId == SelectedTopic?.topicId ? null : topic);
    };

    return (
        <div className='process-container'>
            <h2>{SubjectSample.subjectName}</h2>
            {SubjectSample.chapters.map((chapter) => (
                <div key={chapter.chapterId}>
                    <h3>{chapter.chapterName}</h3>
                    <h4>Selected Topic: {SelectedTopic?.topicName}</h4>
                    {chapter.topics.length > 0 ? (
                        <div className='chapter'>
                            {chapter.topics.map((topic, index) => (
                                <Button
                                    key={topic.topicId}
                                    onToggle={() => handleToggle(topic)}
                                    active={topic.topicId == SelectedTopic?.topicId}
                                >
                                    {index + 1}
                                </Button>
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
