import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CFormInput, CFormTextarea, CFormSelect } from '@coreui/react';

import Button from '../../../../components/Button';
import styles from './CompanyInfoPopup.module.scss';
const cx = classNames.bind(styles);
function CompanyInfoPopup({ companyInfo, callback, onclose }) {
    const [show, setShow] = useState(true);
    const [title, setTitle] = useState('Thêm mới');
    const [taxNumber, setTaxNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [career, setCareer] = useState(0);
    const [description, setDescription] = useState('');

    const handleClose = () => {
        setShow(false);
        onclose();
    };
    useEffect(() => {
        if (companyInfo.id) {
            setTitle('Chỉnh sửa');
        }
    }, []);
    const handleAdd = () => {
        setShow(false);
        companyInfo.taxNumber = taxNumber;
        companyInfo.website = website;
        companyInfo.career = career;
        companyInfo.description = description;
        callback(companyInfo);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('column')}>
                    <label className={cx('label')}>Mã số thuế</label>
                    <CFormInput
                        type="text"
                        value={taxNumber}
                        spellCheck={false}
                        onChange={(e) => setTaxNumber(e.target.value)}
                    />
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Link website</label>
                    <CFormInput
                        type="text"
                        value={website}
                        spellCheck={false}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Ngành nghề</label>
                    <CFormSelect
                        onChange={(e) => setCareer(e.target.value)}
                        options={[
                            { label: 'cntt', value: '1' },
                            { label: 'tkdh', value: '2' },
                            { label: 'qtkd', value: '3' },
                        ]}
                    />
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Mô tả</label>
                    <CFormTextarea
                        id="exampleFormControlTextarea1"
                        rows="6"
                        value={description}
                        spellCheck={false}
                        onChange={(e) => setDescription(e.target.value)}
                    ></CFormTextarea>
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
CompanyInfoPopup.propTypes = {
    education: PropTypes.object,
    callback: PropTypes.func,
    onclose: PropTypes.func,
};
export default CompanyInfoPopup;
