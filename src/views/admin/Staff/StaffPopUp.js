import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormCheck, CFormInput } from '@coreui/react';

import * as staffService from '../../../services/staffService';
import CustomButton from '../../../components/Button';
import styles from './Staff.module.scss';
const cx = classNames.bind(styles);
function StaffPopUp({ staff, callback }) {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        callback();
    };
    const [id, setID] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [titleButton, setTitleButton] = useState('Thêm mới');
    const [titlePopup, setTitlePopup] = useState('Thêm mới Nhân viên');

    useEffect(() => {
        if (staff.id) {
            setID(staff.id);
            setFullName(staff.fullname);
            setEmail(staff.email);
            setPhone(staff.phone);
            setAddress(staff.address);
            setTitleButton('Cập nhật');
            setTitlePopup('Cập nhật thông tin nhân viên');
        }
    }, []);

    const handleAdd = () => {
        if (password === passwordConfirm) {
            const staff = {
                id,
                fullName,
                email,
                password,
                phone,
                address,
                role: '2',
            };
            const fetchApi = async () => {
                const result = await staffService.addStaff(staff);
                console.log(result);
            };
            fetchApi();
            handleClose();
            console.log(staff);
        }
    };
    return (
        <div className={cx('staff-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titlePopup}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>
                        <div className={cx('input-staff')}>
                            <label className={cx('label')}>Tên nhân viên:</label>
                            <CFormInput
                                type="text"
                                placeholder="Nhập tên nhân viên"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className={cx('input-info')}
                            />
                            <label className={cx('label')}>Email:</label>
                            <CFormInput
                                type="text"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={cx('input-info')}
                            />
                            {staff.status === undefined ? (
                                <div className={cx('staff-password')}>
                                    <div>
                                        <label className={cx('label')}>Password:</label>
                                        <CFormInput
                                            type="password"
                                            placeholder="Nhập mật khẩu"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={cx('input-info')}
                                        />
                                    </div>
                                    <div>
                                        {' '}
                                        <label className={cx('label')}>ConfirmPassword:</label>
                                        <CFormInput
                                            type="password"
                                            placeholder="Xác nhận mật khẩu"
                                            value={passwordConfirm}
                                            onChange={(e) => setPasswordConfirm(e.target.value)}
                                            className={cx('input-info')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('staff-checkbox')}>
                                    <CFormCheck
                                        id={staff.id}
                                        defaultChecked={staff.status === '1' ? 'defaultChecked' : ''}
                                        label="Hoạt động"
                                    />
                                </div>
                            )}
                            <label className={cx('label')}>Số điện thoại:</label>
                            <CFormInput
                                type="text"
                                placeholder="Nhập số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={cx('input-info')}
                            />
                            <label className={cx('label')}> Địa chỉ:</label>
                            <CFormInput
                                type="text"
                                placeholder="Nhập địa chỉ"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className={cx('input-info')}
                            />
                            <div className={cx('center')}>
                                <CustomButton approve className={cx('btn-add')} onClick={handleAdd}>
                                    {titleButton}
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StaffPopUp;
