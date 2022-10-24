import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import { CFormTextarea } from '@coreui/react';

import Button from '../../../components/Button';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);
function DescriptionPopup({ description, callback, onclose }) {
    const [show, setShow] = useState(true);
    const [value, setValue] = useState(description);
    const handleClose = () => {
        setShow(false);
        onclose();
    };
    useEffect(() => {}, []);
    const handleAdd = () => {
        setShow(false);
        callback(value);
    };
    return (
        <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa giới thiệu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <CFormTextarea
                        id="exampleFormControlTextarea1"
                        rows="10"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    ></CFormTextarea>
                    <div className={cx('row')}>
                        <Button primary onClick={handleAdd} className={cx('save-btn')}>
                            Lưu
                        </Button>
                        <Button primary onClick={handleClose} className={cx('save-btn')}>
                            Hủy
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
DescriptionPopup.propTypes = {
    description: PropTypes.object,
    callback: PropTypes.func,
    onclose: PropTypes.func,
};
export default DescriptionPopup;
