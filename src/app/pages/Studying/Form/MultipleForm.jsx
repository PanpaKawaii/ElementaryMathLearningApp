import React from 'react';
import Button from '../../../components/Button';
import './MultipleForm.css';

export default function MultipleForm({ Question, Status, SelectedAnswer, setSelectedAns }) {
    return (
        <div className='answer-group'>
            {Question.Answers.map((ans, i) => (
                // <label key={i} className='radio-label'>
                //     <input
                //         type='radio'
                //         name='choice'
                //         value={ans}
                //         className='hidden-radio'
                //     />
                //     <div className={
                //         `radio-box ${QuizProgress[Order] === true ? 'correct-answer'
                //             : (QuizProgress[Order] === false ? 'incorrect-answer'
                //                 : '')
                //         }`
                //     }>{ans}</div>

                <React.Fragment key={i}>
                    <Button
                        width={'400px'}
                        height={'80px'}
                        border={'6px'}
                        radius={'20px'}
                        maincolor={`${ans == SelectedAnswer ?
                            (Status === true ? 'correct'
                                : (Status === false ? 'incorrect'
                                    : 'locked'))
                            : 'white'}`}
                        active={ans == SelectedAnswer}
                        onToggle={() => { if (Status == null) { setSelectedAns(ans) } }}
                    >
                        <div className='text'>{ans}</div>
                    </Button>
                </React.Fragment>
                // </label>
            ))}
        </div>
    )
}
