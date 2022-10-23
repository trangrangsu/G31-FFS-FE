import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import FreelancerBasicInfo from '../../../components/FreelancerBasicInfo';

function BasicPopup({ freelancer, callback, onclose }) {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        onclose();
    };
    useEffect(() => {}, []);
    const handleAdd = (freelancer) => {
        setShow(false);
        callback(freelancer);
    };
    return (
        <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FreelancerBasicInfo freelancer={freelancer} onClick={handleAdd} />
            </Modal.Body>
        </Modal>
    );
}

export default BasicPopup;
