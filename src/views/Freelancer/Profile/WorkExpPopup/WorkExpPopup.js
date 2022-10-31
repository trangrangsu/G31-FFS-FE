import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CFormInput, CFormTextarea } from '@coreui/react';

import Button from '../../../../components/Button';
import styles from './WorkExpPopup.module.scss';
const cx = classNames.bind(styles);
function WorkExpPopup({ workExp, callback, onclose }) {
    const [show, setShow] = useState(true);
    const [title, setTitle] = useState('Thêm mới');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [monthFrom, setMonthFrom] = useState('');
    const [yearFrom, setYearFrom] = useState('');
    const [monthTo, setMonthTo] = useState('');
    const [yearTo, setYearTo] = useState('');
    const handleClose = () => {
        setShow(false);
        onclose();
    };
    useEffect(() => {
        if (workExp.id) {
            setCompanyName(workExp.companyName);
            setPosition(workExp.position);
            setDescription(workExp.description);
            setMonthFrom(workExp.monthFrom);
            setYearFrom(workExp.yearFrom);
            setMonthTo(workExp.monthTo);
            setYearTo(workExp.yearTo);
            setTitle('Chỉnh sửa');
        }
    }, []);
    const handleAdd = () => {
        setShow(false);
        workExp.companyName = companyName;
        workExp.position = position;
        workExp.description = description;
        workExp.monthFrom = monthFrom;
        workExp.yearFrom = yearFrom;
        workExp.monthTo = monthTo;
        workExp.yearTo = yearTo;
        callback(workExp);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('column')}>
                    <label className={cx('label')}>Tên công ty *</label>
                    <CFormInput
                        type="text"
                        value={companyName}
                        spellCheck={false}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Vị trí *</label>
                    <CFormInput
                        type="text"
                        value={position}
                        spellCheck={false}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>
                <div className={cx('row')}>
                    <div className={cx('left')}>
                        <label className={cx('label')}>Từ tháng *</label>
                        <CFormInput
                            type="text"
                            value={monthFrom}
                            spellCheck={false}
                            onChange={(e) => setMonthFrom(e.target.value)}
                        />
                        <label className={cx('label')}>năm *</label>
                        <CFormInput
                            type="text"
                            value={yearFrom}
                            spellCheck={false}
                            onChange={(e) => setYearFrom(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={cx('label')}>Đến tháng *</label>
                        <CFormInput
                            type="text"
                            value={monthTo}
                            spellCheck={false}
                            onChange={(e) => setMonthTo(e.target.value)}
                        />
                        <label className={cx('label')}>năm *</label>
                        <CFormInput
                            type="text"
                            value={yearTo}
                            spellCheck={false}
                            onChange={(e) => setYearTo(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Mô tả *</label>
                    <CFormTextarea
                        type="text"
                        rows="6"
                        value={description}
                        spellCheck={false}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={cx('row')}>
                    <Button primary onClick={handleAdd} className={cx('save-btn')}>
                        Lưu
                    </Button>
                    <Button primary onClick={handleClose} className={cx('save-btn')}>
                        Hủy
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
WorkExpPopup.propTypes = {
    workExp: PropTypes.object,
    callback: PropTypes.func,
    onclose: PropTypes.func,
};
export default WorkExpPopup;
