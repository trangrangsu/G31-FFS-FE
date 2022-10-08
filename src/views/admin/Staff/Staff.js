import React from 'react';
import classNames from 'classnames/bind';
import { CPagination, CPaginationItem } from '@coreui/react';
import Search from '../../../components/Search';
import { faTrashCan, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Staff.module.scss';
import StaffPopUp from './StaffPopUp.js';
const cx = classNames.bind(styles);

function Staff() {
    const headers = ['ID', 'Email', 'Họ và tên', 'Số điện thoại', 'Địa chỉ', 'Chỉnh Sửa', 'Xóa'];
    const staffs = [
        {
            id: 1,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Bac Quyet',
            phone: '0337177679',
            address: 'SN02-Ngõ 17-Ngách 13-Đường Hà Hoàng-Hà Tĩnh',
        },
        {
            id: 2,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Bac Quyet',
            phone: '0337177679',
            address: 'SN02-Ngõ 17-Ngách 13-Đường Hà Hoàng-Hà Tĩnh',
        },
        {
            id: 3,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Bac Quyet',
            phone: '0337177679',
            address: 'SN02-Ngõ 17-Ngách 13-Đường Hà Hoàng-Hà Tĩnh',
        },
        {
            id: 4,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Bac Quyet',
            phone: '0337177679',
            address: 'SN02-Ngõ 17-Ngách 13-Đường Hà Hoàng-Hà Tĩnh',
        },
        {
            id: 5,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Bac Quyet',
            phone: '0337177679',
            address: 'SN02-Ngõ 17-Ngách 13-Đường Hà Hoàng-Hà Tĩnh',
        },
        {
            id: 6,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Bac Quyet',
            phone: '0337177679',
            address: 'SN02-Ngõ 17-Ngách 13-Đường Hà Hoàng-Hà Tĩnh',
        },

    ];
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Staff</h1>
                <div className={cx('action')}>
                    <StaffPopUp />
                    <Search title="Tìm kiếm Staff" />
                </div>
                <table className={cx('staffs')}>
                    <thead className={cx('table-header')}>{renderTableHeader()}</thead>
                    <tbody>{
                        staffs.map((staffs) => {
                            return (
                                <tr key={staffs.id}>
                                    <td>{staffs.id}</td>
                                    <td>{staffs.email}</td>
                                    <td>{staffs.fullname}</td>
                                    <td>{staffs.phone}</td>
                                    <td>{staffs.address}</td>
                                    <td> <FontAwesomeIcon icon={faPenClip} /></td>
                                    <td> <FontAwesomeIcon icon={faTrashCan} /></td>
                                </tr>
                            );
                        })}</tbody>
                </table>
                <CPagination aria-label="Page navigation example" className={cx('table-paging')}>
                    <CPaginationItem aria-label="Previous" disabled>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    <CPaginationItem active>1</CPaginationItem>
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
