import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faSackDollar,
    faStar,
    faBookmark as faBookmarkSolid,
    faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faBookmark, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { message, Modal, Button, Input, Popconfirm, Alert, notification } from 'antd';

import * as firebase from '../../../firebase/firebase';
import images from '../../../assets/images';
import Image from '../../../components/Image';
import config from '../../../config';
import CustomButton from '../../../components/Button';
import * as getPostDetailFreelancerServices from '../../../services/getPostDetailFreelancerServices';
import * as recruiterPostManagementServices from '../../../services/recruiterPostManagementServices';
import * as searchPostFreelancerServices from '../../../services/searchPostFreelancerServices';
import styles from './ViewDetailPost.module.scss';
const cx = classNames.bind(styles);
const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Thông báo',
        description: 'Tài khoản không còn đủ số dư. Vui lòng nạp thêm tiền',
    });
};
const ViewDetailPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const account = useSelector((state) => state.account);
    const accountBalance = useSelector((state) => state.accountBalance);
    const isMemberShip = useSelector((state) => state.isMemberShip);
    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apply, setApply] = useState('Ứng tuyển');
    const [isSolidHeart, setIsSolidHeart] = useState(false);
    const [save, setSave] = useState('Lưu');
    const [isSolidBookmark, setIsSolidBookmark] = useState(false);
    const [postDetail, setPostDetail] = useState({ createBy: {}, listSkills: [] });
    const [commentValue, setCommentValue] = useState('');
    const [messageComment, setMessageComment] = useState('');
    const [icon1, setIcon1] = useState(faStarRegular);
    const [icon2, setIcon2] = useState(faStarRegular);
    const [icon3, setIcon3] = useState(faStarRegular);
    const [icon4, setIcon4] = useState(faStarRegular);
    const [icon5, setIcon5] = useState(faStarRegular);
    const [star, setStar] = useState(0);
    const text = 'Phí ứng tuyển là ' + account.feeApplyJob + '$';
    const [document, setDocument] = useState('');
    const [documentURL, setDocumentURL] = useState('#');
    const [isValidPost, setIsValidPost] = useState(true);

    const getPostDetailApi = async (postId) => {
        const result = await getPostDetailFreelancerServices.getPostDetail(postId, account.userId);
        console.log(result);
        if (result !== undefined) {
            setPostDetail(result);
            setStatus(result.isApply);
            setDocument(result.attach);
            if (result.isSave) {
                setSave('Bỏ lưu');
                setIsSolidBookmark(true);
            }
            if (result.isApply === 2) {
                setApply('Bỏ ứng tuyển');
                setIsSolidHeart(true);
            }
        } else {
            setIsValidPost(false);
        }
    };
    const addJobSavedApi = async (postID) => {
        const result = await searchPostFreelancerServices.addJobSaved(account.userId, postID);
        console.log(result);
        if (result) {
            setIsSolidBookmark(!isSolidBookmark);
            if (!isSolidBookmark) {
                setSave('Bỏ lưu');
            } else {
                setSave('Lưu');
            }
        }
    };
    const applyPostApi = async (postID) => {
        const result = await getPostDetailFreelancerServices.addJobRequest(postID, account.userId);
        console.log(result);
        if (result) {
            dispatch({ type: 'set', accountBalance: accountBalance - account.feeApplyJob });
            setIsSolidHeart(!isSolidHeart);
            if (!isSolidHeart) {
                setApply('Bỏ ứng tuyển');
            } else {
                setApply('Ứng tuyển');
            }
        }
    };
    const deleteJobRequestApi = async (postID) => {
        const result = await getPostDetailFreelancerServices.deleteJobRequest(postID, account.userId);
        console.log(result);
        if (result) {
            setIsSolidHeart(!isSolidHeart);
            if (!isSolidHeart) {
                setApply('Bỏ ứng tuyển');
            } else {
                setApply('Ứng tuyển');
            }
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
        getPostDetailApi(searchParams.get('id'));
    }, [searchParams]);
    useEffect(() => {
        if (document !== '')
            firebase.downloadFile(postDetail.createBy.id, searchParams.get('id'), document, setDocumentURL);
    }, [document]);
    const handleViewDetailRecruiter = () => {
        const to = {
            pathname: config.routes.viewDetailRecruiter,
            search: `?id=${postDetail.createBy.id}`,
        };
        navigate(to);
    };
    const handleApply = () => {
        if (!isSolidHeart) {
            if (accountBalance - account.feeApplyJob > 0) {
                applyPostApi(postDetail.postID);
            } else {
                openNotificationWithIcon('warning');
            }
        } else {
            deleteJobRequestApi(postDetail.postID);
        }
    };
    const handleSave = () => {
        addJobSavedApi(postDetail.postID);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (commentValue === '' || star === 0) {
            setMessageComment('Vui lòng nhập nội dung đánh giá và vote sao');
        } else {
            setIsModalOpen(false);
            const data = {};
            data.fromUserId = account.userId;
            data.toUserId = postDetail.createBy.id;
            data.jobId = postDetail.postID;
            data.star = star;
            data.content = commentValue;
            addFeedbackApi(data);
            setStar(0);
            setCommentValue('');
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChange = (e) => {
        const commentValue = e.target.value;
        if (commentValue.length > 200) {
            return;
        }
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
            <div className={cx('page-title')}>Chi tiết bài đăng</div>
            {isValidPost ? (
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        <div id={cx('head-r')} className={cx('left-component')}>
                            <div className={cx('post-title')}>{postDetail.jobTitle}</div>
                            <p className={cx('post-posted-time')}>{postDetail.timeCount}</p>
                            <div className={cx('post-location')}>
                                {' '}
                                <div className={cx('post-location-ic')}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </div>
                                <div className={cx('post-location-name')}>{postDetail.area}</div>
                            </div>
                        </div>
                        <div className={cx('left-component')}>
                            <div className={cx('post-description')}>{postDetail.description}</div>
                            {document !== '' && (
                                <CustomButton text href={documentURL} className={cx('document')}>
                                    Tài liệu
                                </CustomButton>
                            )}
                        </div>
                        <div className={cx('left-component')}>
                            <div className={cx('post-budget-ic')}>
                                <FontAwesomeIcon icon={faSackDollar} />
                            </div>
                            <div className={cx('post-budget-payment')}>
                                <div className={cx('post-budget')}>{postDetail.budget}</div>
                                <div className={cx('post-payment')}>{postDetail.paymentType}</div>
                            </div>
                        </div>
                        <div className={cx('left-component')}>
                            <div className={cx('post-subcareers-title')}>Chuyên ngành & Kĩ năng</div>
                            <div className={cx('container-subCareer-skill')}>
                                <div className={cx('post-subcareers')}>
                                    <div className={cx('subcareer-title')}>Chuyên ngành</div>
                                    <div className={cx('subcareers')}>{postDetail.subCareer}</div>
                                </div>
                                <div className={cx('post-skills')}>
                                    <div className={cx('skill-title')}>Kĩ năng</div>
                                    {postDetail.listSkills.map((skill) => {
                                        return (
                                            <div className={cx('skill')} key={skill.id}>
                                                {skill.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div id={cx('head-r')} className={cx('right-component')}>
                            {status === -1 && (
                                <div className={cx('action')}>
                                    {isMemberShip && (
                                        <CustomButton
                                            className={cx('btn-apply')}
                                            leftIcon={
                                                <FontAwesomeIcon
                                                    className={cx('action-apply')}
                                                    icon={isSolidHeart ? faHeartSolid : faHeart}
                                                    onClick={handleApply}
                                                />
                                            }
                                            onClick={handleApply}
                                        >
                                            {apply}
                                        </CustomButton>
                                    )}
                                    {!isMemberShip && !isSolidHeart && (
                                        <Popconfirm
                                            placement="top"
                                            title={text}
                                            onConfirm={handleApply}
                                            okText="Ứng tuyển"
                                            cancelText="Hủy"
                                        >
                                            <CustomButton
                                                className={cx('btn-apply')}
                                                leftIcon={
                                                    <FontAwesomeIcon
                                                        className={cx('action-apply')}
                                                        icon={isSolidHeart ? faHeartSolid : faHeart}
                                                    />
                                                }
                                            >
                                                {apply}
                                            </CustomButton>
                                        </Popconfirm>
                                    )}
                                    {!isMemberShip && isSolidHeart && (
                                        <CustomButton
                                            className={cx('btn-apply')}
                                            leftIcon={
                                                <FontAwesomeIcon
                                                    className={cx('action-apply')}
                                                    icon={isSolidHeart ? faHeartSolid : faHeart}
                                                    onClick={handleApply}
                                                />
                                            }
                                            onClick={handleApply}
                                        >
                                            {apply}
                                        </CustomButton>
                                    )}
                                    <CustomButton
                                        className={cx('btn-save')}
                                        leftIcon={
                                            <FontAwesomeIcon
                                                className={cx('action-save')}
                                                icon={isSolidBookmark ? faBookmarkSolid : faBookmark}
                                            />
                                        }
                                        onClick={handleSave}
                                    >
                                        {save}
                                    </CustomButton>
                                </div>
                            )}
                            {status === 1 && (
                                <>
                                    <div className={cx('action-message')}>
                                        <div>
                                            <p>
                                                Bạn đã được giao công việc này. Hãy liên lạc với nhà tuyển dụng để bắt
                                                đầu công việc
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <b>Số điện thoại: </b>
                                                {postDetail.createBy.phone}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <b>Email: </b>
                                                {postDetail.createBy.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('comment')}>
                                        <Button type="primary" onClick={showModal}>
                                            Đánh giá nhà tuyển dụng
                                        </Button>
                                    </div>
                                </>
                            )}
                            {status === 0 && (
                                <div className={cx('action-message')}>
                                    <div>
                                        <span>
                                            Bạn đã bị từ chối công việc này. Bạn có thể tìm các việc làm hấp dẫn khác
                                        </span>
                                        <CustomButton to={config.routes.searchJob} className={cx('btn-link')}>
                                            tại đây
                                        </CustomButton>
                                    </div>
                                </div>
                            )}
                            {status === 2 && (
                                <div className={cx('action')}>
                                    <CustomButton
                                        className={cx('btn-apply')}
                                        leftIcon={
                                            <FontAwesomeIcon
                                                className={cx('action-apply')}
                                                icon={isSolidHeart ? faHeartSolid : faHeart}
                                                onClick={handleApply}
                                            />
                                        }
                                        onClick={handleApply}
                                    >
                                        {apply}
                                    </CustomButton>
                                    <CustomButton
                                        className={cx('btn-save')}
                                        leftIcon={
                                            <FontAwesomeIcon
                                                className={cx('action-save')}
                                                icon={isSolidBookmark ? faBookmarkSolid : faBookmark}
                                            />
                                        }
                                        onClick={handleSave}
                                    >
                                        {save}
                                    </CustomButton>
                                </div>
                            )}
                        </div>
                        <div className={cx('right-component')}>
                            <div className={cx('about-client')}>Thông tin nhà tuyển dụng</div>
                            <div className={cx('star-point')}>
                                <div className={cx('star-point-title')}>Đánh giá</div>
                                <div className={cx('star-point-list-icon')}>
                                    <FontAwesomeIcon className={cx('ic-star')} icon={faStar} />
                                </div>
                                <div className={cx('star-point-statistic')}>
                                    {postDetail.createBy.star !== 'NaN' && (
                                        <p>
                                            {postDetail.createBy.star} trong tổng số{' '}
                                            {postDetail.createBy.numberOfFeedback} đánh giá
                                        </p>
                                    )}
                                    {postDetail.createBy.star === 'NaN' && <p>Chưa có đánh đánh giá</p>}
                                </div>
                            </div>
                            <div className={cx('job-posted')}>
                                <div className={cx('job-posted-quantity')}>
                                    {postDetail.createBy.totalPosted} bài đăng
                                </div>
                                <div className={cx('job-posted-hire-rate')}>
                                    <p>
                                        Tổng số người đã ứng tuyển: <b>{postDetail.totalApplied}</b>
                                    </p>
                                </div>
                            </div>
                            <div className={cx('company-info-name')}>
                                <CustomButton className={cx('btn-company')} onClick={handleViewDetailRecruiter}>
                                    {postDetail.createBy.companyName}
                                </CustomButton>
                            </div>
                        </div>
                        <div className={cx('right-component')}>
                            <div className={cx('company-title')}>Trang web công ty</div>
                            <CustomButton href={postDetail.createBy.website} className={cx('company-link')}>
                                {postDetail.createBy.website}
                            </CustomButton>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('container')}>
                    <p className={cx('message-Invalid')}>Bài đăng không tồn tại</p>
                </div>
            )}
            <div className={cx('footer')}>
                <Image src={images.bannerAloNgayFreelancer} alt="footer" />
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
                {messageComment !== '' && (
                    <Alert className={cx('messageError')} message={messageComment} type="error" />
                )}
            </Modal>
        </div>
    );
};

export default ViewDetailPost;
