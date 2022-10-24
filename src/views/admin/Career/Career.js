import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import { faTrashCan, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as adminCareerServices from '../../../services/adminCareerServices';
import CustomButton from '../../../components/Button';
import Search from '../../../components/Search';
import CareerPopUp from './CareerPopUp.js';
import styles from './Career.module.scss';
const cx = classNames.bind(styles);

function Career() {
    const headers = ['ID', 'Tên Ngành Nghề', 'Chỉnh Sửa', 'Xóa'];
    const [careers, setCareer] = useState([]);
    const [show, setShow] = useState(false);
    const [careerInfo, setCareerInfo] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const result = await adminCareerServices.getCareers('', 0);
            console.log(result);
            setCareer(result.careers);
        };
        fetchApi();
    }, []);
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    const handleShow = () => {
        setCareerInfo({});
        setShow(true);
    };
    const handUpdate = (careerInfo) => {
        setCareerInfo(careerInfo);
        setShow(true);
    };
    const handDelete = (careerInfo) => {
        alert('delete');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách career</h1>
                <div className={cx('action')}>
                    <CustomButton admin className={'button-popup'} variant="primary" onClick={handleShow}>
                        Thêm mới
                    </CustomButton>
                    {/* <CareerPopUp className={cx('career-popup')} /> */}
                    <Search className={cx('search')} title="Tìm kiếm ngành nghề" />
                    {show && (
                        <CareerPopUp
                            career={careerInfo}
                            callback={() => {
                                setShow(false);
                            }}
                        />
                    )}
                </div>

                <table className={cx('careers')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {careers.map((career) => {
                            return (
                                <tr key={career.id}>
                                    <td>{career.id}</td>
                                    <td>{career.name}</td>
                                    <td>
                                        {' '}
                                        <FontAwesomeIcon icon={faPenClip} onClick={() => handUpdate(career)} />
                                    </td>
                                    <td>
                                        {' '}
                                        <FontAwesomeIcon icon={faTrashCan} onClick={() => handDelete(career)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    <CPaginationItem aria-label="Previous" disabled>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    <CPaginationItem active className={cx('active-page')}>
                        1
                    </CPaginationItem>
                    <CPaginationItem>2</CPaginationItem>
                    <CPaginationItem>3</CPaginationItem>
                    <CPaginationItem aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                </CPagination>
            </div>
        </div>
    );
}

export default Career;
