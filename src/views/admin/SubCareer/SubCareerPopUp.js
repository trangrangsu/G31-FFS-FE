import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormInput } from '@coreui/react';

import CustomButton from '../../../components/Button';
import styles from './SubCareer.module.scss';
const cx = classNames.bind(styles);

function SubCareerPopUp({ career, subCareer, callback }) {
    const listCareers = [
        {
            id: 1,
            name: 'Công nghệ thông tin',
        },
        {
            id: 2,
            name: 'Bất Động Sản',
        },
        {
            id: 3,
            name: 'Marketing',
        },
        {
            id: 4,
            name: 'Bán Hàng',
        },
        {
            id: 5,
            name: 'Thiết Kế',
        },
        {
            id: 6,
            name: 'Tư Vấn',
        },
        {
            id: 7,
            name: 'Xây dựng',
        },
    ];
    const [show, setShow] = useState(true);
    const [name, setName] = useState('');
    const [careers, setCareers] = useState(listCareers);
    const [careerCurrent, setCareerCurrent] = useState(career);
    const [titleButton, setTitleButton] = useState('Thêm mới');
    const [titlePopup, setTitlePopup] = useState('Thêm mới');
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
                        <div className={cx('sub-career-list')}>
                            <select value={careerCurrent} onChange={(e) => setCareerCurrent(e.target.value)}>
                                {careers.map((career, index) => {
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
                    <CustomButton admin className={cx('btn-add')} onClick={handleAdd}>
                        {titleButton}
                    </CustomButton>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SubCareerPopUp;
