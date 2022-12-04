import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { faCheck, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputNumber, Button, message, Alert } from 'antd';

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
    const inputRefPush = useRef();
    const [services, setServices] = useState([]);
    const [show, setShow] = useState(false);
    const [serviceInfo, setServiceInfo] = useState({});
    const [user, setUser] = useState(users[0].id);
    const [postEdit, setPostEdit] = useState(false);
    const [applyEdit, setApplyEdit] = useState(false);
    const [viewEdit, setViewEdit] = useState(false);
    const [pushEdit, setPushEdit] = useState(false);
    const [postValue, setPostValue] = useState(1);
    const [applyValue, setApplyValue] = useState(0.5);
    const [viewValue, setViewValue] = useState(0.5);
    const [pushValue, setPushValue] = useState(0.5);
    const [postPreValue, setPostPreValue] = useState(1);
    const [applyPreValue, setApplyPreValue] = useState(0.5);
    const [viewPreValue, setViewPreValue] = useState(0.5);
    const [pushPreValue, setPushPreValue] = useState(0.5);
    const [benefits, setBenefit] = useState([]);
    const [fees, setFees] = useState([]);
    const [messageFee, setMessageFree] = useState('');
    const fetchApi = async () => {
        const result = await adminServiceServices.getServices(user);
        //console.log(result);
        setServices(result.services);
        setBenefit(result.benefits);
        setFees(result.fees);
        setPostValue(result.fees[0].price);
        setApplyValue(result.fees[1].price);
        setViewValue(result.fees[2].price);
        setPostPreValue(result.fees[0].price);
        setApplyPreValue(result.fees[1].price);
        setViewPreValue(result.fees[2].price);
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
        //console.log(result);
        if (result) {
            message.success({
                content: 'Sửa thành công',
                style: {
                    marginTop: '50px',
                },
            });
            if (flag === 'post') {
                setPostPreValue(price);
            } else if (flag === 'apply') {
                setApplyPreValue(price);
            } else {
                setViewPreValue(price);
            }
        } else {
            message.error({
                content: 'Sửa thất bại',
                style: {
                    marginTop: '50px',
                },
            });
            if (flag === 'post') {
                setPostValue(postPreValue);
            } else if (flag === 'apply') {
                setApplyValue(applyPreValue);
            } else {
                setViewValue(viewPreValue);
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
            if (postValue.toString().length > 10) {
                setMessageFree('Giá phải nhỏ hơn hoặc bằng 10 chữ số');
                return;
            } else {
                setMessageFree('');
                setPostEdit(false);
                editFeeApi(fees[0].id, postValue, 'post');
            }
        }
    };
    const handEditPriceApply = () => {
        if (!applyEdit) {
            setApplyEdit(true);
            inputRefApply.current.focus({
                cursor: 'end',
            });
        } else {
            if (applyValue.toString().length > 10) {
                setMessageFree('Giá phải nhỏ hơn hoặc bằng 10 chữ số');
                return;
            } else {
                setMessageFree('');
                setApplyEdit(false);
                editFeeApi(fees[1].id, applyValue, 'apply');
            }
        }
    };
    const handEditPriceView = () => {
        if (!viewEdit) {
            setViewEdit(true);
            inputRefView.current.focus({
                cursor: 'end',
            });
        } else {
            if (viewValue.toString().length > 10) {
                setMessageFree('Giá phải nhỏ hơn hoặc bằng 10 chữ số');
                return;
            } else {
                setMessageFree('');
                setViewEdit(false);
                editFeeApi(fees[2].id, viewValue, 'view');
            }
        }
    };
    const handEditPricePush = () => {
        if (!pushEdit) {
            setPushEdit(true);
            inputRefPush.current.focus({
                cursor: 'end',
            });
        }
        // else {
        //     if (viewValue.toString().length > 10) {
        //         setMessageFree('Giá phải nhỏ hơn hoặc bằng 10 chữ số');
        //         return;
        //     } else {
        //         setMessageFree('');
        //         setPushEdit(false);
        //         editFeeApi(fees[2].id, viewValue, 'push');
        //     }
        // }
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
                                    <td>{service.duration} Ngày</td>
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
                                    onChange={(value) => setPostValue(value)}
                                />
                            </div>
                            {!postEdit && (
                                <Button type="primary" onClick={handEditPricePost}>
                                    Sửa giá
                                </Button>
                            )}
                            {postEdit && (
                                <>
                                    <Button type="primary" onClick={handEditPricePost}>
                                        Xác nhận
                                    </Button>
                                    <p style={{ width: '5px' }}></p>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setPostEdit(false);
                                            setPostValue(postPreValue);
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </>
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
                                <>
                                    <Button type="primary" onClick={handEditPriceApply}>
                                        Xác nhận
                                    </Button>
                                    <p style={{ width: '5px' }}></p>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setApplyEdit(false);
                                            setApplyValue(applyPreValue);
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </>
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
                                <>
                                    <Button type="primary" onClick={handEditPriceView}>
                                        Xác nhận
                                    </Button>
                                    <p style={{ width: '5px' }}></p>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setViewEdit(false);
                                            setViewValue(viewPreValue);
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </>
                            )}
                        </div>
                        <div className={cx('fee-item')}>
                            <p>{fees[2].name}</p>
                            <div className={cx('input')}>
                                <InputNumber
                                    placeholder="$"
                                    ref={inputRefPush}
                                    disabled={!pushEdit}
                                    value={pushValue}
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={(e) => setPushValue(e)}
                                />
                            </div>
                            {!pushEdit && (
                                <Button type="primary" onClick={handEditPricePush}>
                                    Sửa giá
                                </Button>
                            )}
                            {pushEdit && (
                                <>
                                    <Button type="primary" onClick={handEditPricePush}>
                                        Xác nhận
                                    </Button>
                                    <p style={{ width: '5px' }}></p>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setPushEdit(false);
                                            setPushValue(pushPreValue);
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </>
                            )}
                        </div>
                        {messageFee !== '' && (
                            <Alert className={cx('messageError')} message={messageFee} type="error" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Service;
