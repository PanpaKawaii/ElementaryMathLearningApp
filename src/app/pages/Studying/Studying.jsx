import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { questions } from '../../../mocks/DatabaseSample.js';
import './Studying.css';

export default function Studying() {
    const formRef = useRef(null);

    const [QUESTIONs, setQUESTIONs] = useState(questions);
    const [Order, setOrder] = useState(0);
    const [QuizProgress, setQuizProgress] = useState(new Array(QUESTIONs.length).fill(null));

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
    };

    const handleCheckQuestion = (e) => {
        e.preventDefault();
        console.log('handleCheckQuestion');
        const Choice = e.target.choice.value;
        if (!Choice) return;

        const NewQuizProgress = [...QuizProgress];
        if (Choice == QUESTIONs[Order].CorrectAnswer) {
            NewQuizProgress[Order] = true;
            console.log('Status: ', true);
        } else {
            NewQuizProgress[Order] = false;
            console.log('Status: ', false);
        }
        setQuizProgress(NewQuizProgress);
        console.log('Choice: ', Choice);
    };

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
                                        backgroundColor: QuizProgress[i] === true ? '#28a745'
                                            : (QuizProgress[i] === false ? '#dc3545'
                                                : '#eee'
                                            ),
                                        border: `2px solid ${QuizProgress[i] === true ? '#22913c'
                                            : (QuizProgress[i] === false ? '#c02d3c'
                                                : '#aaa'
                                            )}`,
                                        boxShadow: i === Order ? `0 0 0 6px ${QuizProgress[i] === true ? '#d3f9d8'
                                            : (QuizProgress[i] === false ? '#fad7d9'
                                                : '#ddd'
                                            )}`
                                            : 'none',
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* <div>QUESTIONs.length: {QUESTIONs.length}</div> */}
                    {/* <div>Order: {Order}</div> */}
                    {/* {QUESTIONs.map((question, i) => (
                            <div key={i} className='questions'>
                                {i === Order ?
                                    <div className={`${i === Order ? 'question' : 'no-display'} question`}>
                                        <div className='information'>
                                            <div>i = {i}</div>
                                            <div>ID: {question.Id}</div>
                                            <div>Number: {question.Number}</div>
                                            <div>Type: {question.Type}</div>
                                            <div>Question: {question.Question}</div>
                                            <div>CorrectAnswer: {question.CorrectAnswer}</div>
                                            <div>Answers: {question.Answers.sort(() => Math.random() - 0.5).map((other_answer, i) => (
                                                <div key={i}>
                                                    - Ans{i + 1}: {other_answer}
                                                </div>
                                            ))}</div>
                                            <div>{question.Explaination}</div>
                                            <div>{question.Note}</div>
                                        </div>
                                        <form onSubmit={handleCheckQuestion}>
                                            {(() => {
                                                // let RandomAnswers = [...question.Answers].sort(() => Math.random() - 0.5);
                                                let RandomAnswers = [...question.Answers];

                                                return (
                                                    <div className='radio-group'>
                                                        {RandomAnswers.map((ans, i) => (
                                                            <label key={i} className='radio-label'>
                                                                <input
                                                                    type='radio'
                                                                    name='choice'
                                                                    value={ans}
                                                                    className='hidden-radio'
                                                                // onChange={handleChange}
                                                                />
                                                                <div className='radio-box'>{ans}</div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                );
                                            })()}
                                            <button className='btn'>CHECK</button>
                                            <div className='check-result'>
                                                <div>Result</div>
                                                {IsAnswered ?
                                                    <button onClick={() => { handleCheckQuestion() }}>CHECK</button>
                                                    :
                                                    <button onClick={() => { handleChangeQuestion() }}>CONTINUE</button>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                        ))} */}

                    <div className='content'>
                        {/* <div className='information'>
                                <div>Order: {Order}</div>
                                <div>ID: {QUESTIONs[Order].Id}</div>
                                <div>Number: {QUESTIONs[Order].Number}</div>
                                <div>Type: {QUESTIONs[Order].Type}</div>
                                <div>Question: {QUESTIONs[Order].Question}</div>
                                <div>CorrectAnswer: {QUESTIONs[Order].CorrectAnswer}</div>
                                <div>Answers: {QUESTIONs[Order].Answers.map((other_answer, i) => (
                                    <div key={i}>
                                        - Ans{i + 1}: {other_answer}
                                    </div>
                                ))}</div>
                                <div>{QUESTIONs[Order].Explaination}</div>
                                <div>{QUESTIONs[Order].Note}</div>
                            </div> */}
                        <form ref={formRef} onSubmit={handleCheckQuestion}>
                            <div className='information'>
                                <div className='question'>{QUESTIONs[Order].Question}</div>
                            </div>
                            {(() => {
                                // let RandomAnswers = [...QUESTIONs[Order].Answers].sort(() => Math.random() - 0.5);
                                let RandomAnswers = [...QUESTIONs[Order].Answers];

                                return (
                                    <div className='radio-group'>
                                        {RandomAnswers.map((ans, i) => (
                                            <label key={i} className='radio-label'>
                                                <input
                                                    type='radio'
                                                    name='choice'
                                                    value={ans}
                                                    className='hidden-radio'
                                                // onChange={handleChange}
                                                />
                                                <div className={
                                                    `radio-box ${QuizProgress[Order] === true ? 'correct-answer'
                                                        : (QuizProgress[Order] === false ? 'incorrect-answer'
                                                            : '')
                                                    }`
                                                }
                                                >{ans}</div>
                                            </label>
                                        ))}
                                    </div>
                                );
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
                                <div>Result</div>
                                {QuizProgress[Order] != null &&
                                    <div>{QUESTIONs[Order].Explaination}</div>}
                                {QuizProgress[Order] == null &&
                                    <button type='submit' className='btn'>CHECK</button>
                                }
                                {QuizProgress[Order] != null &&
                                    <button type='button' className='btn' onClick={() => { handleChangeQuestion() }}>CONTINUE</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            )
                :
                <div className='card-study'>
                    <div>FINISH</div>
                    <button onClick={() => { handleFinish() }}>FINISH</button>
                    <Link to='/'><i className='fa-solid fa-xmark'></i></Link>
                </div>
            }
        </div>
    )
}
