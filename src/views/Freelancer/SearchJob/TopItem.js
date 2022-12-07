import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import Image from '../../../components/Image';
import * as firebase from '../../../firebase/firebase';
import config from '../../../config';
import Button from '../../../components/Button';
import images from '../../../assets/images';
import styles from './SearchJob.module.scss';

const cx = classNames.bind(styles);

function TopItem({ post }) {
    const navigate = useNavigate();
    const [image, setImage] = useState(images.defaultAvatar);

    useEffect(() => {
        if (post.recruiter.avatar !== null && post.recruiter.avatar !== '')
            firebase.downloadFile(post.recruiter.id, 'avatar', post.recruiter.avatar, setImage);
    }, []);
    const handleViewDetail = () => {
        const to = {
            pathname: config.routes.viewDetailPost,
            search: `?id=${post.id}`,
        };
        navigate(to);
    };
    return (
        <div className={cx('box')} onClick={handleViewDetail}>
            <div className={cx('wrapper-top')}>
                <Image src={image} alt="avatar" />
                <div className={cx('top-title')}>{post.title}</div>
                <div className={cx('background-sub-career')}>
                    <p className={cx('top-text', 'top-padding')}>{post.subcareer}</p>
                </div>
                <div className={cx('top-container')}>
                    <FontAwesomeIcon className={cx('top-icon')} icon={faLocationDot} />
                    <p className={cx('top-text')}>{post.area}</p>
                </div>
                <div className={cx('top-container')}>
                    <div className={cx('top-text')}>{post.typebudget}: </div>
                    <div className={cx('top-text', 'top-margin')}> {post.bugget} VND</div>
                </div>
            </div>
            <span className={cx('left-top')}></span>
            <span className={cx('top-top')}></span>
            <span className={cx('right-top')}></span>
            <span className={cx('bottom-top')}></span>
        </div>
    );
}

export default TopItem;
