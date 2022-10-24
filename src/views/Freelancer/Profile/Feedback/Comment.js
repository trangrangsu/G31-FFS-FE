import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import Button from '../../../../components/Button';
import images from '../../../../assets/images';
import Image from '../../../../components/Image';
import styles from './Feedback.module.scss';
const cx = classNames.bind(styles);
function Comment({ userId }) {
    const [showAction, setShowAction] = useState(false);
    const [icon1, setIcon1] = useState(faStarRegular);
    const [icon2, setIcon2] = useState(faStarRegular);
    const [icon3, setIcon3] = useState(faStarRegular);
    const [icon4, setIcon4] = useState(faStarRegular);
    const [icon5, setIcon5] = useState(faStarRegular);
    const [disabled, setDisabled] = useState(true);
    const [commentValue, setCommentValue] = useState('');
    const handleChange = (e) => {
        const commentValue = e.target.value;
        if (!commentValue.startsWith(' ')) {
            setCommentValue(commentValue);
        }
    };
    const handleOnclick = (value) => {
        switch (value) {
            case 1:
                setIcon1(faStar);
                setIcon2(faStarRegular);
                setIcon3(faStarRegular);
                setIcon4(faStarRegular);
                setIcon5(faStarRegular);
                break;
            case 2:
                setIcon1(faStar);
                setIcon2(faStar);
                setIcon3(faStarRegular);
                setIcon4(faStarRegular);
                setIcon5(faStarRegular);
                break;
            case 3:
                setIcon1(faStar);
                setIcon2(faStar);
                setIcon3(faStar);
                setIcon4(faStarRegular);
                setIcon5(faStarRegular);
                break;
            case 4:
                setIcon1(faStar);
                setIcon2(faStar);
                setIcon3(faStar);
                setIcon4(faStar);
                setIcon5(faStarRegular);
                break;
            case 5:
                setIcon1(faStar);
                setIcon2(faStar);
                setIcon3(faStar);
                setIcon4(faStar);
                setIcon5(faStar);
                break;
            default:
        }
    };
    useEffect(() => {
        console.log(commentValue);
        if (commentValue !== '') setDisabled(false);
        else setDisabled(true);
    }, [commentValue]);
    return (
        <div className={cx('comment-form')}>
            <div className={cx('personal-avatar')}>
                <Image src={images.defaultAvatar} alt="avatar" />
            </div>
            <div className={cx('form-input')}>
                <div className={cx('comment-input')}>
                    <input
                        type="text"
                        placeholder="Viết đánh giá ..."
                        value={commentValue}
                        onChange={handleChange}
                        onFocus={() => setShowAction(true)}
                    />
                </div>
                {showAction && (
                    <div className={cx('comment-action')}>
                        <div className={cx('comment-action-left')}>
                            <FontAwesomeIcon icon={icon1} onClick={() => handleOnclick(1)} />
                            <FontAwesomeIcon icon={icon2} onClick={() => handleOnclick(2)} />
                            <FontAwesomeIcon icon={icon3} onClick={() => handleOnclick(3)} />
                            <FontAwesomeIcon icon={icon4} onClick={() => handleOnclick(4)} />
                            <FontAwesomeIcon icon={icon5} onClick={() => handleOnclick(5)} />
                        </div>
                        <div className={cx('comment-action-right')}>
                            <Button className={cx('custom-btn')} onClick={() => setShowAction(false)}>
                                Hủy
                            </Button>
                            <Button disabled={disabled ? disabled : false} className={cx('custom-btn2')}>
                                Đánh giá
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

Comment.propTypes = {
    userId: PropTypes.string.isRequired,
};
export default Comment;
