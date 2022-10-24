import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';

import * as adminFreelancerService from '../../../services/adminFreelancerServices';
import CustomButton from '../../../components/Button';
import styles from './ViewDetailFreelancer.module.scss';
const cx = classNames.bind(styles);
function BanPopUp({ id, callback }) {
    const [show, setShow] = useState(true);
    const [banType, setBanType] = useState({});
    const [banTypes, setBanTypes] = useState([]);
    const [titleButton, setTitleButton] = useState('Khóa tài khoản');
    const [titlePopup, setTitlePopup] = useState('Khóa tài khoản');
    const fetchApi = async () => {
        const result = await adminFreelancerService.getTypeBan('');
        console.log(result);
        setBanTypes(result);
        setBanType(result[0]);
    };
    const banApi = async (userId, typeBan, bannedBy) => {
        const result = await adminFreelancerService.setBan(userId, typeBan, bannedBy);
        console.log(result);
    };
    const unBanApi = async (userId) => {
        const result = await adminFreelancerService.unBan(userId);
        console.log(result);
    };
    const handleClose = () => {
        setShow(false);
        callback();
    };
    useEffect(() => {
        fetchApi();
    }, []);
    const setBanTypeCurrent = (id) => {
        const arr = banTypes.filter((banType) => banType.id == id);
        setBanType(arr[0]);
    };

    const handleBan = () => {
        console.log(banType);
        // banApi(id, banType.id, 'LS1g5vkE9S');
        // callback(true);
        unBanApi(id);
        callback(false);
        setShow(false);
    };
    return (
        <div className={cx('career-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titlePopup}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>
                        <div className={cx('ban-type-list')}>
                            <select
                                onChange={(e) => {
                                    setBanTypeCurrent(e.target.value);
                                }}
                            >
                                {banTypes.map((banType, index) => {
                                    return (
                                        <option key={index} value={banType.id}>
                                            {banType.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className={cx('detail')}>
                            <label>Thời gian khóa:</label>
                            <span> {banType.numDay} ngày</span>
                            <div>
                                <label>Mô tả chi tiết</label>
                                <p>{banType.description}</p>
                            </div>
                        </div>

                        <CustomButton primary className={cx('btn-ban')} onClick={handleBan}>
                            {titleButton}
                        </CustomButton>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default BanPopUp;
