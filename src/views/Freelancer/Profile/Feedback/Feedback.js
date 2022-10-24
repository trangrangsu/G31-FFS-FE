import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Comment from './Comment';
import CommentItem from './CommentItem';
import styles from './Feedback.module.scss';
const cx = classNames.bind(styles);
function Feedback({ userId }) {
    const [starAverage, setStarAverage] = useState(5);
    const [totalFeedback, setTotalFeedback] = useState(100);
    const comments = [
        {
            id: 1,
            star: 3,
            content: 'làm việc rất chuyên nghiệp',
            date: '20-10-2022 12:12',
            from: {
                userId: 'rf123456',
                fullName: 'Biện Văn Công',
            },
        },
        {
            id: 2,
            star: 3,
            content: 'làm việc rất chuyên nghiệp',
            date: '20-10-2022 12:12',
            from: {
                userId: 'rf123456',
                fullName: 'Biện Văn Công',
            },
        },
        {
            id: 3,
            star: 3,
            content: 'làm việc rất chuyên nghiệp',
            date: '20-10-2022 12:12',
            from: {
                userId: 'rf123456',
                fullName: 'Biện Văn Công',
            },
        },
        {
            id: 4,
            star: 3,
            content: 'làm việc rất chuyên nghiệp',
            date: '20-10-2022 12:12',
            from: {
                userId: 'rf123456',
                fullName: 'Biện Văn Công',
            },
        },
        {
            id: 5,
            star: 3,
            content: 'làm việc rất chuyên nghiệp',
            date: '20-10-2022 12:12',
            from: {
                userId: 'rf123456',
                fullName: 'Biện Văn Công',
            },
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Đánh giá</div>
            <div className={cx('content')}>
                <div className={cx('star-average')}>
                    <p className={cx('star-average-big')}>{starAverage.toFixed(1)}</p>
                    <div>
                        <FontAwesomeIcon icon={faStar} />
                        <p>{totalFeedback} lượt đánh giá</p>
                    </div>
                </div>
                <Comment userId="userId" />
                {comments.map((comment) => (
                    <CommentItem comment={comment} key={comment.id} />
                ))}
            </div>
        </div>
    );
}
Feedback.propTypes = {
    userId: PropTypes.string.isRequired,
};
export default Feedback;
