import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { questions } from '../../../mocks/DatabaseSample.js';
import { fetchData } from '../../../mocks/CallingAPI.js'
import MultipleForm from './Form/MultipleForm.jsx';
import Button from '../../components/Button.jsx';
import Loading from '../../layouts/Loading/Loading.jsx';
import './Studying.css';

export default function Studying() {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const TopicId = useParams();

    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [Order, setOrder] = useState(0);
    const [QuizProgress, setQuizProgress] = useState(new Array(QUESTIONs.length).fill(null));

    const [SelectedAnswer, setSelectedAns] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const questionData = await fetchData(`api/topic/${TopicId.id}`, token);
                console.log('questionData', questionData);
                setQUESTIONs(questionData.questions);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAPI();
        // }, [user]);
    }, [TopicId]);

    // useEffect(() => {
    //     // Hàm để lưu tiến độ vào localStorage khi tắt hoặc chuyển trang
    //     const handleBeforeUnload = () => {
    //         localStorage.setItem('Progress', QuizProgress);
    //         console.log('Progress saved to localStorage', QuizProgress);
    //     };

    //     // Lắng nghe sự kiện beforeunload (tắt hoặc chuyển trang)
    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     // Cleanup khi component unmount
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);

    useEffect(() => {
        // Cleanup function (sẽ chạy khi component unmount)
        return () => {
            localStorage.setItem('Progress', QuizProgress);
            console.log('Progress saved to localStorage', QuizProgress);
        };
    }, [QuizProgress]);

    const handleChangeQuestion = () => {
        console.log('Change Question');
        formRef.current.reset();
        setOrder(p => p + 1);
        setSelectedAns(null);
    };

    const handleCheckQuestion = (e) => {
        e.preventDefault();
        console.log('handleCheckQuestion');
        // const Choice = e.target.choice.value;
        // if (!Choice) return;
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
        // console.log('Choice: ', Choice);
    };

    const CorrectCount = QuizProgress.filter(q => q === true).length
    const Percent = CorrectCount / QUESTIONs.length
    const handleFinish = () => {
        navigate('/learn');
    };

    if (loading) return <Loading />
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
                                // let RandomAnswers = [...QUESTIONs[Order].Answers].sort(() => Math.random() - 0.5);
                                // let RandomAnswers = [...QUESTIONs[Order].Answers];

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
                            {/* <div>
                                <button type='submit' className='btn'>CHECK</button>
                                <button type='button' onClick={() => { handleChangeQuestion() }}>CONTINUE</button>
                            </div> */}
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
                                                <div className='text-explanation'>{QUESTIONs[Order].explaination}</div>
                                            </>
                                        )
                                    }
                                    {/* <i className='fa-solid fa-ellipsis'></i>
                                    <i className='fa-solid fa-circle-check'></i>
                                    <i className='fa-solid fa-circle-xmark'></i>
                                    <div>{QUESTIONs[Order].Explanation}</div> */}
                                </div>
                                <div>
                                    {QuizProgress[Order] == null &&
                                        <Button
                                            width={'200px'}
                                            height={'52px'}
                                            border={'6px'}
                                            radius={'16px'}
                                            maincolor={'white'}
                                            active={false}
                                            onToggle={handleCheckQuestion}
                                        >
                                            CHECK
                                        </Button>
                                    }
                                    {QuizProgress[Order] != null &&
                                        <Button
                                            width={'200px'}
                                            height={'52px'}
                                            border={'6px'}
                                            radius={'16px'}
                                            maincolor={QuizProgress[Order] === true ? 'correct'
                                                : (QuizProgress[Order] === false ? 'incorrect'
                                                    : 'white')
                                            }
                                            active={false}
                                            onToggle={handleChangeQuestion}
                                        >
                                            CONTINUE
                                        </Button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
                :
                <div className='card-study card-finish'>
                    {/* <div className='percent perfect'>{100 * CorrectCount / QUESTIONs.length}%</div> */}
                    {Percent === 1 ?
                        <><div className='percent perfect'>{100 * Percent}%</div>
                            <div className='text perfect'>Perfect!</div></> :
                        ((Percent < 1 && Percent >= 0.8) ?
                            <><div className='percent welldone'>{100 * Percent}%</div>
                                <div className='text welldone'>Well done!</div></> :
                            ((Percent < 0.8 && Percent >= 0.5) ?
                                <><div className='percent good'>{100 * Percent}%</div>
                                    <div className='text good'>Good!</div></> :
                                <><div className='percent tryharder'>{100 * Percent}%</div>
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
                    {/* <Link to='/'><i className='fa-solid fa-xmark'></i></Link> */}
                </div>
            }
        </div>
    )
}
