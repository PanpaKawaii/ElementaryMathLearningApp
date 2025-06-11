import React from 'react';
import { Comment } from '../../../mocks/DatabaseSample.js';
import './Comment.css';

export default function CommentTest() {

    const MainComment = Comment.filter(comment => comment.Answer === null);

    function getChildrenComment(Id, num) {
        const ChildrenComment = Comment.filter(comment => comment.Answer === Id);

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
                        <div>
                            <div key={i}>ID{comment.Id}. {comment.Content}</div>
                            <div>
                                {getChildrenComment(comment.Id, num + 1)}
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
            {/* {MainComment.map((comment, i) => (
                <div key={i}>
                    <div key={i}>{comment.Id}. {comment.Content}</div>
                    <div>
                        {getChildrenComment(comment.Id, 1)}
                    </div>
                </div>
            ))} */}
            {getChildrenComment(null, 0)}
        </div>
    )
}
