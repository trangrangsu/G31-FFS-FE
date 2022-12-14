import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';

import * as freelancerProfileServices from '../../../../services/freelancerProfileServices';
import Comment from './Comment';
import CommentItem from './CommentItem';
import styles from './Feedback.module.scss';
const cx = classNames.bind(styles);
const currentUserId = localStorage.getItem('userId');
function Feedback({ userId }) {
    const [starAverage, setStarAverage] = useState(0);
    const [totalFeedback, setTotalFeedback] = useState(0);
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(5);
    const fetchApi = async (pageIndex) => {
        const result = await freelancerProfileServices.getFeedbacks(userId, pageIndex);
        console.log(result);
        setStarAverage(result.starAverage);
        setTotalFeedback(result.totalFeedback);
        setComments(result.comments);
        setTotalItems(result.totalResults);
    };
    useEffect(() => {
        fetchApi(0);
    }, []);
    const onChange = (page, pageSize) => {
        fetchApi(page - 1);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Đánh giá</div>
            <div className={cx('content')}>
                {totalFeedback > 0 && (
                    <>
                        <div className={cx('star-average')}>
                            <p className={cx('star-average-big')}>{starAverage.toFixed(1)}</p>
                            <div>
                                <FontAwesomeIcon icon={faStar} />
                                <p>{totalItems} lượt đánh giá</p>
                            </div>
                        </div>
                        {comments.map((comment) => (
                            <CommentItem comment={comment} key={comment.id} />
                        ))}
                        {totalItems > 5 && (
                            <Pagination defaultCurrent="1" pageSize="5" total={totalItems} onChange={onChange} />
                        )}
                    </>
                )}
                {totalItems === 0 && <p>Chưa có đánh giá</p>}
            </div>
        </div>
    );
}
Feedback.propTypes = {
    userId: PropTypes.string.isRequired,
};
export default Feedback;
