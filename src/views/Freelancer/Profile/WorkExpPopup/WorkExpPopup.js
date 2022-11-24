import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CFormInput, CFormTextarea } from '@coreui/react';
import { Alert } from 'antd';

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
    const [messageCompanyName, setMessageCompanyName] = useState('');
    const [messagePosition, setMessagePosition] = useState('');
    const [messageNumber, setMessageNumber] = useState('');

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
    const validateText = (text) => {
        return text.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    };
    const validateNumber = (number) => {
        return number.match(/^[0-9]*$/);
    };
    const handleAdd = () => {
        let count = 0;
        console.log();
        if (companyName === '') {
            count++;
            setMessageCompanyName('Tên công ty trống');
        } else if (validateText(companyName) !== null) {
            count++;
            setMessageCompanyName('Vui lòng không nhập ký tự đặc biệt');
        } else if (companyName[0].match(/^[0-9]*$/) !== null) {
            count++;
            setMessageCompanyName('Vui lòng không số đầu tiên');
        } else {
            setMessageCompanyName('');
        }
        if (position === '') {
            count++;
            setMessagePosition('Vị trí đảm nhiệm trống');
        } else if (validateText(position) !== null) {
            count++;
            setMessagePosition('Vui lòng không nhập ký tự đặc biệt');
        } else if (position[0].match(/^[0-9]*$/) !== null) {
            count++;
            setMessagePosition('Vui lòng không số đầu tiên');
        } else {
            setMessagePosition('');
        }
        if (monthFrom === '' || yearFrom === '' || monthTo === '' || yearTo === '') {
            count++;
            setMessageNumber('Năm tháng bắt đầu hoặc năm tháng kết thúc trống');
        } else if (
            validateNumber(monthFrom) === null ||
            validateNumber(yearFrom) === null ||
            validateNumber(monthTo) === null ||
            validateNumber(yearTo) === null
        ) {
            count++;
            setMessageNumber('Vui lòng nhập số');
        } else if (yearFrom > yearTo) {
            count++;
            setMessageNumber('Năm bắt đầu phải nhỏ hơn năm kết thúc');
        } else {
            setMessageNumber('');
        }
        if (count === 0) {
            setShow(false);
            workExp.companyName = companyName;
            workExp.position = position;
            workExp.description = description;
            workExp.monthFrom = monthFrom;
            workExp.yearFrom = yearFrom;
            workExp.monthTo = monthTo;
            workExp.yearTo = yearTo;
            callback(workExp);
        }
    };
    const handleChangeCompanyName = (e) => {
        const value = e.target.value;
        if (value.length > 50) {
            return;
        }
        if (!value.startsWith(' ')) {
            setCompanyName(value);
        }
    };
    const handleChangePosition = (e) => {
        const value = e.target.value;
        if (value.length > 50) {
            return;
        }
        if (!value.startsWith(' ')) {
            setPosition(value);
        }
    };

    const handleChangeMonthFrom = (e) => {
        const value = e.target.value;
        if (value.length > 2) {
            return;
        }
        if (!value.startsWith(' ')) {
            setMonthFrom(value);
        }
    };
    const handleChangeMonthTo = (e) => {
        const value = e.target.value;
        if (value.length > 2) {
            return;
        }
        if (!value.startsWith(' ')) {
            setMonthTo(value);
        }
    };
    const handleChangeYearFrom = (e) => {
        const value = e.target.value;
        if (value.length > 4) {
            return;
        }
        if (!value.startsWith(' ')) {
            setYearFrom(value);
        }
    };
    const handleChangeYearTo = (e) => {
        const value = e.target.value;
        if (value.length > 4) {
            return;
        }
        if (!value.startsWith(' ')) {
            setYearTo(value);
        }
    };
    const handleChangeDescription = (e) => {
        const value = e.target.value;
        if (value.length > 1000) {
            return;
        }
        if (!value.startsWith(' ')) {
            setDescription(value);
        }
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('column')}>
                    <label className={cx('label')}>Tên công ty *</label>
                    <CFormInput type="text" value={companyName} spellCheck={false} onChange={handleChangeCompanyName} />
                    {messageCompanyName !== '' && (
                        <Alert className={cx('messageError')} message={messageCompanyName} type="error" />
                    )}
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Vị trí *</label>
                    <CFormInput type="text" value={position} spellCheck={false} onChange={handleChangePosition} />
                    {messagePosition !== '' && (
                        <Alert className={cx('messageError')} message={messagePosition} type="error" />
                    )}
                </div>
                <div className={cx('row')}>
                    <div className={cx('left')}>
                        <label className={cx('label')}>Từ tháng *</label>
                        <CFormInput
                            type="text"
                            value={monthFrom}
                            spellCheck={false}
                            placeholder="01"
                            onChange={handleChangeMonthFrom}
                        />
                        <label className={cx('label')}>năm *</label>
                        <CFormInput
                            type="text"
                            value={yearFrom}
                            spellCheck={false}
                            placeholder="2022"
                            onChange={handleChangeYearFrom}
                        />
                    </div>
                    <div>
                        <label className={cx('label')}>Đến tháng *</label>
                        <CFormInput
                            type="text"
                            value={monthTo}
                            spellCheck={false}
                            placeholder="01"
                            onChange={handleChangeMonthTo}
                        />
                        <label className={cx('label')}>năm *</label>
                        <CFormInput
                            type="text"
                            value={yearTo}
                            spellCheck={false}
                            placeholder="2022"
                            onChange={handleChangeYearTo}
                        />
                    </div>
                </div>
                {messageNumber !== '' && <Alert className={cx('messageError')} message={messageNumber} type="error" />}
                <div className={cx('column')}>
                    <label className={cx('label')}>Mô tả *</label>
                    <CFormTextarea
                        type="text"
                        rows="6"
                        value={description}
                        spellCheck={false}
                        onChange={handleChangeDescription}
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
