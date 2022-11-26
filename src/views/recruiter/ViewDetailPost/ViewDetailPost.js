import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faSackDollar,
    faBookmark as faBookmarkSolid,
    faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Config from '../../../config';
import * as firebase from '../../../firebase/firebase';
import images from '../../../assets/images';
import Image from '../../../components/Image';
import CustomButton from '../../../components/Button';
import * as recruiterPostManagementServices from '../../../services/recruiterPostManagementServices';
import styles from './ViewDetailPost.module.scss';
const cx = classNames.bind(styles);

const ViewDetailPost = ({ postId }) => {
    const navigate = useNavigate();
    const account = useSelector((state) => state.account);

    const [postDetail, setPostDetail] = useState({ createBy: {}, listSkills: [] });
    const [document, setDocument] = useState('');
    const [documentURL, setDocumentURL] = useState('#');
    const [isActive, setIsActive] = useState(true);
    const [btnContent, setBtnContent] = useState('Ẩn bài đăng');
    const [isValidPost, setIsValidPost] = useState(true);

    const viewDetailPostApi = async () => {
        const result = await recruiterPostManagementServices.viewDetailPost(account.userId, postId);
        console.log(result);
        if (result !== undefined && result !== '' && result !== null) {
            setPostDetail(result);
            setDocument(result.attach);
            if (!result.isActive) {
                setIsActive(false);
            }
        } else {
            setIsValidPost(false);
        }
    };
    const hideJobApi = async () => {
        const result = await recruiterPostManagementServices.hideJob(account.userId, postId);
        console.log(result);
        if (result) {
            message.success(btnContent + ' thành công');
        } else {
            message.error(btnContent + ' thất bại');
        }
    };
    const deleteJobApi = async () => {
        const result = await recruiterPostManagementServices.deleteJob(account.userId, postId);
        console.log(result);
        if (result) {
            message.success('Xóa thành công');
        } else {
            message.error('Xóa thất bại');
        }
    };
    useEffect(() => {
        viewDetailPostApi();
    }, []);
    useEffect(() => {
        if (isActive) {
            setBtnContent('Ẩn bài đăng');
        } else {
            setBtnContent('Hiện bài đăng');
        }
    }, [isActive]);
    useEffect(() => {
        if (document !== '') firebase.downloadFile(account.userId, postId, document, setDocumentURL);
    }, [document]);

    const handleOnclick = () => {
        hideJobApi();
        setIsActive(!isActive);
    };
    const handleDelete = () => {
        deleteJobApi();
        const to = {
            pathname: Config.routes.postManagement,
        };
        setTimeout(() => {
            navigate(to);
        }, 500);
    };

    return (
        <div className={cx('wrapper')}>
            {isValidPost ? (
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        <div className={cx('left-component')}>
                            <div className={cx('post-title')}>{postDetail.jobTitle}</div>
                            <div className={cx('container-row')}>
                                <div>
                                    <p className={cx('post-posted-time')}>{postDetail.timeCount}</p>
                                    <div className={cx('post-location')}>
                                        {' '}
                                        <div className={cx('post-location-ic')}>
                                            <FontAwesomeIcon icon={faLocationDot} />
                                        </div>
                                        <div className={cx('post-location-name')}>{postDetail.area}</div>
                                    </div>
                                    {postDetail.isApproved === 1 && (
                                        <p className={cx('totalApplied')}>
                                            Số lượt ứng tuyển: {postDetail.totalApplied}
                                        </p>
                                    )}
                                </div>
                                <div className={cx('action')}>
                                    {postDetail.isApproved === 1 && (
                                        <Button type="primary" onClick={handleOnclick}>
                                            {btnContent}
                                        </Button>
                                    )}
                                    {postDetail.isApproved !== 1 && (
                                        <Button type="primary" onClick={handleDelete}>
                                            Xóa bài đăng
                                        </Button>
                                    )}
                                </div>
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
                </div>
            ) : (
                <div className={cx('container')}>
                    <p className={cx('message-Invalid')}>Bài đăng không tồn tại</p>
                </div>
            )}
            <div className={cx('footer')}>
                <Image src={images.bannerAloNgayFreelancer} alt="footer" />
            </div>
        </div>
    );
};

export default ViewDetailPost;
