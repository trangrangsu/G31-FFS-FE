import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter, faLocationDot, faStar, faComments } from '@fortawesome/free-solid-svg-icons';
import { CPagination, CPaginationItem } from '@coreui/react';

import styles from './PostApplyManagement.module.scss';
const cx = classNames.bind(styles);
function PostApplyManagement() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div className={cx('nav-item1')}>Chi tiết bài đăng</div>
                <div className={cx('nav-item2')}>Quản lý ứng viên</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('list-freelancer')}>
                    <div className={cx('list-head')}>
                        <div className={cx('head-item')}>Ứng tuyển</div>
                        <div className={cx('head-item')}>Chấp thuận</div>
                        <div className={cx('head-item')}>Từ chối</div>
                    </div>
                    <div className={cx('search-area')}>
                        <div className={cx('row')}>
                            <div className={cx('search-text')}>
                                <div className={cx('search-input')}>Search</div>
                                <div className={cx('btn-search')}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </div>
                            </div>
                            <div className={cx('btn-Filter')}>
                                <FontAwesomeIcon icon={faFilter} />
                                Filter
                            </div>
                        </div>
                        <div className={cx('total-number-freelancer')}>30 freelancer</div>
                        <div>available</div>
                    </div>
                    <div className={cx('freelancer')}>
                        <div className={cx('left')}>
                            <div className={cx('avatar')}></div>
                        </div>
                        <div className={cx('right')}>
                            <div className={cx('row1')}>
                                <div className={cx('freelancer-username')}>CongBV</div>
                                <div className={cx('action')}>
                                    <div className={cx('btn-approve')}>Approve</div>
                                    <div className={cx('btn-deny')}>Deny</div>
                                </div>
                            </div>
                            <div className={cx('row2')}>
                                <div className={cx('freelancer-subcareer')}>Thiet ke logo</div>
                                <div className={cx('freelancer-location')}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    Hoa Lac
                                </div>
                                <div className={cx('row3')}>
                                    <div className={cx('number-skill-relevant')}>Has 4 relevant skill to your job</div>
                                </div>
                                <div className={cx('row4')}>
                                    <div className={cx('skills')}>
                                        <div className={cx('skill')}>UX/UI</div>
                                        <div className={cx('skill')}>Java</div>
                                        <div className={cx('skill')}>HTML</div>
                                        <div className={cx('skill')}>JAVA</div>
                                    </div>
                                </div>
                                <div className={cx('row5')}>
                                    {' '}
                                    <div className={cx('post-star-point')}>
                                        <div className={cx('feedback-title')}>AVG feedback</div>
                                        <div className={cx('ic-feedback')}>
                                            <FontAwesomeIcon IconclassName={cx('ic-cmt')} icon={faComments} />
                                        </div>
                                        <div className={cx('list-star')}>
                                            <FontAwesomeIcon className={cx('ic-star')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('ic-star')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('ic-star')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('ic-star')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('ic-star')} icon={faStar} />
                                        </div>
                                        <div className={cx('total-number-feedback')}>5 feedback</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
}

export default PostApplyManagement;
