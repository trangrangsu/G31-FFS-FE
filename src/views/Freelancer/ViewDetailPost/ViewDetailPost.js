import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faSackDollar,
    faStar,
    faBookmark as faBookmarkSolid,
    faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import images from '../../../assets/images';
import Image from '../../../components/Image';
import config from '../../../config';
import Button from '../../../components/Button';
import * as getPostDetailFreelancerServices from '../../../services/getPostDetailFreelancerServices';
import styles from './ViewDetailPost.module.scss';
const cx = classNames.bind(styles);

const ViewDetailPost = () => {
    const navigate = useNavigate();
    const account = useSelector((state) => state.account);
    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState(-1);
    //const [isSave, setIsSave] = useState(true);
    const [apply, setApply] = useState('Ứng tuyển');
    const [isSolidHeart, setIsSolidHeart] = useState(false);
    const [save, setSave] = useState('Lưu');
    const [isSolidBookmark, setIsSolidBookmark] = useState(false);
    const [postDetail, setPostDetail] = useState({ createBy: {}, listSkills: [] });

    const getPostDetailApi = async (postId) => {
        const result = await getPostDetailFreelancerServices.getPostDetail(postId, account.userId);
        console.log(result);
        if (typeof result === 'object') {
            setPostDetail(result);
            setStatus(result.isApply);
            //setIsSave(result.isSave)
            if (result.isSave) {
                setSave('Bỏ lưu');
                setIsSolidBookmark(true);
            }
            if (result.isApply === 2) {
                setApply('Bỏ ứng tuyển');
            }
        }
    };
    useEffect(() => {
        getPostDetailApi(searchParams.get('id'));
    }, []);
    const handleViewDetailRecruiter = () => {
        const to = {
            pathname: config.routes.viewDetailRecruiterAdmin,
            search: `?id=${postDetail.createBy.id}`,
        };
        navigate(to);
    };
    const handleApply = () => {
        setIsSolidHeart(!isSolidHeart);
        if (!isSolidHeart) {
            setApply('Bỏ ứng tuyển');
        } else {
            setApply('Ứng tuyển');
        }
    };
    const handleSave = () => {
        setIsSolidBookmark(!isSolidBookmark);
        if (!isSolidBookmark) {
            setSave('Bỏ lưu');
        } else {
            setSave('Lưu');
        }
        //addJobSavedApi(post.postID);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-title')}>Chi tiết bài đăng</div>

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
                        {postDetail.attach && (
                            <Button text href={postDetail.attach} className={cx('document')}>
                                Tài liệu
                            </Button>
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
                                <Button
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
                                </Button>
                                <Button
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
                                </Button>
                            </div>
                        )}
                        {status === 1 && (
                            <div className={cx('action-message')}>
                                <div>
                                    <p>
                                        Bạn đã được giao công việc này. Hãy liên lạc với nhà tuyển dụng để bắt đầu công
                                        việc
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
                        )}
                        {status === 0 && (
                            <div className={cx('action-message')}>
                                <div>
                                    <span>
                                        Bạn đã bị từ chối công việc này. Bạn có thể tìm các việc làm hấp dẫn khác
                                    </span>
                                    <Button to={config.routes.searchJob} className={cx('btn-link')}>
                                        tại đây
                                    </Button>
                                </div>
                            </div>
                        )}
                        {status === 2 && (
                            <div className={cx('action')}>
                                <Button
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
                                </Button>
                                <Button
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
                                </Button>
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
                                        {postDetail.createBy.star} trong tổng số {postDetail.createBy.numberOfFeedback}{' '}
                                        đánh giá
                                    </p>
                                )}
                                {postDetail.createBy.star === 'NaN' && <p>Chưa có đánh đánh giá</p>}
                            </div>
                        </div>
                        <div className={cx('job-posted')}>
                            <div className={cx('job-posted-quantity')}>{postDetail.createBy.totalPosted} bài đăng</div>
                            <div className={cx('job-posted-hire-rate')}>
                                <p>Tổng số người đã ứng tuyển</p>
                            </div>
                        </div>
                        <div className={cx('company-info-name')}>
                            <Button className={cx('btn-company')} onClick={handleViewDetailRecruiter}>
                                {postDetail.createBy.companyName}
                            </Button>
                        </div>
                    </div>
                    <div className={cx('right-component')}>
                        <div className={cx('company-title')}>Trang web công ty</div>
                        <Button href={postDetail.createBy.website} className={cx('company-link')}>
                            {postDetail.createBy.website}
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <Image src={images.bannerAloNgayFreelancer} alt="footer" />
            </div>
        </div>
    );
};

export default ViewDetailPost;
