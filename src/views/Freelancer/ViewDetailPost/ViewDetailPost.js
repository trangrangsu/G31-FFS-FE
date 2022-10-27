import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSackDollar, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons';
import styles from './ViewDetailPost.module.scss';
const cx = classNames.bind(styles);
const post = {
    postTitle: 'Thiết kế logo cho công ty quản lý điện CMS',
    postCareer: 'Thiết kế',
    postedTime: 5,
    location: 'Hòa Lạc',
    description: '',
    budget: '200.000',
    payment: 'Theo giờ',
    subCareer: 'Thiết kế logo',
    listSkill: ['UX/UI', 'JS', 'HTML', 'Adobe'],
};

const client = {
    companyName: 'Công ty IT Hòa Bình',
    companyWebsite: 'https://niithanoi.edu.vn/mang-trong-javascript.html',
    totalPost: 10,
    hireRate: 30,
    minBudget: '200.000',
    maxBudget: '500.000',
    totalNumberFeedback: 10,
    starPoint: 5,
};
const ViewDetailPost = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('page-title')}>Chi tiết bài đăng</div>

            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div id={cx('head-r')} className={cx('left-component')}>
                        <div className={cx('post-title')}>{post.postTitle}</div>
                        <div className={cx('post-career')}>{post.postCareer}</div>
                        <p className={cx('post-posted-time')}>Đã đăng {post.postedTime}h trước</p>
                        <div className={cx('post-location')}>
                            {' '}
                            <div className={cx('post-location-ic')}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div className={cx('post-location-name')}>{post.location}</div>
                        </div>
                    </div>
                    <div className={cx('left-component')}>
                        <div className={cx('post-description')}>
                            I am looking for a full stack developer who is looking for long time work. I will provide
                            full details on my website including a test site and list of tasks to begin with. I am
                            looking for a developer who can offer me good rates for good quality of work in the quickest
                            time frame. The project budget is not fixed but I am looking for the best possible rates but
                            since I have lot.good quality of work in the quickest time frame. The project budget is not
                            fixed but I am looking for the best possible rates but since I have lot... good quality of
                            work in the quickest time frame. The project budget is not fixed but I am looking for the
                            best possible. Yes, I just Email Auto Writing Tool (All types of Emails) Book a Meeting with
                            Me to Discuss further! Please do apply if you have build at least 1 Saas Before, and Apply
                            with your Portfolio or link! Regards, Abhit
                        </div>
                    </div>
                    <div className={cx('left-component')}>
                        <div className={cx('post-budget-ic')}>
                            <FontAwesomeIcon icon={faSackDollar} />
                        </div>
                        <div className={cx('post-budget-payment')}>
                            <div className={cx('post-budget')}>{post.budget}vnđ</div>
                            <div className={cx('post-payment')}>{post.payment}</div>
                        </div>
                    </div>
                    <div className={cx('left-component')}>
                        <div className={cx('post-subcareers-title')}>Ngành hẹp & Kĩ năng</div>
                        <div className={cx('post-subcareers')}>
                            <div className={cx('subcareer-title')}>Ngành hẹp</div>
                            <div className={cx('subcareers')}>{post.subCareer}</div>
                        </div>
                        <div className={cx('post-skills')}>
                            <div className={cx('skill-title')}>Kĩ năng</div>
                            {post.listSkill.map((skill) => {
                                return <div className={cx('skill')}>{skill}</div>;
                            })}
                        </div>
                        <div id={cx('other')} className={cx('other')}>
                            Khác
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div id={cx('head-r')} className={cx('right-component')}>
                        <div className={cx('action')}>
                            <div className={cx('btn-apply')}>
                                <FontAwesomeIcon icon={faHeart} /> Ứng tuyển
                            </div>
                            <div className={cx('btn-save')}>
                                <FontAwesomeIcon icon={faBookmark} /> Lưu
                            </div>
                        </div>
                    </div>
                    <div className={cx('right-component')}>
                        <div className={cx('about-client')}>Thông tin nhà tuyển dụng</div>
                        <div className={cx('star-point')}>
                            <div className={cx('star-point-title')}>Đánh giá</div>
                            <div className={cx('star-point-list-icon')}>
                                <FontAwesomeIcon className={cx('ic-star')} icon={faStar} />
                            </div>
                            <div className={cx('star-point-statistic')}>
                                {client.starPoint} trong tổng số {client.totalNumberFeedback} đánh giá
                            </div>
                        </div>
                        <div className={cx('job-posted')}>
                            <div className={cx('job-posted-quantity')}>{client.totalPost} bài đăng</div>
                            <div className={cx('job-posted-hire-rate')}>
                                Tổng số {client.hireRate} người đã ứng tuyển
                            </div>
                        </div>
                        <div className={cx('budget')}>
                            <div className={cx('budget-title')}>Khoảng ngân sách</div>
                            <div className={cx('budget-range')}>
                                {client.minBudget} - {client.maxBudget}vnđ
                            </div>
                        </div>
                        <div className={cx('company-info-name')}>{client.companyName}</div>
                    </div>
                    <div className={cx('right-component')}>
                        <div className={cx('company-title')}>Trang web công ty</div>
                        <div className={cx('company-link')}>{client.companyWebsite}</div>
                        <div className={cx('btn-copy')}>Sao chép</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailPost;
