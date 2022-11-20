import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormInput } from '@coreui/react';
import { Alert } from 'antd';

import * as adminCareerServices from '../../../services/adminCareerServices';
import CustomButton from '../../../components/Button';
import styles from './SubCareer.module.scss';
const cx = classNames.bind(styles);

function SubCareerPopUp({ career, subCareer, callback, onAction }) {
    const [listCareers, setListCareers] = useState([]);
    const [show, setShow] = useState(true);
    const [name, setName] = useState('');
    const [careerCurrent, setCareerCurrent] = useState(career);
    const [titleButton, setTitleButton] = useState('Thêm mới');
    const [titlePopup, setTitlePopup] = useState('Thêm mới');
    const [messageSubCareer, setMessageSubCareer] = useState('');
    const getCareerApi = async () => {
        const result2 = await adminCareerServices.getAllCareers();
        console.log(result2);
        setListCareers(result2);
    };

    const handleClose = () => {
        setShow(false);
        callback();
    };
    useEffect(() => {
        if (subCareer.id) {
            setName(subCareer.name);
            setTitleButton('Cập nhật');
            setTitlePopup('Chỉnh sửa chuyên ngành');
        }
        getCareerApi();
    }, []);
    const validateSubCareer = (name) => {
        return name.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    };
    const handleAdd = () => {
        if (name === '') {
            setMessageSubCareer('Vui lòng tên chuyên ngành');
        } else if (validateSubCareer(name) !== null) {
            setMessageSubCareer('Tên chuyên ngành không chứa ký tự đặc biệt');
        } else {
            subCareer.name = name;
            subCareer.careerId = careerCurrent;
            console.log(subCareer);
            onAction(subCareer);
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
                        <div className={cx('sub-career-list')}>
                            <select value={careerCurrent} onChange={(e) => setCareerCurrent(e.target.value)}>
                                {listCareers.map((career, index) => {
                                    return (
                                        <option key={index} value={career.id}>
                                            {career.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className={cx('input')}>
                            <CFormInput
                                className={cx('input-field')}
                                type="text"
                                value={name}
                                onChange={handleChangeCareer}
                                autoFocus
                            />
                            <label className={cx('input-label')}>Chuyên ngành</label>
                        </div>
                        {messageSubCareer !== '' && (
                            <Alert className={cx('messageError')} message={messageSubCareer} type="error" />
                        )}
                    </div>
                    <CustomButton approve className={cx('btn-add')} onClick={handleAdd}>
                        {titleButton}
                    </CustomButton>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SubCareerPopUp;
