import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import ViewDetailPost from '../ViewDetailPost';
import FreelancerList from './FreelancerList';
import { useSearchParams } from 'react-router-dom';

import styles from './PostApplyManagement.module.scss';
const cx = classNames.bind(styles);

function PostApplyManagement() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeHeader, setActiveHeader] = useState(1);
    useEffect(() => {}, [activeHeader]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div
                    className={cx('nav-item1', activeHeader === 1 ? 'active-header' : '')}
                    onClick={() => setActiveHeader(1)}
                >
                    Chi tiết bài đăng
                </div>
                <div
                    className={cx('nav-item2', activeHeader === 2 ? 'active-header' : '')}
                    onClick={() => setActiveHeader(2)}
                >
                    Quản lý ứng viên
                </div>
            </div>
            <div className={cx('container')}>
                {activeHeader === 1 ? (
                    <ViewDetailPost postId={searchParams.get('id')} />
                ) : (
                    <FreelancerList postId={searchParams.get('id')} />
                )}
            </div>
        </div>
    );
}

export default PostApplyManagement;
