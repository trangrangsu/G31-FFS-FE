import React, { Component } from 'react';
import classNames from 'classnames/bind';

import { CPagination, CPaginationItem } from '@coreui/react';

import styles from './Freelancer.module.scss';
const cx = classNames.bind(styles);

function Freelancer() {
    const headers = ['ID', 'Email', 'Họ và tên', 'Số dư tài khoản', 'Trạng thái tài khoản'];
    const freelancers = [
        {
            id: 1,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Bac Quyet',
            accountbalance: '20000',
            isbanned: 'True',
        },
        {
            id: 2,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Huu Tuyen',
            accountbalance: '20000',
            isbanned: 'False',
        },
        {
            id: 3,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Van Manh',
            accountbalance: '20000',
            isbanned: 'True',
        },
        {
            id: 4,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Van Nam',
            accountbalance: '20000',
            isbanned: 'False',
        },
        {
            id: 5,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Bien Van Cong',
            accountbalance: '20000',
            isbanned: 'False',
        },
        {
            id: 6,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Ba Trang',
            accountbalance: '20000',
            isbanned: 'False',
        },
        {
            id: 7,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Bac Quyet',
            accountbalance: '20000',
            isbanned: 'False',
        },
        {
            id: 8,
            email: 'nguyenbacquyet@gmail.com',
            fullname: 'Nguyen Bac Quyet',
            accountbalance: '20000',
            isbanned: 'False',
        },
    ];
    const renderTableHeader = () => {
        return headers.map((properties, index) => {
            return <th key={index}>{properties}</th>;
        });
    };
    const renderTableData = () => {
        return freelancers.map((freelancer) => {
            return (
                <tr key={freelancer.id}>
                    <td>{freelancer.id}</td>
                    <td>{freelancer.email}</td>
                    <td>{freelancer.fullname}</td>
                    <td>{freelancer.accountbalance}</td>
                    <td>{freelancer.isbanned}</td>
                </tr>
            );
        });
    };
    return (
        <div className={cx('wrapper')}>

            <div className={cx('container')}>
                <h1 className={cx('title')}>Danh sách Freelancer</h1>
                <table className={cx('freelancers')}>
                    <thead className={cx('table-header')}>{renderTableHeader()}</thead>
                    <tbody>{renderTableData()}</tbody>
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

export default Freelancer;
