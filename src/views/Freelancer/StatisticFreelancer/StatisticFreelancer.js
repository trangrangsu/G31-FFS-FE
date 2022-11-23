import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './StatisticFreelancer.module.scss';
import { faComment, faComments, faPaste, faStar, faThumbsUp, faXmark } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const StatisticFreelancer = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h4>Thống kê các bài đăng ứng tuyển công việc</h4>
                    <p>
                        Trang web thống kê lại những con số cụ thể về số bài ứng tuyển, số bài chấp thuận, số bài từ
                        chối, số sao trung bình và số lượt bình luận của bạn
                    </p>
                </div>
                <div className={cx('statistic')}>
                    <div className={cx('info-left')}>
                        <div className={cx('post')}>
                            <div className={cx('color')}></div>
                            <FontAwesomeIcon icon={faPaste} className={cx('icon')} />
                            <div className={cx('title')}>
                                <p>Số bài ứng tuyển</p>
                                <h4>35</h4>
                            </div>
                        </div>
                        <div className={cx('approve')}>
                            <div className={cx('post-first')}>
                                <div className={cx('color-first')}></div>
                                <FontAwesomeIcon icon={faThumbsUp} className={cx('icon-first')} />
                                <div className={cx('title')}>
                                    <p>Số bài chấp thuận</p>
                                    <h4>15</h4>
                                </div>
                            </div>
                        </div>
                        <div className={cx('denied')}>
                            <div className={cx('post-second')}>
                                <div className={cx('color-second')}></div>
                                <FontAwesomeIcon icon={faXmark} className={cx('icon-second')} />
                                <div className={cx('title')}>
                                    <p>Số bài từ chối</p>
                                    <h4>20</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('info-right')}>
                        <div className={cx('star')}>
                            <div className={cx('star-first')}>
                                <div className={cx('color-three')}></div>
                                <FontAwesomeIcon icon={faStar} className={cx('icon-three')} />
                                <div className={cx('title')}>
                                    <p>Số sao trung bình</p>
                                    <h4>4.1/5</h4>
                                </div>
                            </div>
                        </div>
                        <div className={cx('comment')}>
                            <div className={cx('comment-first')}>
                                <div className={cx('color-four')}></div>
                                <FontAwesomeIcon icon={faComments} className={cx('icon-four')} />
                                <div className={cx('title')}>
                                    <p>Số lượt bình luận</p>
                                    <h4>40</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticFreelancer;
