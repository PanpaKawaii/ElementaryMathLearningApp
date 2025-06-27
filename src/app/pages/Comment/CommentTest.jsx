import React, { useState } from 'react';
import { comments } from '../../../mocks/DatabaseSample.js';
import './CommentTest.css';

export default function CommentTest() {

    const [COMMENTs, setCOMMENTs] = useState(comments);

    function getChildrenComment(Id, num) {

        const ChildrenComment = COMMENTs.filter(comment => comment.answer === Id);

        return (
            <div>
                {ChildrenComment.map((comment, i) => (
                    <div key={i} className='questions'>
                        {num <= 2 && num > 0 &&
                            <div className='head-block'>
                                <div className={`vertical-line ${i + 1 === ChildrenComment.length ? 'line-half' : 'line-full'}`}></div>
                                <div className='horizon-line'></div>
                            </div>
                        }
                        <div style={{ width: `${400 - 40 * num}px` }}>
                            <div key={i} className='content'>ID{comment.id}. {comment.content}</div>
                            <div>
                                {getChildrenComment(comment.id, num + 1)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='comment-container learn-container'>
            <h3>Comments</h3>
            {getChildrenComment(null, 0)}
        </div>
    )
}
