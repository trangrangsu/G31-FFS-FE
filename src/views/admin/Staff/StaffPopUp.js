import React, { useState } from 'react';
import CustomButton from '../../../components/Button';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import styles from './Staff.module.scss';
const cx = classNames.bind(styles);
function StaffPopUp() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className={cx('staff-popup')}>
            <CustomButton admin className={"button-popup"} variant="primary" onClick={handleShow}>
                Thêm mới
            </CustomButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới Nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>

                        <div className={cx('input-staff')}>
                            <p>Tên nhân viên:</p>
                            <input type="text" placeholder='Nhập tên nhân viên'></input>
                            Email:<input type="text" placeholder='Nhập email'></input>
                            <div className={cx('staff-password')} >
                                <div>
                                    Password:
                                    <input type="password" placeholder='Nhập mật khẩu'></input>
                                </div>
                                <div>   ConfirmPassword:<input type="password" placeholder='Xác nhận mật khẩu'></input>
                                </div>
                            </div>

                            Số điện thoại<input type="text" placeholder='Nhập số điện thoại'></input>
                            Địa chỉ<input type="text" placeholder='Nhập địa chỉ'></input>
                            <CustomButton admin className={cx('btn-add')}>Thêm mới</CustomButton>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    );
}

export default StaffPopUp;