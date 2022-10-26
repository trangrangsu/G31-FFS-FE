import { useState } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';

import CustomButton from '../../../components/Button';
import styles from './Report.module.scss';
const cx = classNames.bind(styles);

function ReportPopup({ title, detail, callback }) {
    const [show, setShow] = useState(true);
    const [titlePopup, setTitlePopup] = useState(title);
    const handleClose = () => {
        setShow(false);
        callback();
    };
    return (
        <div className={cx('report-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titlePopup}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('detail')}>{detail}</div>
                    <CustomButton close className={cx('btn-close')} onClick={handleClose}>
                        Đóng
                    </CustomButton>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ReportPopup;
