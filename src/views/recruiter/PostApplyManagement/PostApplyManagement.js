import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import images from '../../../assets/images';
import Image from '../../../components/Image';
import { Pagination } from 'antd';
import { Select } from 'antd';
import styles from './PostApplyManagement.module.scss';
const cx = classNames.bind(styles);

const { Search } = Input;
const numberFreelancerAvaialble = 30;

const skills = ['Python', 'C++', 'OOP', 'UX/UI'];
const { Option } = Select;
const listFreelancer = [
    {
        avatar: '',
        userName: 'CongBV',
        subCareer: 'Lập trình viên mobie',
        location: 'Hòa Lạc',
        numberSkillRelevant: 4,
        listSkill: ['Python', 'C++', 'OOP', 'UX/UI'],
        avgStartPoint: 4.5,
        totalFeedBack: 10,
    },
    {
        avatar: '',
        userName: 'ManhNV',
        subCareer: 'Lập trình viên website',
        location: 'Bắc Giang',
        numberSkillRelevant: 3,
        listSkill: ['JS', 'HTML', 'CSS', 'React', 'UX/UI'],
        avgStartPoint: 5.0,
        totalFeedBack: 45,
    },
    {
        avatar: '',
        userName: 'TuyenNH',
        subCareer: 'Designer',
        location: 'Hà Nội',
        numberSkillRelevant: 2,
        listSkill: ['UX/UI', 'Photoshop', 'Adobe'],
        avgStartPoint: 5.0,
        totalFeedBack: 20,
    },
    {
        avatar: '',
        userName: 'TrangNB',
        subCareer: 'Thiết kế website font-end',
        location: 'Bắc Ninh',
        numberSkillRelevant: 4,
        listSkill: ['JS', 'HTML', 'CSS', 'React', 'UX/UI'],
        avgStartPoint: 4.5,
        totalFeedBack: 30,
    },
];
function PostApplyManagement() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => console.log(value);
    const [image, setImage] = useState(images.defaultAvatar);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div className={cx('nav-item1')}>Chi tiết bài đăng</div>
                <div className={cx('nav-item2')}>Quản lý ứng viên</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('list-freelancer')}>
                    <div className={cx('list-head')}>
                        <div className={cx('head-item1')}>Ứng tuyển</div>
                        <div className={cx('head-item2')}>Chấp thuận</div>
                        <div className={cx('head-item3')}>Từ chối</div>
                    </div>
                    <div className={cx('search-area')}>
                        <div className={cx('search-input')}>
                            <Select
                                defaultValue="Skill"
                                style={{
                                    width: 150,
                                }}
                                onChange={handleChange}
                            >
                                {skills.map((skill) => {
                                    return <Option value={skill}>{skill}</Option>;
                                })}
                            </Select>

                            <Search
                                placeholder="input something"
                                style={{
                                    width: 500,
                                }}
                                onSearch={onSearch}
                                enterButton
                            />
                        </div>

                        <div className={cx('total-number-freelancer')}>
                            <div className={cx('txt1')}>{numberFreelancerAvaialble} freelancer</div>
                            <div className={cx('txt2')}>sẵn sàng</div>
                        </div>
                    </div>
                    {listFreelancer.map((freelancer) => {
                        return (
                            <div className={cx('freelancer')}>
                                <div className={cx('left')}>
                                    <div className={cx('avatar')}>
                                        <Image src={image} alt="avatar" />
                                    </div>
                                </div>
                                <div className={cx('right')}>
                                    <div className={cx('row1')}>
                                        <div className={cx('freelancer-username')}>{freelancer.userName}</div>
                                        <div className={cx('action')}>
                                            <div className={cx('btn-approve')}>Chấp thuận</div>
                                            <div className={cx('btn-deny')}>Từ chối</div>
                                        </div>
                                    </div>
                                    <div className={cx('row2')}>
                                        <div className={cx('freelancer-subcareer')}>{freelancer.subCareer}</div>

                                        <div className={cx('row3')}>
                                            {/* <div className={cx('number-skill-relevant')}>
                                                Có {freelancer.numberSkillRelevant} kĩ năng phù hợp
                                            </div> */}
                                            <div className={cx('freelancer-location')}>
                                                <FontAwesomeIcon icon={faLocationDot} />
                                                {freelancer.location}
                                            </div>
                                        </div>
                                        <div className={cx('row4')}>
                                            <div className={cx('skills')}>
                                                {freelancer.listSkill.map((skill) => {
                                                    return <div className={cx('skill')}>{skill}</div>;
                                                })}
                                                ;
                                            </div>
                                        </div>
                                        <div className={cx('row5')}>
                                            {' '}
                                            <div className={cx('left-area')}>
                                                <div className={cx('feedback-title')}>AVG star</div>
                                                <div className={cx('ic-feedback')}>
                                                    <FontAwesomeIcon IconclassName={cx('ic-cmt')} icon={faStar} />
                                                </div>
                                            </div>
                                            <div className={cx('right-area')}>
                                                <div className={cx('avg-star-point')}>
                                                    {freelancer.avgStartPoint} điểm
                                                </div>
                                                <div className={cx('total-number-feedback')}>
                                                    Tổng số {freelancer.totalFeedBack} phản hồi
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('paging')}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </div>
    );
}

export default PostApplyManagement;
