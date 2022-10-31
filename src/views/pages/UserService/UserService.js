import React from 'react';
import classNames from 'classnames/bind';
import { CButton } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import images from '../../../assets/images';
import styles from './UserService.module.scss';
import { faCheck, faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const UserService = () => {
    const service = [
        {
            id: '1',
            name: 'Gold',
            date: '3 tháng',
            price: '360.000đ',
        },
        {
            id: '2',
            name: 'Premium',
            date: '6 tháng',
            price: '760.000đ',
        },
        {
            id: '3',
            name: 'Diamond',
            date: '6 tháng',
            price: '760.000đ',
        },
    ];

    const active = [{ name: 'Tài khoản Freelancer của bạn chưa sử dụng gói nào' }];

    const chooseservice = [{ service1: 'Gold ', service2: 'Premium', service3: 'Diamond', date1: '3 tháng' }];

    const namechooseservice = [{ price: '360.000đ' }];
    const service1 = [
        {
            title: 'Miễn phí apply công việc',
            title2: 'Miễn phí lượt xem hồ sơ recruiter',
            title3: 'view list job ở top nổi bật',
        },
    ];
    const service2 = [
        {
            title: 'Miễn phí đăng bài',
            title2: 'Lượt xem hồ sơ freelancer',
            title3: 'Đẩy top job',
            title4: 'View top 10 Freelancer nổi bật (đánh giá theo số sao)',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bannerSale-first')}>
                <div className={cx('bannerSale_left')}>
                    <a href="..">
                        <img src={images.sales} className={cx('mb-bank')} />
                    </a>
                </div>
            </div>
            <div className={cx('container-main')}>
                <div className={cx('container')}>
                    <div className={cx('container-header')}>
                        {active.map((actives) => {
                            return <h6 key={actives.title}>{actives.name}</h6>;
                        })}
                    </div>
                    <h2>Nâng cấp tài khoản dành cho khách hàng</h2>
                    <div className={cx('container-title')}>
                        <h5>Chọn gói phù hợp</h5>
                    </div>
                    <div className={cx('container-month-service')}>
                        <CButton color="light" shape="rounded-0" className={cx('container-month-service-button')}>
                            <div className={cx('button-no1')}>
                                <FontAwesomeIcon icon={faCircle} className={cx('service-button-icon')} />
                            </div>
                            <div className={cx('button-no2')}>
                                {chooseservice.map((chooseservices) => {
                                    return <h6 key={chooseservices.service1}>{chooseservices.service1}</h6>;
                                })}
                            </div>
                            <div className={cx('container-discount')}>
                                <span></span>
                            </div>
                        </CButton>
                        <CButton color="light" shape="rounded-0" className={cx('container-month-service-button2')}>
                            <div className={cx('button-no1')}>
                                <FontAwesomeIcon icon={faCircleDot} className={cx('service-button-icon')} />
                            </div>
                            <div className={cx('button-no2')}>
                                {chooseservice.map((chooseservices) => {
                                    return <h6 key={chooseservices.service2}>{chooseservices.service2}</h6>;
                                })}
                            </div>
                            <div className={cx('container-discount')}>
                                <span>-15%</span>
                            </div>
                        </CButton>
                        <CButton color="light" shape="rounded-0" className={cx('container-month-service-button3')}>
                            <div className={cx('button-no1')}>
                                <FontAwesomeIcon icon={faCircleDot} className={cx('service-button-icon')} />
                            </div>
                            <div className={cx('button-no2')}>
                                {chooseservice.map((chooseservices) => {
                                    return <h6 key={chooseservices.service3}>{chooseservices.service3}</h6>;
                                })}
                            </div>
                            <div className={cx('container-discount-one')}>
                                <span>-20%</span>
                            </div>
                        </CButton>
                    </div>
                </div>
                <div className={cx('container-service')}>
                    <div className={cx('container-service-detail')}>
                        <div className={cx('service-detail-item')}>
                            {namechooseservice.map((chooseservices) => {
                                return <h2 key={chooseservices.price}>{chooseservices.price}</h2>;
                            })}
                        </div>
                        {chooseservice.map((chooseservices) => {
                            return (
                                <div className={cx('detail-item-p')}>
                                    <tr>
                                        <td>
                                            Với gói <b>{chooseservices.service1}</b>
                                            thì bạn có thể sử dụng được các tính năng ở dưới đây hoàn toàn miễn phí
                                            trong <b>{chooseservices.date1}</b>
                                        </td>
                                    </tr>
                                </div>
                            );
                        })}
                        <div className={cx('service-detail-item2')}>
                            {service1.map((service) => {
                                return (
                                    <div className={cx('row-detail')} key={service.title}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </td>
                                                <h6>{service.title}</h6>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </td>
                                                <h6>{service.title2}</h6>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </td>
                                                <h6>{service.title3}</h6>
                                            </tr>
                                        </tbody>
                                    </div>
                                );
                            })}
                        </div>
                        <CButton color="light" className={cx('detail-icon')}>
                            <h5>Nâng Cấp Tài Khoản</h5>
                        </CButton>
                    </div>
                </div>
            </div>
            <div className={cx('bannerSale-second')}>
                <div className={cx('bannerSale_right')}>
                    <a href="..">
                        <img src={images.sales} className={cx('mb-bank')} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserService;
