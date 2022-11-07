import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { Tooltip } from 'antd';

import * as searchPostFreelancerServices from '../../../services/searchPostFreelancerServices';
import config from '../../../config';
import Button from '../../../components/Button';
import styles from './SearchJob.module.scss';

const cx = classNames.bind(styles);

function PostItem({ post, userId }) {
    const [isSolidBookmark, setIsSolidBookmark] = useState(false);
    const navigate = useNavigate();
    const addJobSavedApi = async (postID) => {
        const result = await searchPostFreelancerServices.addJobSaved(userId, postID);
        console.log(result);
    };
    const handleSave = () => {
        setIsSolidBookmark(!isSolidBookmark);
        addJobSavedApi(post.postID);
    };
    const handleViewDetail = () => {
        const to = {
            pathname: config.routes.viewDetailPost,
            search: `?id=${post.postID}`,
        };
        navigate(to);
    };
    return (
        <div className={cx('wrapper-post')}>
            <div className={cx('row-1')}>
                <Button className={cx('post-title')} onClick={handleViewDetail}>
                    {post.jobTitle}
                </Button>
                <div>
                    {/* <FontAwesomeIcon
                        className={cx('action-apply')}
                        icon={isSolidHeart ? faHeartSolid : faHeart}
                        onClick={handleApply}
                    /> */}
                    <Tooltip title="Lưu" placement="bottom">
                        <FontAwesomeIcon
                            className={cx('action-save')}
                            icon={isSolidBookmark ? faBookmarkSolid : faBookmark}
                            onClick={handleSave}
                        />
                    </Tooltip>
                </div>
            </div>
            <div className={cx('row-2')}>
                <div className={cx('post-payment')}>{post.paymentType}</div>
                <div className={cx('post-budget')}>{post.budget}</div>
                <div className={cx('post-posted-time')}>{post.timeCount}</div>
            </div>
            <div className={cx('row-3')}>{post.description}</div>
            <div className={cx('row-4')}>
                <p className={cx('post-subCareer')}>{post.subCareer}</p>
            </div>
            <div className={cx('row-5')}>
                {post.listSkills.map((skill) => (
                    <div className={cx('skill')} key={skill.id}>
                        <p>{skill.name}</p>
                    </div>
                ))}
            </div>
            <div className={cx('row-6')}>
                <FontAwesomeIcon className={cx('icon-location')} icon={faLocationDot} />
                <p className={cx('area')}>{post.area}</p>
            </div>
        </div>
    );
}

export default PostItem;
