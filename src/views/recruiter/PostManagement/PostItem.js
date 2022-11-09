import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import * as searchPostFreelancerServices from '../../../services/searchPostFreelancerServices';
import config from '../../../config';
import Button from '../../../components/Button';
import styles from './PostManagement.module.scss';

const cx = classNames.bind(styles);

function PostItem({ post }) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (post.status === 1) {
            setMessage('Đã duyệt');
        }
        if (post.status === 0) {
            setMessage('Không duyệt');
        }
        if (post.status === 2) {
            setMessage('Đang chờ');
        }
    }, []);

    const handleViewDetail = () => {
        const to = {
            pathname: config.routes.postApplyManagement,
            search: `?id=${post.jobId}`,
        };
        navigate(to);
    };
    return (
        <div className={cx('wrapper-post')}>
            <div className={cx('row-1')}>
                <Button className={cx('post-title')} onClick={handleViewDetail}>
                    {post.jobTitle}
                </Button>
                <div>
                    <div className={cx('message', 'message' + post.status)}>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
            <div className={cx('row-2')}>
                <div className={cx('post-posted-time')}>{post.timeCount}</div>
            </div>
            <div className={cx('row-3')}>{post.description}</div>
            <div className={cx('row-4')}>
                <p className={cx('post-subCareer')}>{post.subCareer}</p>
            </div>
            {post.status === 1 && <p className={cx('')}>Số lượt tuyển: {post.totalApplied}</p>}
        </div>
    );
}

export default PostItem;
