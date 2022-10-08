import React, { useState } from 'react';
import CustomButton from '../../../components/Button';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import styles from './Career.module.scss';
const cx = classNames.bind(styles);
function CareerPopUp() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className={cx('career-popup')}>
            <CustomButton admin className={"button-popup"} variant="primary" onClick={handleShow}>
                Thêm mới
            </CustomButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới ngành nghề</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>
                        <h1>Thêm mới Career</h1>
                        <div className={cx('input-career')}>
                            <input type="text" placeholder='Nhập ngành nghề'></input>
                        </div>
                        <CustomButton admin className={cx('btn-add')}>Thêm mới</CustomButton>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CareerPopUp;