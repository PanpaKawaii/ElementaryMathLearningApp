import StarRating from '../../../../components/StarRating.jsx';
import './Feedback.css';

export default function Feedback({ FeedbackComment }) {
    return (
        <div className='feedback-container'>
            <div className='title'>Feedbacks</div>
            <div className='feedback-row'>
                {(FeedbackComment && FeedbackComment.length > 0) ? (
                    FeedbackComment.map((comment, index) => (
                        <div key={index} className='feedback-col'>
                            <div className='feedback-user'>
                                <img src={comment.user.image} alt={comment.user.name}></img>
                                <div className='name-purchasedate'>
                                    <div className='name'>{comment.user.name}</div>
                                    <div className='purchasedate'>Purchase: {comment.purchaseDate?.substring(0, 10)}</div>
                                </div>
                            </div>
                            <StarRating Rating={comment.rating} Size={'1em'} Color={'#ffd700'} />
                            <div className='comment-content'>{false ? comment.feedback : <i>(No feedbacks)</i>}</div>
                        </div>
                    ))
                ) : (
                    <div>No feedbacks.</div>
                )}
            </div>
        </div>
    )
}
