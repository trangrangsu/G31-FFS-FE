import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import { faPenClip, faPersonCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as staffService from '../../../services/staffService';
import CustomButton from '../../../components/Button';
import GlobalSearch from '../../../components/GlobalSearch';
import styles from './Staff.module.scss';
import StaffPopUp from './StaffPopUp.js';
const cx = classNames.bind(styles);

function Staff() {
    const headers = ['ID', 'Email', 'Họ và tên', 'Số điện thoại', 'Địa chỉ', 'Trạng thái', 'Chỉnh Sửa', 'Cấp quyền'];
    const [show, setShow] = useState(false);
    const [staffInfo, setStaffInfo] = useState({});
    const [staffs, setStaffs] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(5);
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    const fetchApi = async (pIndex) => {
        const result = await staffService.getStaffs(searchValue, pIndex);
        console.log(result);
        setStaffs(result.staffs);
        console.log(result.pageIndex);
        setPageIndex(result.pageIndex);
        setTotalPages(result.totalPages);
    };
    useEffect(() => {
        fetchApi();
    }, []);
    const handlePaging = (pIndex) => {
        fetchApi(pIndex);
    };
    const renderPages = () => {
        if (totalPages < 2) {
            return;
        }
        let paging = [];
        if (pageIndex > 2) {
            paging.push(
                <CPaginationItem aria-label="Previous" key="0" onClick={() => handlePaging(0)}>
                    <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>,
            );
        }
        for (let i = pageIndex - 1; i < pageIndex; i++) {
            if (i >= 1) {
                paging.push(
                    <CPaginationItem key={i} onClick={() => handlePaging(i - 1)}>
                        {i}
                    </CPaginationItem>,
                );
            }
        }
        paging.push(
            <CPaginationItem active className={cx('active-page')} key={pageIndex}>
                {pageIndex}
            </CPaginationItem>,
        );
        for (let y = pageIndex + 1; y <= pageIndex + 1; y++) {
            if (y <= totalPages) {
                paging.push(
                    <CPaginationItem key={y} onClick={() => handlePaging(y - 1)}>
                        {y}
                    </CPaginationItem>,
                );
            }
        }
        if (pageIndex < totalPages - 1) {
            paging.push(
                <CPaginationItem aria-label="Next" key="9999" onClick={() => handlePaging(totalPages - 1)}>
                    <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>,
            );
        }
        return paging;
    };
    const handleShow = () => {
        setStaffInfo({});
        setShow(true);
    };
    const handUpdate = (staff) => {
        setStaffInfo(staff);
        setShow(true);
    };
    const handDelete = (staff) => {
        const banStaffFetchApi = async (id) => {
            const result = await staffService.banStaff(id);
            console.log(result);
        };
        banStaffFetchApi(staff.id);
        fetchApi();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Nhân viên</h1>
                <div className={cx('action')}>
                    <CustomButton admin className={'button-popup'} variant="primary" onClick={handleShow}>
                        Thêm mới
                    </CustomButton>

                    <GlobalSearch
                        className={cx('search')}
                        title="Tìm kiếm Nhân viên"
                        onPending={(value) => {
                            setSearchValue(value);
                        }}
                        onSearch={(value) => handlePaging(value)}
                    />
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
                                            <FontAwesomeIcon
                                                icon={faPenClip}
                                                onClick={() => handUpdate(staff)}
                                                className={cx('hover')}
                                            />
                                        </td>
                                        <td>
                                            {' '}
                                            <FontAwesomeIcon
                                                icon={faPersonCircleExclamation}
                                                onClick={() => handDelete(staff)}
                                                className={cx('hover')}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    {renderPages()}
                </CPagination>
            </div>
        </div>
    );
}

export default Staff;
