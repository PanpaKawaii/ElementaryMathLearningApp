import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchData, postData, patchData } from '../../../mocks/CallingAPI.js';
import Button from '../../components/Button.jsx';
import { useAuth } from '../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../layouts/Loading/Loading.jsx';
import MultipleForm from './Form/MultipleForm.jsx';
import './Studying.css';

export default function Studying() {
    const { user } = useAuth();
    const formRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const TopicId = location.state;
    console.log('TopicId', TopicId);
    const Params = useParams();
    const ChapterId = Params.chapter;
    console.log('ChapterId', ChapterId);

    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [Order, setOrder] = useState(0);
    const [QuizProgress, setQuizProgress] = useState(new Array(QUESTIONs.length).fill(null));

    const [SelectedAnswer, setSelectedAns] = useState(null);

    useEffect(() => {
        // const token = user?.token; // === FIX ===
        const token = '';
        const fetchDataTopicAPI = async () => {
            try {
                const questionData = await fetchData(`api/topic/${TopicId}`, token);
                console.log('questionData', questionData);
                setQUESTIONs(questionData.questions);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        const fetchDataQuizAPI = async () => {
            try {
                // Đổi API thành lấy ngẫu nhiên 10 Questions từ Chapter truyền vào === FIX ===
                const questionData = await fetchData(`api/topic/${TopicId.split('-')[1]}`, token);
                console.log('questionData', questionData);
                setQUESTIONs(questionData.questions);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        const fetchDataAdvancedAPI = async () => {
            try {
                // Đổi API thành lấy Advanced Questions từ Chapter truyền vào === FIX ===
                const questionData = await fetchData(`api/topic/${TopicId.split('+')[1]}`, token);
                console.log('questionData', questionData);
                setQUESTIONs(questionData.questions);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        if (!(String(TopicId).includes('-')) && !(String(TopicId).includes('+'))) fetchDataTopicAPI();
        else if (String(TopicId).includes('-')) fetchDataQuizAPI();
        else if (String(TopicId).includes('+')) fetchDataAdvancedAPI();
    }, [TopicId]);

    const handleChangeQuestion = () => {
        console.log('Change Question');
        formRef.current.reset();
        setOrder(p => p + 1);
        setSelectedAns(null);
    };

    const handleCheckQuestion = (e) => {
        e.preventDefault();
        console.log('handleCheckQuestion');
        if (SelectedAnswer == null) return;

        const NewQuizProgress = [...QuizProgress];
        if (SelectedAnswer == QUESTIONs[Order].correctAnswer) {
            NewQuizProgress[Order] = true;
            console.log('Status: ', true);
        } else {
            NewQuizProgress[Order] = false;
            console.log('Status: ', false);
        }
        setQuizProgress(NewQuizProgress);
        console.log('SelectedAnswer: ', SelectedAnswer);
    };

    const updateDataAPI = async (Percent) => {
        const TopicProgressData = {
            score: Percent,
            userId: Number(user?.id),
            topicId: (!(String(TopicId).includes('-')) && !(String(TopicId).includes('+'))) ? TopicId : 1,// Chỉnh thành null nếu là Quiz hoặc thêm thuộc tính ChapterId và Note
        };
        console.log('TopicProgressData:', TopicProgressData);

        // const token = user?.token; // === FIX ===
        const token = '';
        try {
            // Lưu lịch sử vào Topic Progress
            const updatedData = await postData(`api/topicprogress`, TopicProgressData, token);
            console.log('updatedData', updatedData);

            // Lấy tiến trình hiện tại của Subject đó
            const SubjectId = localStorage.getItem('SubjectId');
            const boughtSubjectData = await fetchData(`api/boughtsubject/user/${user.id}`, token);
            const currentProgressData = await fetchData(`api/progress/boughtsubject/${boughtSubjectData.find(bs => bs.id == SubjectId).id}`, token);
            console.log('currentProgressData', currentProgressData);

            if (updatedData.score >= 10) {
                const chapters = await fetchData(`api/chapter`);
                const chapter = chapters.find(c => c.id == ChapterId);

                if (!(String(TopicId).includes('-')) && !(String(TopicId).includes('+'))) {
                    // Nếu đang ở Topic có Topic.number bằng với Process.Topic và Chapter.number bằng với Process.Chapter, không phải Quiz, thì cộng tiến trình Topic lên 1
                    console.log('It is a Topic');
                    const topic = await fetchData(`api/topic/${TopicId}`);

                    if (chapter.number == currentProgressData.chapter && topic.number == currentProgressData.topic) {
                        console.log('Current Topic');
                        const newProgressData = {
                            chapter: currentProgressData.chapter,
                            topic: currentProgressData.topic + 1,
                        };
                        console.log('newProgressData:', newProgressData);

                        await patchData(`api/progress?id=${currentProgressData.id}`, newProgressData, token);

                    } else console.log('Not current Topic');
                }
                else if (String(TopicId).includes('-')) {
                    // Nếu đang ở Quiz của Chapter có number trùng với Process.Chapter thì mở khóa Chapter mới, đưa tiến trình Topic về 1
                    console.log('It is a Quiz');

                    if (chapter.number == currentProgressData.chapter) {
                        console.log('Current Quiz');
                        const newProgressData = {
                            chapter: currentProgressData.chapter + 1,
                            topic: 1,
                        };
                        console.log('newProgressData:', newProgressData);

                        await patchData(`api/progress?id=${currentProgressData.id}`, newProgressData, token);

                    } else console.log('Not current Chapter');
                } else console.log('Not Quiz or Topic');
            } else console.log('Percent < 10%');

            navigate('/learn');
        } catch (error) {
            console.log('Saving progress failed');
        }
    };

    const CorrectCount = QuizProgress.filter(q => q === true).length;
    const Percent = parseInt(100 * CorrectCount / QUESTIONs.length);
    const handleFinish = () => {
        updateDataAPI(Percent);
    };

    if (loading) return <Loading Size={'Large'} />
    if (QUESTIONs.length <= 0) navigate('/learn');
    return (
        <div className='studying-container'>
            {Order < QUESTIONs.length ? (
                <div className='card-study'>
                    <div className='heading'>
                        <Link to='/'><i className='fa-solid fa-xmark'></i></Link>
                        <div className='current-question'>Question {Order + 1} of {QUESTIONs.length}</div>
                        <div className='studying-progress'>
                            {[...Array(QUESTIONs.length)].map((_, i) => (
                                <div
                                    key={i}
                                    className='question-order'
                                    style={{
                                        backgroundColor: QuizProgress[i] === true ? '#59d600'
                                            : (QuizProgress[i] === false ? '#ff3333'
                                                : '#eee'
                                            ),
                                        border: `2px solid ${QuizProgress[i] === true ? '#28a745'
                                            : (QuizProgress[i] === false ? '#dc3545'
                                                : '#aaa'
                                            )}`,
                                        boxShadow: i === Order ? `0 0 0 6px ${QuizProgress[i] === true ? '#55cc0066'
                                            : (QuizProgress[i] === false ? '#ff000066'
                                                : '#ddd'
                                            )}`
                                            : 'none',
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className='content'>
                        <form ref={formRef} onSubmit={handleCheckQuestion}>
                            <div className='information'>
                                <div className='question'>{QUESTIONs[Order].question1}</div>
                            </div>
                            {(() => {
                                if (QUESTIONs[Order].type === 'Multiple') {
                                    return <MultipleForm Question={QUESTIONs[Order]} Status={QuizProgress[Order]} SelectedAnswer={SelectedAnswer} setSelectedAns={setSelectedAns} />
                                } else return (
                                    <MultipleForm Question={QUESTIONs[Order]} Status={QuizProgress[Order]} SelectedAnswer={SelectedAnswer} setSelectedAns={setSelectedAns} />

                                    // <div className='answer-group'>
                                    //     ELSE
                                    //     {RandomAnswers.map((ans, i) => (
                                    //         <label key={i} className='radio-label'>
                                    //             <input
                                    //                 type='radio'
                                    //                 name='choice'
                                    //                 value={ans}
                                    //                 className='hidden-radio'
                                    //             // onChange={handleChange}
                                    //             />
                                    //             <div className={
                                    //                 `radio-box ${QuizProgress[Order] === true ? 'correct-answer'
                                    //                     : (QuizProgress[Order] === false ? 'incorrect-answer'
                                    //                         : '')
                                    //                 }`
                                    //             }>{ans}</div>
                                    //         </label>
                                    //     ))}
                                    // </div>
                                )
                            })()}
                            <div className={`check-result ${QuizProgress[Order] === true ? 'correct-result'
                                : (QuizProgress[Order] === false ? 'incorrect-result'
                                    : '')
                                }`
                            }>
                                <div className='result-status'>
                                    {QuizProgress[Order] == null ? <i className='fa-solid fa-ellipsis'></i>
                                        : (QuizProgress[Order] === true ?
                                            <>
                                                <i className='fa-solid fa-circle-check'></i>
                                                <div className='text-status'>Correct</div>
                                            </>
                                            :
                                            <>
                                                <i className='fa-solid fa-circle-xmark'></i>
                                                <div className='text-explanation'>{QUESTIONs[Order].explanation || 'No explanation'}</div>
                                            </>
                                        )
                                    }
                                    {/* <i className='fa-solid fa-ellipsis'></i>
                                    <i className='fa-solid fa-circle-check'></i>
                                    <i className='fa-solid fa-circle-xmark'></i>
                                    <div>{QUESTIONs[Order].Explanation}</div> */}
                                </div>
                                <div>
                                    <Button
                                        width={'200px'}
                                        height={'52px'}
                                        border={'6px'}
                                        radius={'16px'}
                                        maincolor={
                                            QuizProgress[Order] == null ? 'white'
                                                : (QuizProgress[Order] === true ? 'correct'
                                                    : (QuizProgress[Order] === false ? 'incorrect'
                                                        : 'white'))
                                        }
                                        active={false}
                                        onToggle={QuizProgress[Order] == null ? handleCheckQuestion : handleChangeQuestion}
                                    >
                                        {QuizProgress[Order] == null ? 'CHECK' : 'CONTINUE'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
                :
                <div className='card-study card-finish'>
                    {Percent === 100 ?
                        <><div className='percent perfect'>{Percent}%</div>
                            <div className='text perfect'>Perfect!</div></> :
                        ((Percent < 100 && Percent >= 80) ?
                            <><div className='percent welldone'>{Percent}%</div>
                                <div className='text welldone'>Well done!</div></> :
                            ((Percent < 80 && Percent >= 50) ?
                                <><div className='percent good'>{Percent}%</div>
                                    <div className='text good'>Good!</div></> :
                                <><div className='percent tryharder'>{Percent}%</div>
                                    <div className='text tryharder'>Try Harder!</div></>
                            ))}
                    <div className='btn-box'>
                        <div className='bonus'>
                            <div className='point'>+{CorrectCount * 10}</div><i className='fa-solid fa-lightbulb'></i>
                        </div>
                        <Button
                            width={'120px'}
                            height={'52px'}
                            border={'6px'}
                            radius={'16px'}
                            maincolor={'correct'}
                            active={false}
                            onToggle={handleFinish}
                        >
                            FINISH
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}
