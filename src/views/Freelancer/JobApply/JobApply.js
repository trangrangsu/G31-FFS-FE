import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CPagination, CPaginationItem } from '@coreui/react';
import HeadlessTippy from '@tippyjs/react/headless';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import classNames from 'classnames/bind';

import styles from './JobApply.module.scss';
const cx = classNames.bind(styles);

const JobApply = () => {
    const postElement = [
        {
            postTitle: 'Chông trẻ 3-6 tuổi',
            paymentType: 'Theo giờ',
            budget: 2000000,
            postedTime: 3,
            postStatus: 'Chấp thuận',

            status: 'Đang tuyển',
        },
        {
            postTitle: 'Thiết kế logo cho công ty điện CMS',
            paymentType: 'Theo giờ',
            budget: 500000.0,
            postedTime: 5,
            postStatus: 'Chấp thuận',
            status: 'Đang tuyển',
        },
        {
            postTitle: 'Thiết kế UX/UI',
            paymentType: 'Cố định',
            budget: 500000,
            postedTime: 11,
            postStatus: 'Chấp thuận',
            status: 'Đang tuyển',
        },
        {
            postTitle: 'Chỉnh sửa video cho công ty SEO',
            paymentType: 'Cố định',
            budget: 2000000,
            postedTime: 10,
            postStatus: 'Chấp thuận',
            status: 'Đang tuyển',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('head')}>
                    <div className={cx('page-title')}>Quản lý công việc ứng tuyển</div>
                    <div className={cx('mini-nav')}>
                        <div className={cx('nav-item')}>Chờ phản hồi</div>
                        <div className={cx('nav-item2')}>Đã phản hồi</div>
                        <div className={cx('nav-item2')}>Đã lưu</div>
                    </div>
                </div>
                <div className={cx('list-post')}>
                    {postElement.map((post) => {
                        return (
                            <div className={cx('post')}>
                                <div className={cx('row1')}>
                                    <div className={cx('post-title')}>{post.postTitle}</div>

                                    <div className={cx('post-status')}>{post.postStatus}</div>
                                </div>
                                <div className={cx('row2')}>
                                    <div className={cx('post-payment-budget')}>
                                        <div className={cx('payment-type')}>{post.paymentType}</div> -{' '}
                                        <div className={cx('budget')}>{post.budget}vnđ</div>
                                    </div>
                                    <div className={cx('post-posted-time-status')}>
                                        <div className={cx('posted-time')}>Đã đăng {post.postedTime}h trước</div>
                                        <div className={cx('status')}>{post.status}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('paging')}>
                    <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                        <CPaginationItem aria-label="Previous" disabled>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active className={cx('active-page')}>
                            1
                        </CPaginationItem>
                        <CPaginationItem>2</CPaginationItem>
                        <CPaginationItem>3</CPaginationItem>
                        <CPaginationItem aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </CPaginationItem>
                    </CPagination>
                </div>
            </div>
        </div>
    );
};

export default JobApply;
