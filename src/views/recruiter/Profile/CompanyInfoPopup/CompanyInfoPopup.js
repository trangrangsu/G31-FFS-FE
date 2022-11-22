import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CFormInput, CFormTextarea, CFormSelect } from '@coreui/react';

import * as adminCareerServices from '../../../../services/adminCareerServices';
import Button from '../../../../components/Button';
import styles from './CompanyInfoPopup.module.scss';
const cx = classNames.bind(styles);
function CompanyInfoPopup({ companyInfo, callback, onclose }) {
    const [show, setShow] = useState(true);
    const [title, setTitle] = useState('Thêm mới');
    const [companyName, setCompanyName] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [career, setCareer] = useState(-1);
    const [careers, setCareers] = useState([]);
    const [description, setDescription] = useState('');

    const fetchApi = async () => {
        const result = await adminCareerServices.getAllCareers();
        console.log(result);
        setCareers(result);
    };

    useEffect(() => {
        fetchApi();
        if (companyInfo.id) {
            setTitle('Chỉnh sửa');
            setCompanyName(companyInfo.companyName);
            setTaxNumber(companyInfo.taxNumber);
            setWebsite(companyInfo.website);
            setCareer(companyInfo.career.id);
            if (companyInfo.companyIntro !== null) {
                setDescription(companyInfo.companyIntro);
            }
        }
    }, []);
    const handleClose = () => {
        setShow(false);
        onclose();
    };
    const handleAdd = () => {
        setShow(false);
        companyInfo.companyName = companyName;
        companyInfo.taxNumber = taxNumber;
        companyInfo.website = website;
        companyInfo.career = career;
        companyInfo.careerInfo = findCareer(career);
        companyInfo.description = description;
        callback(companyInfo);
    };
    const findCareer = (id) => {
        return careers.find((career) => career.id == id);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('column')}>
                    <label className={cx('label')}>Tên công ty</label>
                    <CFormInput
                        type="text"
                        value={companyName}
                        spellCheck={false}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
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
                        value={career}
                        onChange={(e) => {
                            setCareer(e.target.value);
                        }}
                        options={careers.map((career) => {
                            return { label: career.name, value: career.id };
                        })}
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
