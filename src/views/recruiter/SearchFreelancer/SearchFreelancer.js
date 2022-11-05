import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SearchFreelancer.module.scss';
import Button from '../../../components/Button';
import Feedback from '../../freelancer/Profile/Feedback';
import { faCircle, faCircleDot, faCircleNotch, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const SearchFreelancer = () => {
    const person = [{ person1: '30' }];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1>Tìm và tuyển ứng viên</h1>
                    <Button className={cx('btn-post')}>Đăng tuyển</Button>
                </div>
                <div className={cx('search')}>
                    <div className={cx('filter')}>
                        <div className={cx('filter-search')}>
                            <input placeholder="Tìm kiếm ứng viên" className={cx('search-now')} />
                            <div className={cx('button')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('faMagnify')} />
                            </div>
                            <div className={cx('button-first')}>
                                <FontAwesomeIcon icon={faFilter} className={cx('faFilter')} />
                                Lọc
                            </div>
                        </div>
                        {/* <div className={cx('filterp')}></div> */}
                        <div className={cx('choose-item')}>
                            <div className={cx('date')}>
                                <h5>Chi phí/Giờ</h5>
                                <div>
                                    <input type="radio" id="" name="" value="" checked />
                                    <label for="">Tất cả mức chi phí/giờ</label>
                                </div>

                                <div>
                                    <input type="radio" id="" name="" value="" />
                                    <label for="">Dưới 100k vnd</label>
                                </div>

                                <div>
                                    <input type="radio" id="" name="" value="" />
                                    <label for="">100k - 200k vnd</label>
                                </div>

                                <div>
                                    <input type="radio" id="" name="" value="" />
                                    <label for="">200k - 500k vnd</label>
                                </div>

                                <div>
                                    <input type="radio" id="" name="" value="" />
                                    <label for="">Trên 500k vnd</label>
                                </div>
                            </div>
                            <div className={cx('career')}>
                                <div className={cx('career-first')}>
                                    <h5>Lĩnh vực</h5>
                                    <select>
                                        <option>Chọn lĩnh vực</option>
                                        <option>Saab</option>
                                        <option>Mercedes</option>
                                        <option>Audi</option>
                                    </select>
                                </div>
                                <div className={cx('address')}>
                                    <h5>Địa điểm</h5>
                                    <tr>
                                        <td>
                                            <div className={cx('button-second')}>
                                                <FontAwesomeIcon
                                                    icon={faMagnifyingGlass}
                                                    className={cx('faMagnifyy')}
                                                />
                                            </div>
                                        </td>
                                        <input placeholder="Tìm kiếm địa điểm" className={cx('search-first')} />
                                    </tr>
                                </div>
                            </div>
                            <div className={cx('skills')}>
                                <h5>Kỹ năng</h5>
                                <select>
                                    <option>Chọn kỹ năng</option>
                                    <option>Saab</option>
                                    <option>Mercedes</option>
                                    <option>Audi</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx('button-close')}>
                            <Button className={cx('btn-closes')}>Đóng</Button>
                        </div>
                    </div>
                    {person.map((persons) => {
                        return (
                            <div className={cx('infor-person')}>
                                <p>
                                    Có<b> {persons.person1} </b>
                                    người ứng tuyển phù hợp
                                </p>
                            </div>
                        );
                    })}
                    <div className={cx('infor-freelancer')}>
                        <Feedback userId="1" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFreelancer;
