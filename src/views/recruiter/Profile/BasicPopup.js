import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import RecruiterBasicInfo from '../../../components/RecruiterBasicInfo/RecruiterBasicInfo';

function BasicPopup({ recruiter, callback, onclose }) {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        onclose();
    };
    useEffect(() => {}, []);
    const handleAdd = (recruiterInfo) => {
        setShow(false);
        callback(recruiterInfo);
    };
    return (
        <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RecruiterBasicInfo recruiter={recruiter} onClick={handleAdd} />
            </Modal.Body>
        </Modal>
    );
}

export default BasicPopup;
