import React, { useState, useRef, useEffect } from 'react';
import CustomButton from '../../../components/Button';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import styles from './Staff.module.scss';
const cx = classNames.bind(styles);
function StaffPopUp({ staff, callback }) {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        callback();
    };
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [titleButton, setTitleButton] = useState('Thêm mới');

    useEffect(() => {
        if (staff.id) {
            setFullName(staff.fullname);
            setEmail(staff.email);
            //setPassword(staff.)
            //setPasswordConfirm(staff.)
            setPhone(staff.phone);
            setAddress(staff.address);
            setTitleButton('Cập nhật');
        }
    }, []);

    const handleAdd = () => {
        if (password === passwordConfirm) {
            const staff = {
                fullName,
                email,
                password,
                passwordConfirm,
                phone,
                address,
            };
            handleClose();
            console.log(staff);
        }
    };
    return (
        <div className={cx('staff-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới Nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>
                        <div className={cx('input-staff')}>
                            Tên nhân viên:
                            <input
                                type="text"
                                placeholder="Nhập tên nhân viên"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            Email:
                            <input
                                type="text"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className={cx('staff-password')}>
                                <div>
                                    Password:
                                    <input
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    {' '}
                                    ConfirmPassword:
                                    <input
                                        type="password"
                                        placeholder="Xác nhận mật khẩu"
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                    />
                                </div>
                            </div>
                            Số điện thoại
                            <input
                                type="text"
                                placeholder="Nhập số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            Địa chỉ
                            <input
                                type="text"
                                placeholder="Nhập địa chỉ"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <CustomButton admin className={cx('btn-add')} onClick={handleAdd}>
                                {titleButton}
                            </CustomButton>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StaffPopUp;
