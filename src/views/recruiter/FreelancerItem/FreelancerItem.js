import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../components/Button';
import images from '../../../assets/images';
import Image from '../../../components/Image';
import styles from './FreelancerItem.module.scss';
const cx = classNames.bind(styles);
const FreelancerItem = ({ freelancer, type }) => {
    const [image, setImage] = useState(images.defaultAvatar);

    const handleApprove = () => {
        console.log('approve');
    };
    const handleDeny = () => {
        console.log('deny');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('avatar')}>
                    <Image src={image} alt="avatar" />
                </div>
            </div>
            <div className={cx('right')}>
                <div className={cx('row1')}>
                    <div className={cx('freelancer-username')}>
                        <div className={cx('name')}>
                            <p>{freelancer.userName}</p>
                        </div>
                        <div className={cx('freelancer-location')}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <p>{freelancer.area}</p>
                        </div>
                    </div>
                    {type === 'apply' && (
                        <div className={cx('action')}>
                            <Button className={cx('btn-approve')} onClick={handleApprove}>
                                Chấp thuận
                            </Button>
                            <Button className={cx('btn-deny')} onClick={handleDeny}>
                                Từ chối
                            </Button>
                        </div>
                    )}
                </div>
                <div className={cx('row2')}>
                    <div className={cx('freelancer-subcareer')}>{freelancer.subCareer}</div>
                    <div className={cx('row3')}>
                        <p>{freelancer.description}</p>
                    </div>
                    <div className={cx('row4')}>
                        <div className={cx('skills')}>
                            {freelancer.skills.map((skill) => {
                                return (
                                    <div key={skill.id} className={cx('skill')}>
                                        {skill.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('row5')}>
                        <div className={cx('left-area')}>
                            <div className={cx('feedback-title')}>AVG star</div>
                            <div className={cx('ic-feedback')}>
                                <FontAwesomeIcon IconclassName={cx('ic-cmt')} icon={faStar} />
                            </div>
                        </div>
                        <div className={cx('right-area')}>
                            <div className={cx('avg-star-point')}>{freelancer.avgStartPoint} điểm</div>
                            <div className={cx('total-number-feedback')}>
                                Tổng số {freelancer.totalFeedBack} phản hồi
                            </div>
                        </div>
                        <div className={cx('cost')}>
                            <p>Chi phí/Giờ:{freelancer.costPerHour}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerItem;
