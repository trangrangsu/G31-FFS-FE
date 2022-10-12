import classNames from 'classnames/bind';
import React from 'react';

import { faUserPen, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../components/Button';
import styles from './ViewDetailFreelancer.module.scss';
const cx = classNames.bind(styles);
function ViewDetailFreelancer() {
    const banFlag = false;
    const freelancer = {
        id: 1,
        gender: 'Nam',
        phone: '0337177679  ',
        fullname: 'Nguyễn Hữu Tuyên',
        address: 'SN02/07 ngõ 18 Đông Anh Hà Nội',
        skills: 'Java, SQL, C++',
        cost_per_hour: '200.000 VND',
        avatar: 'https://i.pravatar.cc/300',
        description:
            'Tôi là một lập trình viên tiềm năng, hãy tuyển tôi,tôi có kĩ năng làm việc trong nhiều tập đoàn lớn, với hoài bão và ý chí, có kiến thức về lập trình backend và các thể loại khác',
        cv: 'tuyen.pdf',
        education: [
            {
                university: 'Đại học FPT',
                level: 'Xuất sắc',
                from: '2018',
                to: '2022',
            },
            {
                university: 'Đại học Kinh Công',
                level: 'Xuất sắc',
                from: '2018',
                to: '2022',
            },
        ],
        work_exp: [
            {
                companyname: 'FPT Software',
                position: 'Intern',
                from: '2016',
                to: '2018',
                description: 'Tôi triển khai làm front-end sản phẩm website giới thiệu',
            },
            {
                companyname: 'FPT Software',
                position: 'Intern',
                from: '2016',
                to: '2018',
                description: 'Tôi triển khai làm front-end sản phẩm website giới thiệu',
            },
        ],
        star: '5',
        birthdate: '20/06/2000',
        subCareer: 'Lập Trình viên',
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('detail-title')}>
                    <FontAwesomeIcon icon={faUserPen} className={cx('icon-user')} />
                    <h1 className={cx('title')}>Thông Tin chi tiết của: {freelancer.fullname}</h1>
                </div>

                <div className={cx('freelancer-info')}>
                    <div className={cx('left-info')}>
                        <div className={cx('img-info')}>
                            <img
                                className={cx('avatar-info')}
                                src={freelancer.avatar}
                                alt="Girl in a jacket"
                                width="500"
                                height="600"
                            />
                        </div>
                        <div className={cx('left-detail')}>
                            <div className={cx('fullname')}>{freelancer.fullname}</div>
                            <div className={cx('sub-career')}>{freelancer.subCareer}</div>
                            <div>
                                Đánh giá: {freelancer.star}{' '}
                                <FontAwesomeIcon icon={faStar} className={cx('icon-user')} />
                            </div>
                            <div>Chi phí: {freelancer.cost_per_hour}</div>
                            <div>CV:{freelancer.cv}</div>
                        </div>
                    </div>
                    <div className={cx('right-info')}>
                        <div className={cx('right-detail')}>
                            <div>Giới tính: {freelancer.gender}</div>
                            <div>Ngày Sinh: {freelancer.birthdate}</div>
                            <div>Số diện thoại: {freelancer.phone}</div>
                            <div>Địa chỉ: {freelancer.address}</div>
                        </div>
                    </div>
                </div>
                <div className={cx('description')}>
                    <p>{freelancer.description}</p>
                </div>
                <div className={cx('education-content')}>
                    <div className={cx('education-title')}>
                        <p>Học Vấn</p>
                    </div>
                    <div className={cx('education')}>
                        {freelancer.education.map((education, index) => {
                            return (
                                <div key={index} className={cx('education-detail')}>
                                    <div className={cx('education-uni')}>{education.university}</div>
                                    <div className={cx('education-level')}>{education.level}</div>
                                    <div className={cx('education-time')}>
                                        {education.from}-{education.to}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('work-exp-content')}>
                    <div className={cx('work-exp-title')}>
                        <p>Kinh nghiệm làm việc</p>
                    </div>
                    <div className={cx('work-exp')}>
                        {freelancer.work_exp.map((work_exp, index) => {
                            return (
                                <div key={index} className={cx('work-exp-detail')}>
                                    <div className={cx('work-exp-name')}>{work_exp.companyname}</div>
                                    <div className={cx('work-exp-position')}>{work_exp.position}</div>
                                    <div className={cx('work-exp-time')}>
                                        {work_exp.from}-{work_exp.to}
                                    </div>
                                    <div className={cx('work-exp-description')}>{work_exp.description}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Button admin className={cx('btn-warning')}>
                    {!banFlag ? 'Khóa tài khoản' : 'Mở khóa'}
                </Button>
            </div>
        </div>
    );
}

export default ViewDetailFreelancer;
