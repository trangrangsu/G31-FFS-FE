import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { message, Modal, Button, Input } from 'antd';

import * as recruiterPostManagementServices from '../../../services/recruiterPostManagementServices';
import * as firebase from '../../../firebase/firebase';
import CustomButton from '../../../components/Button';
import images from '../../../assets/images';
import Image from '../../../components/Image';
import config from '../../../config';
import styles from './FreelancerItem.module.scss';

const cx = classNames.bind(styles);
const FreelancerItem = ({ postId, freelancer, type, onDelete }) => {
    const navigate = useNavigate();

    const account = useSelector((state) => state.account);
    const [image, setImage] = useState(images.defaultAvatar);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [icon1, setIcon1] = useState(faStarRegular);
    const [icon2, setIcon2] = useState(faStarRegular);
    const [icon3, setIcon3] = useState(faStarRegular);
    const [icon4, setIcon4] = useState(faStarRegular);
    const [icon5, setIcon5] = useState(faStarRegular);
    const [star, setStar] = useState(1);

    const responseJobApplyApi = async (mess, status) => {
        const result = await recruiterPostManagementServices.responseJobApply(freelancer.id, postId, status);
        if (result) {
            message.info(mess + ' thành công');
            onDelete(freelancer.id);
        } else {
            message.error(mess + ' thất bại');
        }
    };
    const addFeedbackApi = async (data) => {
        const result = await recruiterPostManagementServices.addFeedback(data);
        if (result) {
            message.info('Đánh giá thành công');
        } else {
            message.error('Đánh giá thất bại');
        }
    };
    useEffect(() => {
        if (freelancer.avatar !== null) {
            firebase.downloadFile(freelancer.id, 'avatar', freelancer.avatar, setImage);
        }
    }, []);
    const handleApprove = () => {
        responseJobApplyApi('Chấp thuận', 1);
    };
    const handleDeny = () => {
        responseJobApplyApi('Từ chối', 0);
    };
    const handleViewDetail = () => {
        const to = {
            pathname: config.routes.viewDetailFreelancer,
            search: `?id=${freelancer.id}`,
        };
        navigate(to);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        const data = {};
        data.fromUserId = account.userId;
        data.toUserId = freelancer.id;
        data.jobId = postId;
        data.star = star;
        data.content = commentValue;
        addFeedbackApi(data);
        setStar(1);
        setCommentValue('');
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChange = (e) => {
        const commentValue = e.target.value;
        if (!commentValue.startsWith(' ')) {
            setCommentValue(commentValue);
        }
    };
    const handleOnclick = (value) => {
        setStar(value);
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
                            <CustomButton className={cx('post-title')} onClick={handleViewDetail}>
                                {freelancer.fullName}
                            </CustomButton>
                        </div>
                        <div className={cx('freelancer-location')}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <p>{freelancer.city}</p>
                        </div>
                    </div>
                    {type === 2 && (
                        <div className={cx('action')}>
                            <CustomButton className={cx('btn-approve')} onClick={handleApprove}>
                                Chấp thuận
                            </CustomButton>
                            <CustomButton className={cx('btn-deny')} onClick={handleDeny}>
                                Từ chối
                            </CustomButton>
                        </div>
                    )}
                    {type === 1 && (
                        <div className={cx('action')}>
                            <Button type="primary" onClick={showModal}>
                                Đánh giá
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
                                <FontAwesomeIcon className={cx('ic-cmt')} icon={faStar} />
                            </div>
                        </div>
                        <div className={cx('right-area')}>
                            <div className={cx('avg-star-point')}>{freelancer.star} điểm</div>
                            <div className={cx('total-number-feedback')}>
                                Tổng số phản hồi {freelancer.totalFeedbacks}
                            </div>
                        </div>
                        <div className={cx('cost')}>
                            <p>Chi phí/Giờ:{freelancer.costPerHour}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Đánh giá" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input size="large" placeholder="viết đánh giá tại đây" value={commentValue} onChange={handleChange} />
                <div className={cx('comment-action-left')}>
                    <FontAwesomeIcon icon={icon1} onClick={() => handleOnclick(1)} />
                    <FontAwesomeIcon icon={icon2} onClick={() => handleOnclick(2)} />
                    <FontAwesomeIcon icon={icon3} onClick={() => handleOnclick(3)} />
                    <FontAwesomeIcon icon={icon4} onClick={() => handleOnclick(4)} />
                    <FontAwesomeIcon icon={icon5} onClick={() => handleOnclick(5)} />
                </div>
            </Modal>
        </div>
    );
};

export default FreelancerItem;
