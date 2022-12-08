import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button, message as notificationMess, Popconfirm, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import * as recruiterPostManagementServices from '../../../services/recruiterPostManagementServices';
import config from '../../../config';
import CustomButton from '../../../components/Button';
import styles from './PostManagement.module.scss';

const cx = classNames.bind(styles);
const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Thông báo',
        description: 'Tài khoản không còn đủ số dư. Vui lòng nạp thêm tiền',
    });
};
const openNotificationPush = (type, mess) => {
    notification[type]({
        message: 'Thông báo',
        description: mess,
    });
};
function PostItem({ post }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const text = 'Phí đẩy top là ' + account.feePushTop + '$';
    const accountBalance = useSelector((state) => state.accountBalance);
    const isMemberShip = useSelector((state) => state.isMemberShip);
    const currentServiceName = useSelector((state) => state.currentServiceName);
    const [message, setMessage] = useState('');

    const pushOnTopApi = async () => {
        const result = await recruiterPostManagementServices.pushOnTop(account.userId, post.jobId);
        console.log(result);
        if (result === true) {
            notificationMess.success('Đẩy top thành công');
            dispatch({ type: 'set', accountBalance: accountBalance - account.feePushTop });
        } else {
            openNotificationPush('error', result.response.data);
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
    const checkWallet = () => {
        if (accountBalance - account.feePushTop > 0) {
            pushOnTopApi();
        } else {
            openNotificationWithIcon('warning');
        }
    };
    return (
        <div className={cx('wrapper-post')}>
            <div className={cx('row-1')}>
                <CustomButton className={cx('post-title')} onClick={handleViewDetail}>
                    {post.jobTitle}
                </CustomButton>
                <div className={cx('row')}>
                    {post.status === 1 && isMemberShip && currentServiceName !== 'Gold' && (
                        <div>
                            <Popconfirm
                                placement="top"
                                title={text}
                                onConfirm={checkWallet}
                                okText="Đẩy"
                                cancelText="Hủy"
                            >
                                <Button type="primary">Đẩy top</Button>
                            </Popconfirm>
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
