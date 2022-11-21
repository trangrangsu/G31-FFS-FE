import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import { CFormInput } from '@coreui/react';
import { Alert } from 'antd';

import Button from '../../../components/Button';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);
function PricePopup({ price, callback, onclose }) {
    const [show, setShow] = useState(true);
    const [value, setValue] = useState(price);
    const [messagePrice, setMessagePrice] = useState('');
    const handleClose = () => {
        setShow(false);
        onclose();
    };
    const handleAdd = () => {
        if (validatePrice(value) === null) {
            setMessagePrice('Vui lòng nhập số');
        } else {
            setShow(false);
            callback(value);
        }
    };
    const validatePrice = (phone) => {
        return phone.match(/^[0-9]*$/);
    };
    const handleChangePrice = (e) => {
        const value = e.target.value;
        if (value.length > 8) {
            return;
        }
        if (!value.startsWith(' ')) {
            setValue(value);
        }
    };
    return (
        <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa chi phí</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <CFormInput value={value} onChange={handleChangePrice}></CFormInput>
                    {messagePrice !== '' && (
                        <Alert className={cx('messageError')} message={messagePrice} type="error" />
                    )}
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
