import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormCheck, CFormInput } from '@coreui/react';
import { message, Alert } from 'antd';

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
    const [messageName, setMessageName] = useState('');
    const [messagePhone, setMessagePhone] = useState('');
    const [messageEmail, setMessageEmail] = useState('');
    const [messagePassword, setMessagePassword] = useState('');
    const [messageAddress, setMessageAddress] = useState('');

    useEffect(() => {
        if (staff.id) {
            setID(staff.id);
            setFullName(staff.fullName);
            setEmail(staff.email);
            setPhone(staff.phone);
            setAddress(staff.address);
            setTitleButton('Cập nhật');
            setTitlePopup('Cập nhật thông tin nhân viên');
        }
    }, []);
    const validateName = (name) => {
        return name.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/);
    };
    const validatePhone = (phone) => {
        return phone.match(/^[0-9]*$/);
    };
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };
    const handleAdd = () => {
        let count = 0;
        if (fullName === '') {
            count++;
            setMessageName('Họ và tên trống');
        } else if (validateName(fullName) !== null) {
            count++;
            setMessageName('Họ tên không hợp lệ');
        } else {
            setMessageName('');
        }
        if (phone === '') {
            count++;
            setMessagePhone('Số điện thoại trống');
        } else if (validatePhone(phone) === null || phone.length < 10) {
            count++;
            setMessagePhone('Vui lòng nhập đủ 10 chữ số');
        } else {
            setMessagePhone('');
        }
        if (address === '') {
            count++;
            setMessageAddress('Địa chỉ trống');
        } else {
            setMessageAddress('');
        }
        if (email === '') {
            count++;
            setMessageEmail('Email trống');
        } else if (validateEmail(email) === null) {
            count++;
            setMessageEmail('Email không hợp lệ');
        } else {
            setMessageEmail('');
        }
        if (password === '') {
            count++;
            setMessagePassword('Mật khẩu mới trống');
        } else if (password.length < 8 || password[0].toUpperCase() !== password[0]) {
            count++;
            setMessagePassword('Mật khẩu chứa tối thiểu 8 kí tự và chữ cái đầu viết hoa');
        } else if (password !== passwordConfirm) {
            count++;
            setMessagePassword('Mật khẩu không khớp vui lòng nhập lại');
        } else {
            setMessagePassword('');
        }
        if (count === 0) {
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
                message.success({
                    content: result,
                    style: {
                        marginTop: '50px',
                    },
                });
            };
            fetchApi();
            handleClose();
        }
        if (count === 1 && staff.id) {
            staff.email = email;
            staff.fullName = fullName;
            staff.address = address;
            staff.phone = phone;
            const updateApi = async () => {
                const result = await staffService.updateStaff(staff);
                message.success({
                    content: result,
                    style: {
                        marginTop: '50px',
                    },
                });
            };
            updateApi();
            handleClose();
        }
    };
    const handleChangeName = (e) => {
        const value = e.target.value;
        if (value.length > 30) {
            return;
        }
        if (!value.startsWith(' ')) {
            setFullName(value);
        }
    };
    const handleChangePhone = (e) => {
        const value = e.target.value;
        if (value.length > 15) {
            return;
        }
        if (!value.startsWith(' ')) {
            setPhone(value);
        }
    };
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        if (value.length > 50) {
            return;
        }
        if (!value.startsWith(' ')) {
            setEmail(value);
        }
    };
    const handleChangePassword = (e) => {
        const value = e.target.value;
        if (value.length > 16) {
            return;
        }
        if (!value.startsWith(' ')) {
            setPassword(value);
        }
    };
    const handleChangeConfirmPassword = (e) => {
        const value = e.target.value;
        if (value.length > 16) {
            return;
        }
        if (!value.startsWith(' ')) {
            setPasswordConfirm(value);
        }
    };
    const handleChangeAddress = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            return;
        }
        if (!value.startsWith(' ')) {
            setAddress(value);
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
                                onChange={handleChangeName}
                                className={cx('input-info')}
                            />
                            {messageName !== '' && (
                                <Alert className={cx('messageError')} message={messageName} type="error" />
                            )}
                            <label className={cx('label')}>Email:</label>
                            <CFormInput
                                type="text"
                                placeholder="Nhập email"
                                value={email}
                                onChange={handleChangeEmail}
                                className={cx('input-info')}
                            />
                            {messageEmail !== '' && (
                                <Alert className={cx('messageError')} message={messageEmail} type="error" />
                            )}
                            {staff.isActive === undefined ? (
                                <>
                                    <div className={cx('staff-password')}>
                                        <div>
                                            <label className={cx('label')}>Mật khẩu:</label>
                                            <CFormInput
                                                type="password"
                                                placeholder="Nhập mật khẩu"
                                                value={password}
                                                onChange={handleChangePassword}
                                                className={cx('input-info')}
                                            />
                                        </div>
                                        <div>
                                            {' '}
                                            <label className={cx('label')}>Xác nhận mật khẩu:</label>
                                            <CFormInput
                                                type="password"
                                                placeholder="Xác nhận mật khẩu"
                                                value={passwordConfirm}
                                                onChange={handleChangeConfirmPassword}
                                                className={cx('input-info')}
                                            />
                                        </div>
                                    </div>
                                    {messagePassword !== '' && (
                                        <Alert className={cx('messageError')} message={messagePassword} type="error" />
                                    )}
                                </>
                            ) : (
                                <div className={cx('staff-checkbox')}>
                                    <CFormCheck
                                        disabled
                                        id={staff.id}
                                        defaultChecked={staff.isActive === true ? 'defaultChecked' : ''}
                                        label="Hoạt động"
                                    />
                                </div>
                            )}
                            <label className={cx('label')}>Số điện thoại:</label>
                            <CFormInput
                                type="text"
                                placeholder="Nhập số điện thoại"
                                value={phone}
                                onChange={handleChangePhone}
                                className={cx('input-info')}
                            />
                            {messagePhone !== '' && (
                                <Alert className={cx('messageError')} message={messagePhone} type="error" />
                            )}
                            <label className={cx('label')}> Địa chỉ:</label>
                            <CFormInput
                                type="text"
                                placeholder="Nhập địa chỉ"
                                value={address}
                                onChange={handleChangeAddress}
                                className={cx('input-info')}
                            />
                            {messageAddress !== '' && (
                                <Alert className={cx('messageError')} message={messageAddress} type="error" />
                            )}
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
