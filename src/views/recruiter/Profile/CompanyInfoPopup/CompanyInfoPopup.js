import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CFormInput, CFormTextarea, CFormSelect } from '@coreui/react';
import { Alert } from 'antd';

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
    const [messageName, setMessageName] = useState('');
    const [messageTax, setMessageTax] = useState('');
    const [messageCareer, setMessageCareer] = useState('');

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

            if (companyInfo.career !== null) {
                setCareer(companyInfo.career.id);
            }
            if (companyInfo.companyIntro !== null) {
                setDescription(companyInfo.companyIntro);
            }
        }
    }, []);
    const handleClose = () => {
        setShow(false);
        onclose();
    };
    const handleChangeName = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            return;
        }
        if (!value.startsWith(' ')) {
            setCompanyName(value);
        }
    };
    const handleChangeTax = (e) => {
        const value = e.target.value;
        if (value.length > 14) {
            return;
        }
        if (!value.startsWith(' ')) {
            setTaxNumber(value);
        }
    };
    const handleChangeWebsite = (e) => {
        const value = e.target.value;
        if (value.length > 200) {
            return;
        }
        if (!value.startsWith(' ')) {
            setWebsite(value);
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
    const validateName = (name) => {
        return name.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    };
    const handleAdd = () => {
        let count = 0;
        if (companyName === '') {
            count++;
            setMessageName('Tên công ty trống');
        } else if (validateName(companyName) !== null) {
            count++;
            setMessageName('Vui lòng không nhập ký tự đặc biệt');
        } else {
            setMessageName('');
        }
        if (taxNumber === '') {
            count++;
            setMessageTax('Mã số thuê trống');
        } else {
            setMessageTax('');
        }
        if (career === -1) {
            count++;
            setMessageCareer('Ngành nghề chưa được lựa chọn');
        } else {
            setMessageCareer('');
        }
        if (count !== 0) return;
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
                    <CFormInput type="text" value={companyName} spellCheck={false} onChange={handleChangeName} />
                    {messageName !== '' && <Alert className={cx('messageError')} message={messageName} type="error" />}
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Mã số thuế</label>
                    <CFormInput type="text" value={taxNumber} spellCheck={false} onChange={handleChangeTax} />
                    {messageTax !== '' && <Alert className={cx('messageError')} message={messageTax} type="error" />}
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Link website</label>
                    <CFormInput type="text" value={website} spellCheck={false} onChange={handleChangeWebsite} />
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
                    {messageCareer !== '' && (
                        <Alert className={cx('messageError')} message={messageCareer} type="error" />
                    )}
                </div>
                <div className={cx('column')}>
                    <label className={cx('label')}>Mô tả</label>
                    <CFormTextarea
                        id="exampleFormControlTextarea1"
                        rows="6"
                        value={description}
                        spellCheck={false}
                        onChange={handleChangeDescription}
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
