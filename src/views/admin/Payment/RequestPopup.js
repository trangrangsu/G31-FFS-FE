import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { CFormInput, CFormTextarea } from '@coreui/react';

import CustomButton from '../../../components/Button';
import styles from './Payment.module.scss';
const cx = classNames.bind(styles);

function RequestPopup({ request, callback }) {
    const [show, setShow] = useState(true);
    const [description, setDescription] = useState('');
    const [titlePopup, setTitlePopup] = useState('Thông tin chi tiết yêu cầu');

    const handleClose = () => {
        setShow(false);
        callback();
    };
    const handleApprove = () => {};
    const handleDeny = () => {};
    useEffect(() => {}, []);
    return (
        <div className={cx('request-popup')}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titlePopup}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('pop-up')}>
                        <div className={cx('input')}>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>Mã nạp</label>
                                <CFormInput
                                    size="sm"
                                    className={cx('input-field')}
                                    type="text"
                                    value={request.code}
                                    disabled
                                />
                            </div>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>ID khách hàng</label>
                                <CFormInput
                                    size="sm"
                                    className={cx('input-field')}
                                    type="text"
                                    value={request.user_id}
                                    disabled
                                />
                            </div>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>Số tiền</label>
                                <CFormInput
                                    size="sm"
                                    className={cx('input-field')}
                                    type="text"
                                    value={request.money}
                                    disabled
                                />
                            </div>
                            <div className={cx('row-input')}>
                                <label className={cx('label')}>Ngày yêu cầu</label>
                                <CFormInput
                                    size="sm"
                                    className={cx('input-field')}
                                    type="text"
                                    value={request.dateRequest}
                                    disabled
                                />
                            </div>
                            {request.date_approve !== '' ? (
                                <div className={cx('row-input')}>
                                    <label className={cx('label')}>Ngày phê duyệt</label>
                                    <CFormInput
                                        size="sm"
                                        className={cx('input-field')}
                                        type="text"
                                        value={request.dateApprove}
                                        disabled
                                    />
                                </div>
                            ) : (
                                ''
                            )}
                            {request.state === 2 ? (
                                <>
                                    <div className={cx('row-input')}>
                                        <label className={cx('label')}>Mô tả</label>
                                        <CFormTextarea
                                            size="sm"
                                            className={cx('input-field')}
                                            type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className={cx('form-btn')}>
                                        <CustomButton admin onClick={handleApprove}>
                                            Duyệt
                                        </CustomButton>
                                        <CustomButton admin onClick={handleDeny}>
                                            Từ chối
                                        </CustomButton>
                                    </div>
                                </>
                            ) : (
                                <div className={cx('row-input')}>
                                    <label className={cx('label')}>Mô tả</label>
                                    <CFormTextarea
                                        size="sm"
                                        className={cx('input-field')}
                                        type="text"
                                        value={request.description}
                                        disabled
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default RequestPopup;
