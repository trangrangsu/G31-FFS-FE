import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import { faTrashCan, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as staffService from '../../../services/staffService';
import CustomButton from '../../../components/Button';
import Search from '../../../components/Search';
import styles from './Staff.module.scss';
import StaffPopUp from './StaffPopUp.js';
const cx = classNames.bind(styles);

function Staff() {
    const headers = ['ID', 'Email', 'Họ và tên', 'Số điện thoại', 'Địa chỉ', 'Trạng thái', 'Chỉnh Sửa', 'Xóa'];
    const [show, setShow] = useState(false);
    const [staffInfo, setStaffInfo] = useState({});
    const [staffs, setStaffs] = useState([]);
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    useEffect(() => {
        const fetchApi = async () => {
            const result = await staffService.getStaffs('', 0);
            console.log(result);
            setStaffs(result.staffs);
        };
        fetchApi();
    }, []);
    const handleShow = () => {
        setStaffInfo({});
        setShow(true);
    };
    const handUpdate = (staff) => {
        setStaffInfo(staff);
        setShow(true);
    };
    const handDelete = (staff) => {
        alert('delete');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Nhân viên</h1>
                <div className={cx('action')}>
                    <CustomButton admin className={'button-popup'} variant="primary" onClick={handleShow}>
                        Thêm mới
                    </CustomButton>

                    <Search className={cx('search')} title="Tìm kiếm Nhân viên" />
                    {show && (
                        <StaffPopUp
                            staff={staffInfo}
                            callback={() => {
                                setShow(false);
                            }}
                        />
                    )}
                </div>
                <table className={cx('staffs')}>
                    <thead className={cx('table-header')}>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
                    <tbody>
                        {staffs !== undefined &&
                            staffs.map((staff) => {
                                return (
                                    <tr key={staff.id}>
                                        <td>{staff.id}</td>
                                        <td>{staff.email}</td>
                                        <td>{staff.fullname}</td>
                                        <td>{staff.phone}</td>
                                        <td>{staff.address}</td>
                                        <td>{staff.isActive ? 'Hoạt động' : 'Không hoạt động'}</td>
                                        <td>
                                            {' '}
                                            <FontAwesomeIcon icon={faPenClip} onClick={() => handUpdate(staff)} />
                                        </td>
                                        <td>
                                            {' '}
                                            <FontAwesomeIcon icon={faTrashCan} onClick={() => handDelete(staff)} />
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

export default Staff;
