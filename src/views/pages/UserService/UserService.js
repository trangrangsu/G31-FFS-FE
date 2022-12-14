import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CButton } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { message, notification, Popconfirm } from 'antd';

import * as userServiceServices from '../../../services/userServiceServices';
import images from '../../../assets/images';
import styles from './UserService.module.scss';
import { faCheck, faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Thông báo',
        description: 'Tài khoản không còn đủ số dư. Vui lòng nạp thêm tiền',
    });
};
const text = 'Bạn đã chắc chắn nâng cấp tài khoản?';
const UserService = () => {
    const account = useSelector((state) => state.account);
    const accountBalance = useSelector((state) => state.accountBalance);
    const currentServiceName = useSelector((state) => state.currentServiceName);
    const durationRemain = useSelector((state) => state.durationRemain);
    const currentServiceId = useSelector((state) => state.currentServiceId);
    const dispatch = useDispatch();
    const [services, setServices] = useState([{ serviceName: '' }, { serviceName: '' }, { serviceName: '' }]);
    const [currentService, setCurrentService] = useState({});
    const [benefits, setBenefits] = useState([]);
    const [active, setActive] = useState(1);
    const userRole = localStorage.getItem('userRole');

    const getServicesApi = async () => {
        const result = await userServiceServices.getServices(userRole);
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
            dispatch({ type: 'set', isMemberShip: true });
            dispatch({ type: 'set', currentServiceName: currentService.serviceName });
            dispatch({ type: 'set', durationRemain: currentService.duration });
            dispatch({ type: 'set', currentServiceId: currentService.id });
            message.success('Bạn đã mua thành công gói ' + currentService.serviceName);
        } else {
            message.error('Mua thất bại gói ' + currentService.serviceName);
        }
    };
    useEffect(() => {
        getServicesApi();
    }, []);
    const handleBuyService = () => {
        if (accountBalance - parseFloat(currentService.price) > 0) {
            buyServiceApi();
        } else {
            openNotificationWithIcon('warning');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('bannerSale-first')}>
                    <img src={images.bannerSearchFreelancer} className={cx('mb-bank')} alt="banner" />
                </div>
                <div className={cx('container-main')}>
                    <div className={cx('container')}>
                        <div className={cx('container-header')}>
                            {currentServiceName ? (
                                <div className={cx('message-header')}>
                                    <h6>Bạn đang là hội viên {currentServiceName}</h6>
                                    <p>Thời gian còn lại là {durationRemain} ngày</p>
                                </div>
                            ) : (
                                <h6>Bạn chưa là hội viên của Lanceddy</h6>
                            )}
                        </div>
                        <h2>Nâng cấp tài khoản dành cho khách hàng</h2>
                        <div className={cx('container-title')}>
                            <h5>Chọn gói phù hợp</h5>
                        </div>
                        <div className={cx('container-month-service')}>
                            <CButton
                                color="light"
                                shape="rounded-0"
                                className={cx('service-name', active === 1 ? 'active' : '')}
                                onClick={() => {
                                    setCurrentService(services[0]);
                                    setActive(1);
                                }}
                            >
                                <div className={cx('button-no1')}>
                                    <FontAwesomeIcon
                                        icon={active === 1 ? faCircle : faCircleDot}
                                        className={cx('service-button-icon')}
                                    />
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
                                className={cx('service-name', active === 2 ? 'active' : '')}
                                onClick={() => {
                                    setCurrentService(services[1]);
                                    setActive(2);
                                }}
                            >
                                <div className={cx('button-no1')}>
                                    <FontAwesomeIcon
                                        icon={active === 2 ? faCircle : faCircleDot}
                                        className={cx('service-button-icon')}
                                    />
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
                                className={cx('service-name', active === 3 ? 'active' : '')}
                                onClick={() => {
                                    setCurrentService(services[2]);
                                    setActive(3);
                                }}
                            >
                                <div className={cx('button-no1')}>
                                    <FontAwesomeIcon
                                        icon={active === 3 ? faCircle : faCircleDot}
                                        className={cx('service-button-icon')}
                                    />
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
                                Với gói <b>{currentService.serviceName} </b>
                                thì bạn có thể sử dụng được các tính năng ở dưới đây hoàn toàn miễn phí trong{' '}
                                <b>{currentService.duration}</b> ngày
                            </div>
                            <ul className={cx('service-detail-item2')}>
                                {benefits.map((benefit) => {
                                    if (benefit.id === 5 && currentService.serviceName === 'Gold') {
                                        return (
                                            <li className={cx('row-detail')} key={benefit.id} hidden>
                                                <FontAwesomeIcon icon={faCheck} />
                                                <span>{benefit.name}</span>
                                            </li>
                                        );
                                    }
                                    return (
                                        <li className={cx('row-detail')} key={benefit.id}>
                                            <FontAwesomeIcon icon={faCheck} />
                                            <span>{benefit.name}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <Popconfirm
                                placement="top"
                                title={text}
                                onConfirm={handleBuyService}
                                okText="Nâng cấp"
                                cancelText="Không"
                            >
                                <CButton
                                    color="light"
                                    disabled={currentService.id <= currentServiceId ? true : false}
                                    className={cx('detail-icon')}
                                    // onClick={handleBuyService}
                                >
                                    <h5>Nâng Cấp Tài Khoản</h5>
                                </CButton>
                            </Popconfirm>
                        </div>
                    </div>
                </div>
                <div className={cx('bannerSale-second')}>
                    <img src={images.bannerSearchFreelancer} className={cx('mb-bank')} alt="banner" />
                </div>
            </div>
        </div>
    );
};

export default UserService;
