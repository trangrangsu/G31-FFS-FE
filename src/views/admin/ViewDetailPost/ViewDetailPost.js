import classNames from 'classnames/bind';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Config from '../../../config';
import Button from '../../../components/Button';
import styles from './ViewDetailPost.module.scss';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function ViewDetailPost() {
    const [flag, setFlag] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const post = {
        postID: '1',
        createBy: {
            id: '2',
            name: 'Cong Ty TNHH Cong',
        },
        jobTitle: 'Tuyển lập trình viên Web gấp!',
        subCareer: 'Kỹ thuật mạng',
        description:
            'Chúng tôi đang có dự án 1000$ cần tuyển người gấp. Chúng tôi đang có dự án 1000$ cần tuyển người gấp',
        attach: 'attach.pdf',
        paymentType: 'Theo dự án',
        budget: '20.000.000',
        time: '24-10-2022 10:55',
        area: 'Hà Nội',
        isActive: true,
        isApproved: -1,
        listSkills: [
            {
                id: 1,
                name: 'Java',
            },
            {
                id: 2,
                name: 'English',
            },
        ],
    };
    const handleApprove = () => {
        console.log('approve');
    };
    const handleDeny = () => {
        console.log('deny');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('detail-title')}>
                    <h1 className={cx('title')}>Thông Tin chi tiết</h1>
                </div>
                <div className={cx('margin-bottom')}>
                    <h1 className={cx('title-header')}>{post.jobTitle}</h1>
                    <div className={cx('content')}>
                        <div className={cx('info')}>
                            <p>
                                Đã ngày <span>{post.time}</span> bởi{' '}
                                <Button
                                    to={{
                                        pathname: Config.routes.viewDetailFreelancerAdmin,
                                        search: `?id=${post.createBy.id}`,
                                    }}
                                >
                                    {post.createBy.name}
                                </Button>
                            </p>
                        </div>
                        <div className={cx('description')}>
                            <p>{post.description}</p>
                        </div>
                        <div className={cx('attach')}>
                            <p>Đính kèm:</p>
                            <Button href={post.attach}>{post.attach}</Button>
                        </div>
                    </div>
                </div>
                <div className={cx('margin-bottom')}>
                    <h1 className={cx('title-header')}>Yêu Cầu</h1>
                    <div className={cx('row1')}>
                        <div className={cx('subCareer')}>
                            <label className={cx('label')}>Chuyên ngành</label>
                            <div>
                                <p>{post.subCareer}</p>
                            </div>
                        </div>
                        <div className={cx('Skills')}>
                            <label className={cx('label')}>Kỹ năng</label>
                            <div className={cx('container-skill')}>
                                {post.listSkills.map((skill) => (
                                    <div>
                                        <p key={skill.id}>{skill.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={cx('row2')}>
                        <label className={cx('label')}>Khu vực</label>
                        <div>
                            <p>{post.area}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('margin-bottom')}>
                    <h1 className={cx('title-header')}>Ngân sách</h1>
                    <div className={cx('padding')}>
                        <div className={cx('top')}>
                            <FontAwesomeIcon icon={faSackDollar} />
                            <p>{post.budget} VND</p>
                        </div>
                        <p className={cx('bottom')}>{post.paymentType}</p>
                    </div>
                </div>
                {post.isApproved === -1 && (
                    <div>
                        <Button primary className={cx('btn-post')} onClick={handleApprove}>
                            Chấp nhận
                        </Button>
                        <Button primary className={cx('btn-post')} onClick={handleDeny}>
                            Từ chối
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewDetailPost;
