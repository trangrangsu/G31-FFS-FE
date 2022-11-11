import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import * as firebase from '../../firebase/firebase';
import Image from '../Image';
import config from '../../config';
import images from '../../assets/images';
import styles from './UserHeader.module.scss';
const cx = classNames.bind(styles);

function NotificationItem({ item }) {
    const itemTest = {
        postId: 1,
        postTitle: 'Tuyển nhân viên',
        userId: '123',
        userName: 'trang rang su',
        avatar: '',
        content: 'apply',
        time: '5 giờ trước',
    };
    const [image, setImage] = useState(images.defaultAvatar);
    useEffect(() => {
        if (itemTest.avatar !== '') {
            firebase.downloadFile(itemTest.userId, 'avatar', itemTest.avatar, setImage);
        }
    }, []);
    return (
        <div className={cx('wrapper-item')}>
            <div className={cx('avatar-item')}>
                <Image className={cx('noti-avatar')} src={image} alt="Nguyen Van A" />
            </div>
            <div className={cx('container-item')}>
                <div className={cx('content')}>
                    <p>
                        <b>{itemTest.userName}</b> đã giao việc cho bạn trong bài đăng <b>{itemTest.postTitle}</b>
                    </p>
                </div>
                <div className={cx('time')}>
                    <p>{itemTest.time}</p>
                </div>
            </div>
        </div>
    );
}

export default NotificationItem;
