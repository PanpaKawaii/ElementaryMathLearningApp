import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../../mocks/CallingAPI.js';
import Button from '../../components/Button.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../layouts/Loading/Loading.jsx';
import './AdvancedQuestion.css';
import Forum from './Forum.jsx';

export default function AdvancedQuestion() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const Params = useParams();

    const TopicId = location.state;
    console.log('TopicId', TopicId);

    const ChapterId = Params.chapter;
    console.log('ChapterId', ChapterId);



    const [CHAPTER, setCHAPTER] = useState(null);
    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [index, setIndex] = useState(CHAPTER?.id || 0);
    const [SelectedQuestion, setSelectedQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token; // === FIX ===
        const token = '';
        const fetchDataAdvancedAPI = async () => {
            try {
                const chapterData = await fetchData(`api/chapter/${ChapterId}`, token);
                const AdvancedQuestions = chapterData.topics.flatMap(topic => topic.questions.filter(q => q.note == 'Advanced'));
                console.log('AdvancedQuestions', AdvancedQuestions);

                if (AdvancedQuestions?.length <= 0) navigate('/learn');

                setCHAPTER(chapterData);
                setQUESTIONs(AdvancedQuestions);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAdvancedAPI();
    }, [TopicId]);

    const handleToggle = (question, question_index) => {
        setSelectedQuestion(p => question.id == SelectedQuestion?.id ? null : question);
        setIndex(question_index);
    };

    if (loading) return <Loading Size={'Large'} />
    return (
        <div className='learn-container'>
            <div className='container-2'>
                <div className='advancedquestion-container'>

                    <div
                        className='chapter-heading'
                        style={{
                            backgroundColor: `hsl(${Math.round((CHAPTER?.number - 1) * (360 / 8))}, 97%, 60%)`,
                            textShadow: `1px 1px 0px hsl(${Math.round((CHAPTER?.number - 1) * (360 / 8))}, 100%, 40%)`,
                        }}
                    >
                        <div className='heading'>Chapter {CHAPTER?.number}: {CHAPTER?.name}</div>
                    </div>
                    <div className='list-questions'>
                        {QUESTIONs.map((question, question_index) => (
                            <Button
                                key={question.id}
                                width={'80px'}
                                height={'60px'}
                                border={'6px'}
                                radius={'12px'}
                                maincolor={Math.round(question_index * (360 / 8))}
                                active={question.id == SelectedQuestion?.id}
                                onToggle={() => handleToggle(question, question_index)}
                            >
                                <div className='text'>#{question_index + 1}</div>
                            </Button>
                        ))}
                    </div>

                    <div
                        className='please-select'
                        style={{
                            color: `hsl(${Math.round(index * (360 / 8))}, 83%, 71%)`,
                            border: `8px solid hsl(${Math.round(index * (360 / 8))}, 84%, 89%)`,
                        }}
                    >
                        Please select a topic
                    </div>

                    <div
                        className={`selected-question ${(SelectedQuestion) ? '' : 'hidden'}`}
                        style={{
                            backgroundColor: `hsl(${Math.round(index * (360 / 8))}, 92%, 79%)`,
                        }}
                    >
                        <div
                            className='question-title'
                            style={{
                                textShadow: `1px 1px 0px hsl(${Math.round(index * (360 / 8))}, 100%, 40%)`,
                            }}
                        >
                            {SelectedQuestion?.question1}
                        </div>
                    </div>
                    <Forum SelectedQuestion={SelectedQuestion} />
                </div>
            </div>
        </div>
    )
}
