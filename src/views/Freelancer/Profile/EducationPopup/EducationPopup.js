import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CFormInput } from '@coreui/react';
import { Alert } from 'antd';

import Button from '../../../../components/Button';
import styles from './EducationPopup.module.scss';
const cx = classNames.bind(styles);
function EducationPopup({ education, callback, onclose }) {
    const [show, setShow] = useState(true);
    const [title, setTitle] = useState('Thêm mới');
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [level, setLevel] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [messageName, setMessageName] = useState('');
    const [messageLevel, setMessageLevel] = useState('');
    const [messageCareer, setMessageCareer] = useState('');
    const [messageYear, setMessageYear] = useState('');
    const handleClose = () => {
        setShow(false);
        onclose();
    };
    useEffect(() => {
        if (education.id) {
            setUniversity(education.university);
            setMajor(education.major);
            setLevel(education.level);
            setFrom(education.from);
            setTo(education.to);
            setTitle('Chỉnh sửa');
        }
    }, []);
    const validateText = (text) => {
        return text.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    };
    const validateYear = (year) => {
        return year.match(/^[0-9]*$/);
    };
    const handleAdd = () => {
        let count = 0;
        if (university === '') {
            count++;
            setMessageName('Tên trường trống');
        } else if (validateText(university) !== null) {
            count++;
            setMessageName('Vui lòng không nhập ký tự đặc biệt');
        } else {
            setMessageName('');
        }
        if (level === '') {
            count++;
            setMessageLevel('Trình độ trống');
        } else if (validateText(level) !== null) {
            count++;
            setMessageLevel('Vui lòng không nhập ký tự đặc biệt');
        } else {
            setMessageLevel('');
        }
        if (major === '') {
            count++;
            setMessageCareer('Chuyên ngành trống');
        } else if (validateText(major) !== null) {
            count++;
            setMessageCareer('Vui lòng không nhập ký tự đặc biệt');
        } else {
            setMessageCareer('');
        }
        if (from === '' || to === '') {
            count++;
            setMessageYear('Năm bắt đầu hoặc năm kết thúc trống');
        } else if (validateYear(from) === null || validateYear(to) === null) {
            count++;
            setMessageYear('Vui lòng nhập số');
        } else if (from > to) {
            count++;
            setMessageYear('Năm bắt đầu lớn hơn năm kết thúc');
        } else {
            setMessageYear('');
        }
        if (count === 0) {
            setShow(false);
            education.university = university;
            education.major = major;
            education.level = level;
            education.from = from;
            education.to = to;
            callback(education);
        }
    };
    const handleChangeName = (e) => {
        const value = e.target.value;
        if (value.length > 50) {
            return;
        }
        if (!value.startsWith(' ')) {
            setUniversity(value);
        }
    };
    const handleChangeMajor = (e) => {
        const value = e.target.value;
        if (value.length > 50) {
            return;
        }
        if (!value.startsWith(' ')) {
            setMajor(value);
        }
    };
    const handleChangeLevel = (e) => {
        const value = e.target.value;
        if (value.length > 50) {
            return;
        }
        if (!value.startsWith(' ')) {
            setLevel(value);
        }
    };
    const handleChangeFrom = (e) => {
        const value = e.target.value;
        if (value.length > 4) {
            return;
        }
        if (!value.startsWith(' ')) {
            setFrom(value);
        }
    };
    const handleChangeTo = (e) => {
        const value = e.target.value;
        if (value.length > 4) {
            return;
        }
        if (!value.startsWith(' ')) {
            setTo(value);
        }
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('column')}>
                    <label className={cx('label')}>Tên trường *</label>
                    <CFormInput type="text" value={university} spellCheck={false} onChange={handleChangeName} />
                    {messageName !== '' && <Alert className={cx('messageError')} message={messageName} type="error" />}
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Trình độ *</label>
                    <CFormInput type="text" value={level} spellCheck={false} onChange={handleChangeLevel} />
                    {messageLevel !== '' && (
                        <Alert className={cx('messageError')} message={messageLevel} type="error" />
                    )}
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Chuyên ngành *</label>
                    <CFormInput type="text" value={major} spellCheck={false} onChange={handleChangeMajor} />
                    {messageCareer !== '' && (
                        <Alert className={cx('messageError')} message={messageCareer} type="error" />
                    )}
                </div>
                <div className={cx('row')}>
                    <div className={cx('left')}>
                        <label className={cx('label')}>Từ năm *</label>
                        <CFormInput type="text" value={from} spellCheck={false} onChange={handleChangeFrom} />
                    </div>
                    <div>
                        <label className={cx('label')}>Đến năm *</label>
                        <CFormInput type="text" value={to} spellCheck={false} onChange={handleChangeTo} />
                    </div>
                </div>
                {messageYear !== '' && <Alert className={cx('messageError')} message={messageYear} type="error" />}
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
EducationPopup.propTypes = {
    education: PropTypes.object,
    callback: PropTypes.func,
    onclose: PropTypes.func,
};
export default EducationPopup;
