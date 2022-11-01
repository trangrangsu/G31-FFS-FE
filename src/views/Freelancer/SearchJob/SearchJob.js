import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faBookmark, faComments } from '@fortawesome/free-regular-svg-icons';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Select } from 'antd';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import styles from './SearchJob.module.scss';

const cx = classNames.bind(styles);

const { Option } = Select;
const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const listCareer = [
    {
        careerName: 'Thiết kế',
        listSubcareer: ['Thiết kế logo', 'Thiết kế mỹ thuật', 'Kiến trúc', 'Decor phòng ngủ'],
    },
    {
        careerName: 'IT',
        listSubcareer: ['Lập trình web', 'Lập trình mobie', 'UX/UI'],
    },
    {
        careerName: 'Xây dựng',
        listSubcareer: ['Tạo bản vẽ', 'Thiết kế phòng ngủ', 'Xây dựng cầu đường', 'Trang trí phòng khách'],
    },
];

const SearchJob = () => {
    // const { collapseSidebar } = useProSidebar();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('page-title')}>Tìm kiếm việc làm</div>
                <div className={cx('left')}>
                    <div className={cx('left-component')}>
                        <ProSidebarProvider>
                            <Sidebar className={cx('list-career')}>
                                <Menu>
                                    {listCareer.map((career) => {
                                        return (
                                            <SubMenu className={cx('career')} label={career.careerName}>
                                                {career.listSubcareer.map((subcareer) => {
                                                    return (
                                                        <MenuItem>
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label={subcareer}
                                                            />
                                                        </MenuItem>
                                                    );
                                                })}
                                            </SubMenu>
                                        );
                                    })}
                                </Menu>
                            </Sidebar>
                        </ProSidebarProvider>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('right-component')}>
                        <div className={cx('banner')}>
                            I am looking for a full stack developer who is looking for long time work. I will provide
                            full details on my website including a test site and list of tasks to begin with. I am
                            looking for a developer who can offer me good rates for
                        </div>
                        <div className={cx('right-component')}>
                            <div className={cx('search-input')}>Search</div>
                            <div className={cx('combobox-filter')}>
                                <Select
                                    className={cx('select-location')}
                                    defaultValue="Vị trí"
                                    style={{ width: 130 }}
                                    onChange={handleChange}
                                >
                                    <Option value="Vị trí">Vị trí</Option>
                                    <Option value="Hà Nội">Hà Nội</Option>
                                    <Option value="Hải Phòng">Hải Phòng</Option>
                                </Select>

                                <Select
                                    className={cx('select-budget')}
                                    defaultValue="Ngân sách"
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleChange}
                                >
                                    <Option value="Ngân sách">Ngân sách</Option>
                                    <Option value="200.000đ - 500.000đ">200.000đ - 500.000đ</Option>
                                    <Option value="500.000đ - 1.000.000đ">500.000đ - 1.000.000đ</Option>
                                </Select>
                            </div>
                            <div className={cx('btn-search')}>
                                {' '}
                                <FontAwesomeIcon className={cx('ic-search')} icon={faMagnifyingGlass} />
                            </div>
                        </div>
                        <div className={cx('right-component')}>
                            <div className={cx('list-post')}>
                                <div className={cx('list-post-title')}>Danh sách bài đăng</div>
                                <div className={cx('post')}>
                                    <div className={cx('row1')}>
                                        <div className={cx('post-title')}>
                                            Thiết kế logo cho công ty quản lý điện CMS
                                        </div>
                                        <div className={cx('post-action')}>
                                            <FontAwesomeIcon className={cx('ic-action-apply')} icon={faHeart} />
                                            <FontAwesomeIcon className={cx('ic-action-save')} icon={faBookmark} />
                                        </div>
                                    </div>
                                    <div className={cx('row2')}>
                                        <div className={cx('post-payment')}>Theo giờ - </div>
                                        <div className={cx('post-budget')}>budget: 200.000vnđ - </div>
                                        <div className={cx('post-posted-time')}> Đã đăng 5h trước</div>
                                    </div>
                                    <div className={cx('row3')}>
                                        <div className={cx('post-description')}>
                                            I am looking for a full stack developer who is looking for long time work. I
                                            will provide full details on my website including a test site and list of
                                            tasks to begin with. I am looking for a developer who can offer me good
                                            rates for good quality of work in the quickest time frame. The project
                                            budget is not fixed but I am looking for the best possible rates but since I
                                            have lot... more
                                        </div>
                                    </div>
                                    <div className={cx('row4')}>
                                        <div className={cx('post-subcareer')}>Thiết kế logo</div>
                                    </div>
                                    <div className={cx('row5')}>
                                        <div className={cx('post-list-skill')}>
                                            <div className={cx('skill')}>UX/UI</div>
                                            <div className={cx('skill')}>JS</div>
                                            <div className={cx('skill')}>HTML</div>
                                            <div className={cx('skill')}>JAVA</div>
                                        </div>
                                    </div>
                                    <div className={cx('row6')}>
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
                                            <div className={cx('total-number-feedback')}></div>
                                        </div>
                                        <div className={cx('post-location')}>
                                            <FontAwesomeIcon IconclassName={cx('ic-location')} icon={faLocationDot} />
                                            Hòa Lạc
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchJob;
