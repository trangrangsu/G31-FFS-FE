import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormInput } from '@coreui/react';

import CustomButton from '../../../components/Button';
import styles from './Service.module.scss';
const cx = classNames.bind(styles);

function ServicePopUp({ user, service, callback }) {
    const users = [
        { id: 3, name: 'Freelancer' },
        { id: 4, name: 'Recruiter' },
    ];

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
        if (service.id) {
            setId(service.id);
            setName(service.serviceName);
            setDuration(service.duration);
            setPrice(service.price);
            setTitleButton('Cập nhật');
            setTitlePopup('Chỉnh sửa dịch vụ');
        }
    }, []);
    const handleUpdate = () => {
        const service = {
            id,
            serviceName: name,
            duration: duration,
            price: price,
            role: { id: users.find((user) => user.id == userCurrent).id },
        };
        handleClose(service);
    };
    return (
        <div className={cx('service-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titlePopup}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx('background-color')}>
                    <div className={cx('pop-up')}>
                        <div className={cx('user-box')}>
                            <label className={cx('label')}>Vai trò</label>
                            <div className={cx('service-list-popup')}>
                                <p>{user === 3 ? 'Freelancer' : 'Recruiter'}</p>
                            </div>
                        </div>
                        <div className={cx('input')}>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>Tên dịch vụ</label>
                                <CFormInput
                                    disabled
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
                                    disabled
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
                    </div>
                    <CustomButton approve className={cx('btn-add')} onClick={handleUpdate}>
                        {titleButton}
                    </CustomButton>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ServicePopUp;
