import React, { useState, useEffect } from 'react';
import CustomButton from '../../../components/Button';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import styles from './Career.module.scss';
const cx = classNames.bind(styles);
function CareerPopUp({ career, callback }) {
    const [show, setShow] = useState(true);
    const [name, setName] = useState('');
    const [titleButton, setTitleButton] = useState('Thêm mới');
    const [titlePopup, setTitlePopup] = useState('Thêm mới');
    const handleClose = () => {
        setShow(false);
        callback();
    };
    useEffect(() => {
        if (career.id) {
            setName(career.name);
            setTitleButton('Cập nhật');
            setTitlePopup('Chỉnh sửa ngành nghề');
        }
    }, []);
    const handleAdd = () => {
        const staff = {
            name,
        };
        handleClose();
        console.log(staff);
    };
    return (
        <div className={cx('career-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titlePopup}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>
                        <h1>Thêm mới Career</h1>
                        <div className={cx('input-career')}>
                            <input
                                type="text"
                                placeholder="Nhập ngành nghề"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <CustomButton admin className={cx('btn-add')} onClick={handleAdd}>
                            {titleButton}
                        </CustomButton>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CareerPopUp;
