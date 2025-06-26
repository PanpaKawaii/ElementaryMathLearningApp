import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { questions } from '../../../mocks/DatabaseSample.js';
import MultipleForm from './Form/MultipleForm.jsx';
import Button from '../../components/Button.jsx';
import './Studying.css';

export default function Studying() {
    const formRef = useRef(null);

    const [QUESTIONs, setQUESTIONs] = useState(questions);
    const [Order, setOrder] = useState(0);
    const [QuizProgress, setQuizProgress] = useState(new Array(QUESTIONs.length).fill(null));

    const [SelectedAnswer, setSelectedAns] = useState(null);

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
        if (SelectedAnswer == QUESTIONs[Order].CorrectAnswer) {
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
    const handleFinish = () => {

    };

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
                                <div className='question'>{QUESTIONs[Order].Question}</div>
                            </div>
                            {(() => {
                                // let RandomAnswers = [...QUESTIONs[Order].Answers].sort(() => Math.random() - 0.5);
                                // let RandomAnswers = [...QUESTIONs[Order].Answers];

                                if (QUESTIONs[Order].Type === 'Multiple') {
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
                                                <div className='text-explaination'>{QUESTIONs[Order].Explaination}</div>
                                            </>
                                        )
                                    }
                                    {/* <i className='fa-solid fa-ellipsis'></i>
                                    <i className='fa-solid fa-circle-check'></i>
                                    <i className='fa-solid fa-circle-xmark'></i>
                                    <div>{QUESTIONs[Order].Explaination}</div> */}
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
                    <div className='percent'>{100 * CorrectCount / QUESTIONs.length}%</div>
                    <div className='text'>Well done!</div>
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
