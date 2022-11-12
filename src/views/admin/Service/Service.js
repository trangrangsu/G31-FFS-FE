import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { faCheck, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputNumber, Button, message } from 'antd';

import * as adminServiceServices from '../../../services/adminServiceServices';
import ServicePopUp from './ServicePopUp';
import styles from './Service.module.scss';
const cx = classNames.bind(styles);
function Service() {
    const headers = ['ID', 'TÊN DỊCH VỤ', 'THỜI GIAN', 'GIÁ TIỀN', 'CHỈNH SỬA'];
    const users = [
        { id: 3, name: 'Freelancer' },
        { id: 4, name: 'Recruiter' },
    ];
    const inputRefPost = useRef();
    const inputRefApply = useRef();
    const inputRefView = useRef();
    const [services, setServices] = useState([]);
    const [show, setShow] = useState(false);
    const [serviceInfo, setServiceInfo] = useState({});
    const [user, setUser] = useState(users[0].id);
    const [postEdit, setPostEdit] = useState(false);
    const [applyEdit, setApplyEdit] = useState(false);
    const [viewEdit, setViewEdit] = useState(false);
    const [postValue, setPostValue] = useState(1);
    const [applyValue, setApplyValue] = useState(0.5);
    const [viewValue, setViewValue] = useState(0.5);
    const [benefits, setBenefit] = useState([]);
    const [fees, setFees] = useState([]);
    const fetchApi = async () => {
        const result = await adminServiceServices.getServices(user);
        console.log(result);
        setServices(result.services);
        setBenefit(result.benefits);
        setFees(result.fees);
        setPostValue(result.fees[0].price);
        setApplyValue(result.fees[1].price);
        setViewValue(result.fees[2].price);
    };

    const updateServiceApi = async (service) => {
        const result = await adminServiceServices.updateService(service.id, service.price);
        console.log(result);
        if (result) {
            const index = services.findIndex((s) => s.id === service.id);
            setServices((pre) => {
                pre[index].price = service.price;
                return [...pre];
            });
        }
    };
    const editFeeApi = async (feeId, price, flag) => {
        const result = await adminServiceServices.editFee(feeId, price);
        console.log(result);
        if (result) {
            message.success('Sửa thành công');
        } else {
            message.error('Sửa thất bại');
            if (flag === 'post') {
                setPostValue(fees[0].price);
            } else if (flag === 'apply') {
                setApplyValue(fees[1].price);
            } else {
                setViewValue(fees[2].price);
            }
        }
    };
    useEffect(() => {
        fetchApi();
    }, []);
    useEffect(() => {
        fetchApi();
    }, [user]);
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };

    const handUpdate = (serviceInfo) => {
        setServiceInfo(serviceInfo);
        setShow(true);
    };
    const handEditPricePost = () => {
        if (!postEdit) {
            setPostEdit(true);
            inputRefPost.current.focus({
                cursor: 'end',
            });
        }
        if (postEdit) {
            setPostEdit(false);
            editFeeApi(fees[0].id, postValue, 'post');
        }
    };
    const handEditPriceApply = () => {
        if (!applyEdit) {
            setApplyEdit(true);
            inputRefApply.current.focus({
                cursor: 'end',
            });
        } else {
            setApplyEdit(false);
            editFeeApi(fees[1].id, applyValue, 'apply');
        }
    };
    const handEditPriceView = () => {
        if (!viewEdit) {
            setViewEdit(true);
            inputRefView.current.focus({
                cursor: 'end',
            });
        } else {
            setViewEdit(false);
            editFeeApi(fees[2].id, viewValue, 'view');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Dịch vụ</h1>

                <div className={cx('subcareer-filter')}>
                    <div className={cx('service-list')}>
                        <select
                            value={user}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setUser(e.target.value);
                            }}
                        >
                            {users.map((user, index) => {
                                return (
                                    <option key={index} value={user.id}>
                                        {user.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {show && (
                        <ServicePopUp
                            user={user}
                            service={serviceInfo}
                            callback={(service) => {
                                setShow(false);
                                updateServiceApi(service);
                            }}
                        />
                    )}
                </div>
                <table className={cx('subCareers')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {services.map((service) => {
                            return (
                                <tr key={service.id}>
                                    <td>{service.id}</td>
                                    <td>{service.serviceName}</td>
                                    <td>{service.duration}</td>
                                    <td>{service.price} $</td>
                                    <td>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faPenClip}
                                            onClick={() => handUpdate(service)}
                                            className={cx('hover')}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className={cx('benefits')}>
                    <p>Các tính năng của gói dịch vụ</p>
                    <ul>
                        {benefits.map((benefit) => (
                            <li key={benefit.id}>
                                <FontAwesomeIcon icon={faCheck} />
                                {benefit.name}
                            </li>
                        ))}
                    </ul>
                </div>
                {fees.length > 0 && (
                    <div className={cx('fee')}>
                        <p className={cx('fee-title')}>Phí dịch vụ</p>
                        <div className={cx('fee-item')}>
                            <p>{fees[0].name}</p>
                            <div className={cx('input')}>
                                <InputNumber
                                    placeholder="$"
                                    ref={inputRefPost}
                                    disabled={!postEdit}
                                    value={postValue}
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={(e) => setPostValue(e)}
                                />
                            </div>
                            {!postEdit && (
                                <Button type="primary" onClick={handEditPricePost}>
                                    Sửa giá
                                </Button>
                            )}
                            {postEdit && (
                                <Button type="primary" onClick={handEditPricePost}>
                                    Xác nhận
                                </Button>
                            )}
                        </div>
                        <div className={cx('fee-item')}>
                            <p>{fees[1].name}</p>
                            <div className={cx('input')}>
                                <InputNumber
                                    placeholder="$"
                                    ref={inputRefApply}
                                    disabled={!applyEdit}
                                    value={applyValue}
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={(e) => setApplyValue(e)}
                                />
                            </div>
                            {!applyEdit && (
                                <Button type="primary" onClick={handEditPriceApply}>
                                    Sửa giá
                                </Button>
                            )}
                            {applyEdit && (
                                <Button type="primary" onClick={handEditPriceApply}>
                                    Xác nhận
                                </Button>
                            )}
                        </div>
                        <div className={cx('fee-item')}>
                            <p>{fees[2].name}</p>
                            <div className={cx('input')}>
                                <InputNumber
                                    placeholder="$"
                                    ref={inputRefView}
                                    disabled={!viewEdit}
                                    value={viewValue}
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={(e) => setViewValue(e)}
                                />
                            </div>
                            {!viewEdit && (
                                <Button type="primary" onClick={handEditPriceView}>
                                    Sửa giá
                                </Button>
                            )}
                            {viewEdit && (
                                <Button type="primary" onClick={handEditPriceView}>
                                    Xác nhận
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Service;
