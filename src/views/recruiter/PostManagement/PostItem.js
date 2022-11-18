import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button, message as notification } from 'antd';
import { useSelector } from 'react-redux';

import * as recruiterPostManagementServices from '../../../services/recruiterPostManagementServices';
import config from '../../../config';
import CustomButton from '../../../components/Button';
import styles from './PostManagement.module.scss';

const cx = classNames.bind(styles);

function PostItem({ post }) {
    const navigate = useNavigate();
    const account = useSelector((state) => state.account);
    const isMemberShip = useSelector((state) => state.isMemberShip);
    const [message, setMessage] = useState('');

    const pushOnTopApi = async () => {
        const result = await recruiterPostManagementServices.pushOnTop(account.userId, post.jobId);
        console.log(result);
        if (result) {
            notification.success('Đẩy top thành công');
        } else if (result === false) {
            notification.warn('Bạn vừa đẩy top. Sau 2 tiếng bạn mới có thể đẩy lại.');
        } else {
            notification.error('Đẩy top thất bại');
        }
    };
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
    const handlePushOnTop = () => {
        pushOnTopApi();
    };
    return (
        <div className={cx('wrapper-post')}>
            <div className={cx('row-1')}>
                <CustomButton className={cx('post-title')} onClick={handleViewDetail}>
                    {post.jobTitle}
                </CustomButton>
                <div className={cx('row')}>
                    {post.status === 1 && isMemberShip && (
                        <div>
                            <Button type="primary" onClick={handlePushOnTop}>
                                Đẩy top
                            </Button>
                        </div>
                    )}
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
            {post.status === 1 && <p className={cx('')}>Số lượt ứng tuyển: {post.totalApplied}</p>}
        </div>
    );
}

export default PostItem;
