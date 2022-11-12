import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CButton } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import * as userServiceServices from '../../../services/userServiceServices';
import images from '../../../assets/images';
import styles from './UserService.module.scss';
import { faCheck, faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const UserService = () => {
    const account = useSelector((state) => state.account);
    const accountBalance = useSelector((state) => state.accountBalance);
    const dispatch = useDispatch();
    const [services, setServices] = useState([{ serviceName: '' }, { serviceName: '' }, { serviceName: '' }]);
    const [currentService, setCurrentService] = useState({ benefits: [] });
    const [benefits, setBenefits] = useState([]);
    const getServicesApi = async () => {
        const result = await userServiceServices.getServices('freelancer');
        console.log(result);
        setServices(result.services);
        setCurrentService(result.services[0]);
        setBenefits(result.benefits);
    };
    const buyServiceApi = async () => {
        const result = await userServiceServices.buyService(account.userId, currentService.id);
        console.log(result);
        if (result) {
            dispatch({ type: 'set', accountBalance: accountBalance - parseFloat(currentService.price) });
            message.success('Bạn đã mua thành công gói ' + currentService.serviceName);
        } else {
            message.error('Mua thất bại gói ' + currentService.serviceName);
        }
    };
    useEffect(() => {
        getServicesApi();
    }, []);
    const handleBuyService = () => {
        buyServiceApi();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('bannerSale-first')}>
                    <img src={images.sales} className={cx('mb-bank')} alt="banner" />
                </div>
                <div className={cx('container-main')}>
                    <div className={cx('container')}>
                        <div className={cx('container-header')}>
                            {/* <h6>Tài khoản Freelancer của bạn chưa sử dụng gói nào</h6>; */}
                        </div>
                        <h2>Nâng cấp tài khoản dành cho khách hàng</h2>
                        <div className={cx('container-title')}>
                            <h5>Chọn gói phù hợp</h5>
                        </div>
                        <div className={cx('container-month-service')}>
                            <CButton
                                color="light"
                                shape="rounded-0"
                                className={cx('container-month-service-button')}
                                onClick={() => setCurrentService(services[0])}
                            >
                                <div className={cx('button-no1')}>
                                    <FontAwesomeIcon icon={faCircle} className={cx('service-button-icon')} />
                                </div>
                                <div className={cx('button-no2')}>
                                    <h6>{services[0].serviceName}</h6>
                                </div>
                                <div className={cx('container-discount')}>
                                    <span></span>
                                </div>
                            </CButton>
                            <CButton
                                color="light"
                                shape="rounded-0"
                                className={cx('container-month-service-button2')}
                                onClick={() => setCurrentService(services[1])}
                            >
                                <div className={cx('button-no1')}>
                                    <FontAwesomeIcon icon={faCircleDot} className={cx('service-button-icon')} />
                                </div>
                                <div className={cx('button-no2')}>
                                    <h6>{services[1].serviceName}</h6>
                                </div>
                                <div className={cx('container-discount')}>
                                    <span>-15%</span>
                                </div>
                            </CButton>
                            <CButton
                                color="light"
                                shape="rounded-0"
                                className={cx('container-month-service-button3')}
                                onClick={() => setCurrentService(services[2])}
                            >
                                <div className={cx('button-no1')}>
                                    <FontAwesomeIcon icon={faCircleDot} className={cx('service-button-icon')} />
                                </div>
                                <div className={cx('button-no2')}>
                                    <h6>{services[2].serviceName}</h6>
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
                                <h2>{currentService.price} USD</h2>
                            </div>
                            <div className={cx('detail-item-p')}>
                                Với gói <b>{currentService.serviceName}</b>
                                thì bạn có thể sử dụng được các tính năng ở dưới đây hoàn toàn miễn phí trong{' '}
                                <b>{currentService.duration}</b>
                            </div>
                            <div className={cx('service-detail-item2')}>
                                {benefits.map((benefit) => {
                                    return (
                                        <div className={cx('row-detail')} key={benefit.id}>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </td>
                                                    <h6>{benefit.name}</h6>
                                                </tr>
                                            </tbody>
                                        </div>
                                    );
                                })}
                            </div>
                            <CButton color="light" className={cx('detail-icon')} onClick={handleBuyService}>
                                <h5>Nâng Cấp Tài Khoản</h5>
                            </CButton>
                        </div>
                    </div>
                </div>
                <div className={cx('bannerSale-second')}>
                    <img src={images.sales} className={cx('mb-bank')} alt="banner" />
                </div>
            </div>
        </div>
    );
};

export default UserService;
