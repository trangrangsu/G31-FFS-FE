import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormInput } from '@coreui/react';

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
            setTitlePopup('Chỉnh sửa ngành nghề chi tiết');
        }
        getCareerApi();
    }, []);
    const handleAdd = () => {
        subCareer.name = name;
        subCareer.careerId = careerCurrent;
        console.log(subCareer);
        onAction(subCareer);
        handleClose();
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
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                            <label className={cx('input-label')}>Sub career</label>
                        </div>
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
