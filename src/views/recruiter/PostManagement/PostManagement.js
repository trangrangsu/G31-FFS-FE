import Tippy from '@tippyjs/react';
import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './PostManagement.module.scss';
const cx = classNames.bind(styles);
const PostManagement = () => {
    const postElement = [
        {
            postTitle: 'Chông trẻ 3-6 tuổi',
            paymentType: 'Theo giờ',
            postedTime: 3,
            status: 'Đã duyệt',
            postApply: 11,
            postApprove: 20,
            postDeny: 10,
        },
        {
            postTitle: 'Thiết kế logo cho công ty điện CMS',
            paymentType: 'Theo giờ',
            budget: 500000.0,
            postedTime: 5,
            status: 'Đã duyệt',
            postApply: 10,
            postApprove: 16,
            postDeny: 18,
        },
        {
            postTitle: 'Thiết kế UX/UI',
            paymentType: 'Cố định',
            budget: 500000,
            postedTime: 11,
            status: 'Đã duyệt',
            postApply: 20,
            postApprove: 15,
            postDeny: 10,
        },
        {
            postTitle: 'Chỉnh sửa video cho công ty SEO',
            paymentType: 'Cố định',
            postedTime: 10,
            status: 'Đã duyệt',
            postApply: 10,
            postApprove: 15,
            postDeny: 20,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('head')}>
                    <div className={cx('page-title')}>Danh sách bài đăng</div>
                    <div className={cx('mini-nav')}>
                        <div className={cx('nav-item')}>Đã duyệt</div>
                        <div className={cx('nav-item2')}>Chờ duyệt</div>
                    </div>
                </div>
                <div className={cx('list-post')}>
                    {postElement.map((post) => {
                        return (
                            <div className={cx('post')}>
                                <div className={cx('row1')}>
                                    <div className={cx('post-title')}>{post.postTitle}</div>

                                    <Tippy delay={[0, 50]} content="Đóng bài" placement="bottom">
                                        <div className={cx('btn-close')}>
                                            {' '}
                                            <FontAwesomeIcon icon={faLock} />
                                        </div>
                                    </Tippy>
                                </div>
                                <div className={cx('row2')}>
                                    <div className={cx('left')}>
                                        <div className={cx('post-payment')}>
                                            <div className={cx('payment-type')}>{post.paymentType}</div>
                                        </div>
                                        <div className={cx('post-posted-time-status')}>
                                            <div className={cx('posted-time')}>Đã đăng {post.postedTime}h trước</div>
                                            <div className={cx('status')}>{post.status}</div>
                                        </div>
                                    </div>
                                    <div className={cx('right')}>
                                        <div className={cx('component')}>
                                            <div className={cx('component-number')}>{post.postApply}</div>
                                            <div className={cx('component-title')}>Apply</div>
                                        </div>
                                        <div className={cx('component')}>
                                            <div className={cx('component-number')}>{post.postApprove}</div>
                                            <div className={cx('component-title')}>Approve</div>
                                        </div>
                                        <div className={cx('component')}>
                                            <div className={cx('component-number')}>{post.postDeny}</div>
                                            <div className={cx('component-title')}>Deny</div>
                                        </div>
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

export default PostManagement;
