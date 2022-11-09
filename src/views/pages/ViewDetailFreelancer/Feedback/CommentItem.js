import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import * as firebase from '../../../../firebase/firebase';
import images from '../../../../assets/images';
import Image from '../../../../components/Image';
import styles from './Feedback.module.scss';
const cx = classNames.bind(styles);
function CommentItem({ comment }) {
    const [image, setImage] = useState(images.defaultAvatar);
    useEffect(() => {
        if (comment.fromAvatar !== null) {
            firebase.downloadFile(comment.fromUserId, 'avatar', comment.fromAvatar, setImage);
        }
    }, [image]);
    const renderStar = (starNum) => {
        let array = [];
        for (let i = 0; i < 5; i++) {
            if (i <= starNum - 1) array[i] = 'solid';
            else array[i] = 'angular';
        }
        return array.map((type, index) => {
            if (type === 'solid') return <FontAwesomeIcon icon={faStar} key={index} />;
            else return <FontAwesomeIcon icon={faStarRegular} key={index} />;
        });
    };
    return (
        <div className={cx('comment-wrapper')}>
            <div className={cx('left')}>
                <div className={cx('avatar')}>
                    <Image src={image} alt="avatar" />
                </div>
                <div className={cx('info')}>
                    <p className={cx('name')}>{comment.fromFullName}</p>
                    <p className={cx('date')}>{comment.date}</p>
                </div>
            </div>
            <div className={cx('right')}>
                {renderStar(comment.star)}
                <p>{comment.content}</p>
            </div>
        </div>
    );
}
CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
};
export default CommentItem;
