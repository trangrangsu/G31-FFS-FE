import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import * as firebase from '../../firebase/firebase';
import Image from '../Image';
import config from '../../config';
import images from '../../assets/images';
import styles from './UserHeader.module.scss';
const cx = classNames.bind(styles);

function NotificationItem({ item }) {
    const navigate = useNavigate();
    const [image, setImage] = useState(images.defaultAvatar);
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (item.avatar !== '') {
            firebase.downloadFile(item.userId, 'avatar', item.avatar, setImage);
        }
    }, []);
    const generateMessage = () => {
        if (item.type === 2) {
            setMessage('đã ứng tuyển vào bài đăng');
        } else if (item.type === 1) {
            setMessage('đã giao việc cho bạn trong bài đăng');
        } else {
            setMessage('đã từ chối giao việc cho bạn trong bài đăng');
        }
    };
    useEffect(() => {
        generateMessage();
    }, []);
    const handleViewDetailPost = () => {
        const to = {
            search: `?id=${item.postId}`,
        };
        if (item.type === 2) {
            to.pathname = config.routes.postApplyManagement;
        } else {
            to.pathname = config.routes.viewDetailPost;
        }
        navigate(to);
    };
    return (
        <div className={cx('wrapper-item')} onClick={handleViewDetailPost}>
            <div className={cx('avatar-item')}>
                <Image className={cx('noti-avatar')} src={image} alt="Nguyen Van A" />
            </div>
            <div className={cx('container-item')}>
                <div className={cx('content')}>
                    <p>
                        <b>{item.userName}</b> {message} <b>{item.postTitle}</b>
                    </p>
                </div>
                <div className={cx('time')}>
                    <p>{item.time}</p>
                </div>
            </div>
        </div>
    );
}

export default NotificationItem;
