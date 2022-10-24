import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormCheck, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody, CFormInput } from '@coreui/react';

import * as adminServiceServices from '../../../services/adminServiceServices';
import CustomButton from '../../../components/Button';
import styles from './Service.module.scss';
const cx = classNames.bind(styles);

function ServicePopUp({ user, service, callback }) {
    const users = [
        { id: 3, name: 'Freelancer' },
        { id: 4, name: 'Recruiter' },
    ];

    //const bought = [1, 2, 3];
    const [bought, setBought] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [show, setShow] = useState(true);
    const [userCurrent, setUserCurrent] = useState(user);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [titleButton, setTitleButton] = useState('Thêm mới');
    const [titlePopup, setTitlePopup] = useState('Thêm mới một dịch vụ');
    const handleClose = (service) => {
        setShow(false);
        callback(service);
    };
    useEffect(() => {
        console.log(userCurrent);
        const sbsApi = async () => {
            const result = await adminServiceServices.getBenefitService(service.id);
            console.log(result);
            setBought(result);
        };
        if (service.id) {
            setId(service.id);
            setName(service.serviceName);
            setDuration(service.duration);
            setPrice(service.price);
            setTitleButton('Cập nhật');
            setTitlePopup('Chỉnh sửa dịch vụ');
            sbsApi();
        }
        const fetchApi = async () => {
            const result = await adminServiceServices.getBenefits();
            console.log(result);
            setBenefits(result);
        };
        fetchApi();
    }, []);
    const handleAdd = () => {
        const service = {
            serviceName: name,
            duration: duration,
            price: price,
            benefits: [
                {
                    id: 1,
                },
                {
                    id: 2,
                },
            ],
            role: { id: users.find((user) => user.id == userCurrent).id },
        };
        //handleClose(service);

        console.log(service);
        // const fetchApi = async () => {
        //     const result = await adminServiceServices.addService(service);
        //     console.log(result);
        //     setBenefits(result);
        // };
        // fetchApi();
    };
    const handleUpdate = () => {
        const service = {
            id,
            serviceName: name,
            duration: duration,
            price: price,
            benefits: [
                {
                    id: 1,
                },
                {
                    id: 2,
                },
            ],
            role: { id: users.find((user) => user.id == userCurrent).id },
        };
        handleClose();
        console.log(service);
        const fetchApi = async () => {
            const result = await adminServiceServices.addService(service);
            console.log(result);
            setBenefits(result);
        };
        fetchApi();
    };
    return (
        <div className={cx('service-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titlePopup}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>
                        <div className={cx('user-box')}>
                            <label className={cx('label')}>Vai trò</label>
                            <div className={cx('service-list-popup')}>
                                <select value={userCurrent} onChange={(e) => setUserCurrent(e.target.value)}>
                                    {users.map((user, index) => {
                                        return (
                                            <option key={index} value={user.id}>
                                                {user.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className={cx('input')}>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>Tên dịch vụ</label>
                                <CFormInput
                                    size="sm"
                                    className={cx('input-field')}
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>Thời gian</label>
                                <CFormInput
                                    size="sm"
                                    className={cx('input-field')}
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>Giá</label>
                                <CFormInput
                                    size="sm"
                                    className={cx('input-field')}
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('benefit-container')}>
                            <label className={cx('label')}>Quyền lợi</label>
                            <div className={cx('benefits')}>
                                {benefits.map((benefit) => {
                                    return (
                                        <div className={cx('row-benefit')} key={benefit.id}>
                                            <CFormCheck
                                                id={benefit.id}
                                                defaultChecked={
                                                    bought.find((b) => b.id === benefit.id) ? 'defaultChecked' : ''
                                                }
                                            />
                                            <CAccordion>
                                                <CAccordionItem itemKey={benefit.id}>
                                                    <CAccordionHeader>
                                                        {benefit.name.substring(0, 20) + '...'}
                                                    </CAccordionHeader>
                                                    <CAccordionBody>{benefit.name}</CAccordionBody>
                                                </CAccordionItem>
                                            </CAccordion>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {service.id ? (
                        <CustomButton admin className={cx('btn-add')} onClick={handleUpdate}>
                            {titleButton}
                        </CustomButton>
                    ) : (
                        <CustomButton admin className={cx('btn-add')} onClick={handleAdd}>
                            {titleButton}
                        </CustomButton>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ServicePopUp;
