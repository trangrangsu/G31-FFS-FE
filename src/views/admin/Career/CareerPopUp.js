import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormInput } from '@coreui/react';
import { Alert } from 'antd';

import * as adminCareerServices from '../../../services/adminCareerServices';
import CustomButton from '../../../components/Button';
import styles from './Career.module.scss';
const cx = classNames.bind(styles);
function CareerPopUp({ career, callback }) {
    const [show, setShow] = useState(true);
    const [name, setName] = useState('');
    const [titleButton, setTitleButton] = useState('Thêm mới');
    const [titlePopup, setTitlePopup] = useState('Thêm mới');
    const [messageCareer, setMessageCareer] = useState('');
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
    const validateCareer = (name) => {
        return name.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    };
    const handleAdd = () => {
        const fetchApi = async () => {
            let result = '';
            if (career.id) {
                result = await adminCareerServices.updateCareer(career.id, name);
            } else result = await adminCareerServices.addCareer(name);
            console.log(result);
        };
        if (name === '') {
            setMessageCareer('Vui lòng tên ngành nghề');
        } else if (validateCareer(name) !== null) {
            setMessageCareer('Tên ngành nghề không chứa ký tự đặc biệt');
        } else {
            fetchApi();
            handleClose();
        }
    };
    const handleChangeCareer = (e) => {
        const value = e.target.value;
        if (value.length > 50) {
            return;
        }
        if (!value.startsWith(' ')) {
            setName(value);
        }
    };
    return (
        <div className={cx('career-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titlePopup}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>
                        <div className={cx('input-career')}>
                            <CFormInput
                                type="text"
                                placeholder="Nhập ngành nghề"
                                value={name}
                                onChange={handleChangeCareer}
                                className={cx('input')}
                            />
                            {messageCareer !== '' && (
                                <Alert className={cx('messageError')} message={messageCareer} type="error" />
                            )}
                        </div>
                        <CustomButton approve className={cx('btn-add')} onClick={handleAdd}>
                            {titleButton}
                        </CustomButton>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CareerPopUp;
