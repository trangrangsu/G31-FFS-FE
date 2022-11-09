import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'antd';

import * as freelancerProfileServices from '../../../../services/freelancerProfileServices';
import CommentItem from './CommentItem';
import styles from './Feedback.module.scss';
const cx = classNames.bind(styles);

function Feedback({ userId }) {
    const [starAverage, setStarAverage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(5);
    const fetchApi = async (pageIndex) => {
        const result = await freelancerProfileServices.getFeedbacks(userId, pageIndex);
        console.log(result);
        setStarAverage(result.starAverage);
        setTotalResults(result.totalResults);
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
                {totalResults > 0 && (
                    <>
                        <div className={cx('star-average')}>
                            <p className={cx('star-average-big')}>{starAverage.toFixed(1)}</p>
                            <div>
                                <FontAwesomeIcon icon={faStar} />
                                <p>{totalResults} lượt đánh giá</p>
                            </div>
                        </div>
                        {comments.map((comment) => (
                            <CommentItem comment={comment} key={comment.id} />
                        ))}
                        {totalItems > 5 && (
                            <div className={cx('paging')}>
                                <Pagination defaultCurrent="1" pageSize="5" total={totalItems} onChange={onChange} />
                            </div>
                        )}
                    </>
                )}
                {setTotalResults === 0 && <p>Chưa có đánh giá</p>}
            </div>
        </div>
    );
}
Feedback.propTypes = {
    userId: PropTypes.string.isRequired,
};
export default Feedback;
