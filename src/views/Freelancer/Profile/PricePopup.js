import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';

import Button from '../../../components/Button';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);
function PricePopup({ price, callback, onclose }) {
    const [show, setShow] = useState(true);
    const [value, setValue] = useState(price);
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
                <Modal.Title>Chỉnh sửa chi phí</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <CFormInput value={value} onChange={(e) => setValue(e.target.value)}></CFormInput>
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
PricePopup.propTypes = {
    price: PropTypes.object,
    callback: PropTypes.func,
    onclose: PropTypes.func,
};
export default PricePopup;
