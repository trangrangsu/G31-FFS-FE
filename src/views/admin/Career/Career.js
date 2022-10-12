import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import { faTrashCan, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CustomButton from '../../../components/Button';
import Search from '../../../components/Search';
import styles from './Career.module.scss';
import CareerPopUp from './CareerPopUp.js';
const cx = classNames.bind(styles);

function Career() {
    const headers = ['ID', 'Tên Ngành Nghề', 'Chỉnh Sửa', 'Xóa'];
    const careers = [
        {
            id: 1,
            name: 'Công Nghệ Thông tin',
        },
        {
            id: 2,
            name: 'Bất Động Sản',
        },
        {
            id: 3,
            name: 'Bán Hàng',
        },
        {
            id: 4,
            name: 'Thiết Kế',
        },
        {
            id: 5,
            name: 'Tư Vấn',
        },
        {
            id: 6,
            name: 'Xây dựng',
        },
    ];
    const [show, setShow] = useState(false);
    const [careerInfo, setCareerInfo] = useState({});
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
