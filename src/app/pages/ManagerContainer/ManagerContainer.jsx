import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ManagerContainer.css';
import ChapterManager from './SubjectManager/ChapterManager/ChapterManager.jsx';
import QuestionManager from './SubjectManager/ChapterManager/TopicManager/QuestionManager/QuestionManager.jsx';
import TopicManager from './SubjectManager/ChapterManager/TopicManager/TopicManager.jsx';
import SubjectManager from './SubjectManager/SubjectManager.jsx';

export default function ManagerContainer() {
    const location = useLocation();
    console.log('ManagerContainer', location.pathname);

    const [PathName, setPathName] = useState(location.pathname);

    useEffect(() => {
        setPathName(location.pathname);
    }, [location.pathname]);

    const ListComponent = [
        { name: 'SUBJECTS', path: '/subject', component: <SubjectManager /> },
        { name: 'CHAPTERS', path: '/chapter', component: <ChapterManager /> },
        { name: 'TOPICS', path: '/topic', component: <TopicManager /> },
        { name: 'QUESTIONS', path: '/question', component: <QuestionManager /> },
    ];

    return (
        <div className='managercontainer-container learn-container'>
            <div className='tabs'>
                {ListComponent.map((component, i) => (
                    <React.Fragment key={i}>
                        {PathName.includes(component.path) &&
                            (PathName.split('/')[PathName.split('/')?.length - 1] == component.path.replace('/', '') ?
                                <div className={`tab located`}>
                                    <div>{component.name}</div>
                                    {i !== 0 && <Link to={`${PathName.replace(`/${PathName.split('/')[PathName.split('/')?.length - 2]}/${PathName.split('/')[PathName.split('/')?.length - 1]}`, '')}`}><i className='fa-solid fa-xmark'></i></Link>}
                                </div>
                                :
                                <Link
                                    to={`${PathName.split(component.path)[0] + component.path + ''}`}
                                    state={location.state}
                                    className={`tab behind`}
                                >
                                    <div>{component.name}</div>
                                    <i className='fa-solid fa-xmark'></i>
                                </Link>
                            )
                        }
                    </React.Fragment>
                ))}
            </div>
            {ListComponent?.find(component => PathName.split('/')[PathName.split('/')?.length - 1] == component.path.replace('/', ''))?.component}
        </div>
    )
}
