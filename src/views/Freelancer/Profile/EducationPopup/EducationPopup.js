import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CFormInput } from '@coreui/react';

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
    const handleAdd = () => {
        setShow(false);
        education.university = university;
        education.major = major;
        education.level = level;
        education.from = from;
        education.to = to;
        callback(education);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('column')}>
                    <label className={cx('label')}>Tên trường *</label>
                    <CFormInput
                        type="text"
                        value={university}
                        spellCheck={false}
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Trình độ *</label>
                    <CFormInput
                        type="text"
                        value={level}
                        spellCheck={false}
                        onChange={(e) => setLevel(e.target.value)}
                    />
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Chuyên ngành *</label>
                    <CFormInput
                        type="text"
                        value={major}
                        spellCheck={false}
                        onChange={(e) => setMajor(e.target.value)}
                    />
                </div>
                <div className={cx('row')}>
                    <div className={cx('left')}>
                        <label className={cx('label')}>Từ năm *</label>
                        <CFormInput
                            type="text"
                            value={from}
                            spellCheck={false}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={cx('label')}>Đến năm *</label>
                        <CFormInput type="text" value={to} spellCheck={false} onChange={(e) => setTo(e.target.value)} />
                    </div>
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
EducationPopup.propTypes = {
    education: PropTypes.object,
    callback: PropTypes.func,
    onclose: PropTypes.func,
};
export default EducationPopup;
